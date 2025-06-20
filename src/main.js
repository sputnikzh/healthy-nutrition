import { ref, onValue, set } from "firebase/database";
import getFirstVisit from "./firstVisit.js";
import { db } from "./firebase.js";
import getInfoUser from "./userInfo.js";

const STATE = {
  rootMainElement: document.querySelector("#app"),
  currentUser: null,
};

const renderHeader = () => {
  const div = document.createElement("div");
  div.classList.add('header');
  const helloUser = document.createElement("h3");
  const closeModal = document.createElement("div");

  closeModal.classList.add("closeModal");
  closeModal.textContent = 'X'

  helloUser.textContent = STATE.currentUser.login;

  div.appendChild(helloUser);
  div.appendChild(closeModal);
  

  closeModal.addEventListener("click", () => {
    localStorage.removeItem("login");
    window.location.reload();
  });
  STATE.rootMainElement.appendChild(div);
};

const renderFirstVisit = () => {
  const form = getFirstVisit(STATE.currentUser.login);
  STATE.rootMainElement.appendChild(form);
};

const renderUser = () => {
  const { login, weight, height, age, gender, activity } = STATE.currentUser;
  console.log(activity)
  const div = getInfoUser(login, weight, height, age, gender, activity, login)
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
  const usersRef = ref(db, "users/" + loginString);

  onValue(
    usersRef,
    (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      // если пользователь не создан, то его создаем
      if (!data) {
        console.log(loginString)
        set(ref(db, `users/${loginString}`), {
          age: '',
          height: '',
          weight: '',
          gender: ''
        })
        .catch((error) => {
          console.error("Ошибка при создании пользователя:", error);
        });
        STATE.currentUser = {
          login: loginString,
          age: '',
          height: '',
          weight: '',
          activity: ''
        };
        handleEvents("first visit");
        return;
      }
      // тут проверяем у созданого пользователя данные
      const { height, weight, age, gender, activity } = data;
      STATE.currentUser = {
        login: loginString,
        age: age,
        height: height,
        weight: weight,
        gender: gender,
        activity: activity
      };
      if (!height.length && !weight.length) {
        handleEvents("first visit");
        return;
      }
      STATE.currentUser = {
        login: loginString,
        age: age,
        height: height,
        weight: weight,
        gender: gender,
        activity: activity
      };
      handleEvents("render user");
    },
    { onlyOnce: true }
  );

  return STATE.rootMainElement;
};
export default renderMain;
