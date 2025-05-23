import { getDatabase, ref, onValue, set } from "firebase/database";
import closeImage from "./closeIcon.png";
import getDataUser from "./info.js";

const STATE = {
  rootMainElement: document.createElement("div"),
  currentUser: null,
};

// const handlePending = () => {
// const div = document.createElement("div");
// const helloUser = document.createElement("h3");
// const closeImg = document.createElement("img");
// const closeBtn = document.createElement("button");

// helloUser.textContent = "Привет " + loginString;

// closeImg.setAttribute("src", closeImage);
// div.appendChild(closeBtn);
// div.appendChild(helloUser);
// closeBtn.appendChild(closeImg);

// closeBtn.addEventListener("click", () => {
//   localStorage.removeItem("login");
//   window.location.reload();
// });
// return div;
// };

const renderHeader = () => {
  const div = document.createElement("div");
  const helloUser = document.createElement("h3");
  const closeBtn = document.createElement("button");
const closeModal = document.createElement("div")

  closeModal.classList.add("closeModal")

  helloUser.textContent = STATE.currentUser.login;

  div.appendChild(closeModal);
  div.appendChild(helloUser);

  closeModal.addEventListener("click", () => {
    localStorage.removeItem("login");
    window.location.reload();
  });
  STATE.rootMainElement.appendChild(div);
};

const renderFirstVisit = () => {
  const form = getDataUser(STATE.currentUser.login);
  STATE.rootMainElement.appendChild(form);
};

const renderUser = () => {
  const { login, wight, height } = STATE.currentUser;
  const div = document.createElement("div");

  const heightText = document.createElement("p");
  const wightText = document.createElement("p");
  const loginText = document.createElement("p");

  loginText.textContent = `Привет, ${login}`;

  heightText.textContent = `Твой рост: ${height}`;
  wightText.textContent = `Твой вес: ${wight}`;

  div.appendChild(loginText);
  div.appendChild(heightText);
  div.appendChild(wightText);

  STATE.rootMainElement.appendChild(div);
};

const handleEvents = (status) => {
  STATE.rootMainElement.innerHTML = "";
  renderHeader();
  switch (status) {
    case "first visit":
      renderFirstVisit();
      return;
    case "render user":
      renderUser();
      return;
    default:
      console.log("Ups ...");
  }
};

const renderMain = (loginString) => {
  const db = getDatabase();
  const usersRef = ref(db, "users/" + loginString);

  onValue(
    usersRef,
    (snapshot) => {
      const data = snapshot.val();
      console.log(data)
      // если пользователь не создан, то его создаем
      if (!data) {
        set(ref(db, `users/${loginString}`), {
          age: null,
          height: null,
          wight: null,
        });
        STATE.currentUser = {
          login: loginString,
          age: null,
          height: null,
          wight: null,
        };
        handleEvents("first visit");
        return;
      }
      // тут проверяем у созданого пользователя данные
      const { height, wight, age } = data;
      STATE.currentUser = {
        login: loginString,
        age: age,
        height: height,
        wight: wight,
      };
      if (!height && !wight) {
        handleEvents("first visit");
        return;
      }
      STATE.currentUser = {
        login: loginString,
        age: age,
        height: height,
        wight: wight,
      };
      handleEvents("render user");
    },
    { onlyOnce: true }
  );

  return STATE.rootMainElement;
};
export default renderMain;
