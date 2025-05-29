import getLogin from "./login.js";
import renderMain from "./main.js";
import "./style.css";

const appElement = document.querySelector("#app");

const app = () => {
  const loginString = localStorage.getItem("login");
  if (loginString) {
    const main = renderMain(loginString);
    appElement.appendChild(main);
  } else {
    const login = getLogin();
    appElement.appendChild(login);
  }
  console.log(loginString);
};

app();
