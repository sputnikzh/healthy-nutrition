import closeImage from "./closeIcon.png";
import getDataUser from "./info.js";
const renderMain = (loginString) => {
  const div = document.createElement("div");
  const helloUser = document.createElement("h3");
  const closeImg = document.createElement("img");
  const closeBtn = document.createElement("button");

  helloUser.textContent = "Привет " + loginString;

  closeImg.setAttribute("src", closeImage);
  div.appendChild(closeBtn);
  div.appendChild(helloUser);
  div.appendChild(getDataUser())
  closeBtn.appendChild(closeImg);

  closeBtn.addEventListener("click", () => {
    localStorage.removeItem("login");
    window.location.reload();
  });

  return div;
};
export default renderMain;
