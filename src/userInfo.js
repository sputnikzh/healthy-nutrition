import getBju from "./bju.js";

const getInfoUser = (login, weight, height, age) => {
  const div = document.createElement("div");
  div.classList.add('infoDiv');

  const header = document.createElement('div');
  header.classList.add('info-header');

  const userComponent = document.createElement('div');
  userComponent.classList.add('user-component');

  const infoUser = document.createElement('div');
  infoUser.classList.add('info-user');

  const heightText = document.createElement("div");
  const wightText = document.createElement("div");
  const loginText = document.createElement("h3");
  const ageText = document.createElement("div");

  loginText.textContent = `Привет, ${login}`;
  heightText.textContent = `Рост: ${height}`;
  wightText.textContent = `Вес: ${weight}`;
  ageText.textContent = `Возвраст: ${age}`;

  userComponent.appendChild(loginText);

  infoUser.appendChild(heightText);
  infoUser.appendChild(wightText);
  infoUser.appendChild(ageText);

  header.appendChild(userComponent);
  header.appendChild(infoUser);

  div.appendChild(header);

  const bju = getBju();
  div.appendChild(bju);
  return div;
};

export default getInfoUser;