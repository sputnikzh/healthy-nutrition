import { getDatabase, ref, onValue, set } from "firebase/database";
import vegetables from "./vegetables.png";

const getDataUser = (login) => {
  let gender = "male";
  const div = document.createElement("div");
  div.classList.add("infoDiv");

  const height = document.createElement("input");
  const weight = document.createElement("input");
  const age = document.createElement("input");
  const row1 = document.createElement("div");
  const row2 = document.createElement("div");
  const vegetablesImg = document.createElement("img");
  const form = document.createElement("form");
  form.classList.add("infoForm");
  vegetablesImg.classList.add("vegetablesImg");
  height.setAttribute("name", "height");
  weight.setAttribute("name", "weight");
  age.setAttribute("name", "age");

  height.setAttribute("type", "text");
  weight.setAttribute("type", "text");
  age.setAttribute("type", "text");

  vegetablesImg.setAttribute("src", vegetables);

  const maleLabel = document.createElement("label");
  const femaleLabel = document.createElement("label");

  const maleInput = document.createElement("input");
  const femaleInput = document.createElement("input");
  const enterBTN = document.createElement("button");

  maleInput.setAttribute("name", "gender");
  maleInput.setAttribute("type", "radio");

  femaleInput.setAttribute("name", "gender");
  femaleInput.setAttribute("type", "radio");

  maleLabel.textContent = "Муж";
  femaleLabel.textContent = "Жен";

  row1.appendChild(maleLabel);
  row1.classList.add("genderDiv");
  row1.appendChild(maleInput);
  row2.classList.add("genderDiv");

  row2.appendChild(femaleLabel);
  row2.appendChild(femaleInput);
  div.appendChild(vegetablesImg);
  div.appendChild(form);

  enterBTN.setAttribute("type", "submit");

  const heightText = document.createElement("label");
  heightText.textContent = "Введите ваш рост:";
  form.appendChild(heightText);
  form.appendChild(height);
  const weightText = document.createElement("label");
  weightText.textContent = "Введите ваш вес:";
  form.appendChild(weightText);
  form.appendChild(weight);
  const ageText = document.createElement("label");
  ageText.textContent = "Введите ваш возраст:";
  form.appendChild(ageText);
  form.appendChild(age);
  form.appendChild(row1);
  form.appendChild(row2);
  form.appendChild(enterBTN);

  enterBTN.textContent = "Ввод";

  // enterBTN.addEventListener("click", () => {
  //   const information = {};
  //   information["height"] = height.value;
  //   information["wight"] = weight.value;
  //   information["age"] = age.value;
  //   const db = getDatabase();
  //   set(ref(db, 'users/' + login), information);
  //   window.location.reload();
  // });

  maleInput.addEventListener("click", () => {
    gender = "male";
  });

  femaleInput.addEventListener("click", () => {
    gender = "female";
  });

  form.addEventListener("submit", (e) => {
    const information = {};
    information["height"] = height.value;
    information["wight"] = weight.value;
    information["age"] = age.value;
    information["gender"] = gender;
    console.log(information);
    e.preventDefault();
  });

  return div;
};

export default getDataUser;
