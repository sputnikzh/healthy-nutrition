import image from './login.png';


const renderLogin = () => {
  const div = document.createElement('div');
  const form = document.createElement('form');
  const input = document.createElement('input');
  const img = document.createElement('img');
  const btn = document.createElement('button');
  const title = document.createElement('h3');

  div.classList.add('login');
  form.setAttribute('type', 'submit');
  img.setAttribute('src', image);
  input.setAttribute('placeholder', 'Enter login');
  btn.textContent = 'Login';
  title.textContent = 'Вход'

  form.appendChild(title);
  form.appendChild(input);
  form.appendChild(btn);
  div.appendChild(img);
  div.appendChild(form);
  return div;
};

export default renderLogin;
