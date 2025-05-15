import renderLogin from "./login.js";
import renderMain from "./main.js";
import "./style.css";
import './firebase.js';

const appElement = document.querySelector("#app");

const app = () => {
  const loginString = localStorage.getItem("login");
  if (loginString) {
    const main = renderMain(loginString);
    appElement.appendChild(main);
  } else {
    const login = renderLogin();
    appElement.appendChild(login);
  }
  console.log(loginString);
};

app();
