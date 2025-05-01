import renderLogin from "./login.js";
import './style.css';

const appElement = document.querySelector('#app');

const app = () => {
  const login = renderLogin();
  appElement.appendChild(login);
}

app();
