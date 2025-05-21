import image from './login.png';



const renderLogin = () => {
  const div = document.createElement('div');
  const form = document.createElement('form');
  form.classList.add("loginForm")
  const input = document.createElement('input');
  const img = document.createElement('img');
  const btn = document.createElement('button');
  const title = document.createElement('h3');
  

  

  div.classList.add('login');
  btn.setAttribute('type', 'submit');
  img.setAttribute('src', image);
  input.setAttribute('placeholder', 'Enter login');
  btn.textContent = 'Login';
  title.textContent = 'Вход'

  form.appendChild(title);
  form.appendChild(input);
  form.appendChild(btn);
  div.appendChild(img);
  div.appendChild(form);
  

  form.addEventListener('submit', (e)=>{
    localStorage.setItem('login', input.value)
  })
  
  

  
    
  
  return div;
};

export default renderLogin;
