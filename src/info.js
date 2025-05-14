const getDataUser = ()=>{
    const div = document.createElement('div')
    
const height = document.createElement('input')
const weight = document.createElement('input')
const age = document.createElement('input')
const row1 = document.createElement('div');
const row2 = document.createElement('div');

const maleLabel = document.createElement('label');
const femaleLabel = document.createElement('label');

const maleInput = document.createElement('input');
const femaleInput = document.createElement('input')
const enterBTN = document.createElement('button')

maleInput.setAttribute('name', 'gender');
maleInput.setAttribute('type', 'radio');

femaleInput.setAttribute('name', 'gender');
femaleInput.setAttribute('type', 'radio');

maleLabel.textContent = 'Муж';
femaleLabel.textContent = 'Жен';


row1.appendChild(maleLabel);
row1.appendChild(maleInput);

row2.appendChild(femaleLabel);
row2.appendChild(femaleInput);

const heightText = document.createElement('label')
heightText.textContent = 'Введите ваш рост:'
div.appendChild(heightText)
div.appendChild(height)
const weightText = document.createElement('label')
weightText.textContent = 'Введите ваш вес:'
div.appendChild(weightText)
div.appendChild(weight)
const ageText = document.createElement('label')
ageText.textContent = 'Введите ваш возраст:'
div.appendChild(ageText)
div.appendChild(age)
div.appendChild(enterBTN)
div.appendChild(row1)
div.appendChild(row2)

enterBTN.textContent = 'Ввод'
enterBTN.addEventListener("click", ()=>{
    const information = {}
    information['рост'] = height.value
    information['вес'] = weight.value
    information['возраст'] = age.value
    console.log(information)
})


return div
}
export default getDataUser