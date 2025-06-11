import calculateKBZU  from "./KBZU.js";
import { db } from "./firebase.js";
import { ref, onValue, push } from "firebase/database";

const createProgressBar = (current, max, label) => {
  const container = document.createElement("div");
  container.classList.add("progress-container");

  const labelDiv = document.createElement("div");
  labelDiv.classList.add("progress-label");
  labelDiv.textContent = label;

  const progressBar = document.createElement("div");
  progressBar.classList.add("progress-bar");
  
  const progress = document.createElement("div");
  progress.classList.add("progress");
  const percentage = Math.min((current / max) * 100, 100);
  progress.style.width = `${percentage}%`;

  const valueDiv = document.createElement("div");
  valueDiv.classList.add("progress-value");
  valueDiv.textContent = `${current}/${max}`;

  progressBar.appendChild(progress);
  container.appendChild(labelDiv);
  container.appendChild(progressBar);
  container.appendChild(valueDiv);

  return { container, progress, valueDiv };
};

const createInputForm = (limits, goal, userId) => {
  const form = document.createElement("form");
  form.classList.add("nutrition-form");

  const inputs = [
    { name: 'calories', label: 'Калории', max: limits.calories },
    { name: 'protein', label: 'Белки', max: limits.protein_g },
    { name: 'fat', label: 'Жиры', max: limits.fat_g },
    { name: 'carbs', label: 'Углеводы', max: limits.carbs_g }
  ];

  inputs.forEach(({ name, label, max }) => {
    const inputGroup = document.createElement("div");
    inputGroup.classList.add("input-group");

    const labelEl = document.createElement("label");
    labelEl.textContent = label;
    labelEl.htmlFor = name;

    const input = document.createElement("input");
    input.type = "number";
    input.id = name;
    input.name = name;
    input.min = "0";
    input.max = max;
    input.placeholder = `Макс: ${max}`;

    inputGroup.appendChild(labelEl);
    inputGroup.appendChild(input);
    form.appendChild(inputGroup);
  });

  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = "Сохранить";
  form.appendChild(submitButton);

  // Обработчик отправки формы
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = {
      calories: Number(formData.get('calories')),
      protein: Number(formData.get('protein')),
      fat: Number(formData.get('fat')),
      carbs: Number(formData.get('carbs')),
      goal: goal,
      timestamp: new Date().toISOString()
    };

    try {
      const nutritionRef = ref(db, `users/${userId}/nutrition`);
      await push(nutritionRef, data);
      
      // Очищаем форму после успешного сохранения
      form.reset();
    } catch (error) {
      console.error("Error saving nutrition data:", error);
      alert("Ошибка при сохранении данных. Попробуйте еще раз.");
    }
  });

  return form;
};

const createCardSwitcher = (onSwitch) => {
  const switcher = document.createElement("div");
  switcher.classList.add("card-switcher");

  const buttons = [
    { id: 'lose', text: 'Снижение' },
    { id: 'maintail', text: 'Поддержание' },
    { id: 'gain', text: 'Набор' }
  ];

  buttons.forEach(({ id, text }) => {
    const button = document.createElement("button");
    button.textContent = text;
    button.dataset.card = id;
    button.classList.add("switch-button");
    if (id === 'lose') button.classList.add("active");
    
    button.addEventListener("click", () => {
      switcher.querySelectorAll(".switch-button").forEach(btn => {
        btn.classList.remove("active");
      });
      button.classList.add("active");
      onSwitch(id);
    });

    switcher.appendChild(button);
  });

  return switcher;
};

const renderLimits = (data, text, userId) => {
  const div = document.createElement("div");
  div.classList.add("nutrition-card");
  div.dataset.card = text.toLowerCase();

  const title = document.createElement("h4");
  title.textContent = text;

  const progressSection = document.createElement("div");
  progressSection.classList.add("progress-section");

  // Создаем шкалы прогресса
  const progressBars = {
    calories: createProgressBar(0, data.calories, "Калории"),
    protein: createProgressBar(0, data.protein_g, "Белки"),
    fat: createProgressBar(0, data.fat_g, "Жиры"),
    carbs: createProgressBar(0, data.carbs_g, "Углеводы")
  };

  // Добавляем шкалы в секцию
  Object.values(progressBars).forEach(({ container }) => {
    progressSection.appendChild(container);
  });

  // Добавляем форму для ввода
  const form = createInputForm(data, text.toLowerCase(), userId);

  div.appendChild(title);
  div.appendChild(progressSection);
  div.appendChild(form);

  // Подписываемся на изменения данных в Firebase
  const nutritionRef = ref(db, `users/${userId}/nutrition`);
  onValue(nutritionRef, (snapshot) => {
    const nutritionData = snapshot.val() || {};
    const today = new Date().toISOString().split('T')[0];
    
    // Считаем сумму за сегодня
    const todayTotals = Object.values(nutritionData).reduce((acc, entry) => {
      const entryDate = new Date(entry.timestamp).toISOString().split('T')[0];
      if (entryDate === today && entry.goal === text.toLowerCase()) {
        return {
          calories: (acc.calories || 0) + (entry.calories || 0),
          protein: (acc.protein || 0) + (entry.protein || 0),
          fat: (acc.fat || 0) + (entry.fat || 0),
          carbs: (acc.carbs || 0) + (entry.carbs || 0)
        };
      }
      return acc;
    }, {});

    // Обновляем прогресс-бары
    if (progressBars.calories) {
      const caloriesPercentage = Math.min((todayTotals.calories || 0) / data.calories * 100, 100);
      progressBars.calories.progress.style.width = `${caloriesPercentage}%`;
      progressBars.calories.valueDiv.textContent = `${todayTotals.calories || 0}/${data.calories}`;
    }

    if (progressBars.protein) {
      const proteinPercentage = Math.min((todayTotals.protein || 0) / data.protein_g * 100, 100);
      progressBars.protein.progress.style.width = `${proteinPercentage}%`;
      progressBars.protein.valueDiv.textContent = `${todayTotals.protein || 0}/${data.protein_g}`;
    }

    if (progressBars.fat) {
      const fatPercentage = Math.min((todayTotals.fat || 0) / data.fat_g * 100, 100);
      progressBars.fat.progress.style.width = `${fatPercentage}%`;
      progressBars.fat.valueDiv.textContent = `${todayTotals.fat || 0}/${data.fat_g}`;
    }

    if (progressBars.carbs) {
      const carbsPercentage = Math.min((todayTotals.carbs || 0) / data.carbs_g * 100, 100);
      progressBars.carbs.progress.style.width = `${carbsPercentage}%`;
      progressBars.carbs.valueDiv.textContent = `${todayTotals.carbs || 0}/${data.carbs_g}`;
    }
  });

  return div;
};

const getBju = (height, weight, age, gender, activity, userId) => {
  const div = document.createElement("div");
  div.classList.add('bju-info');
  
  const currentDate = new Date();
  const dateSpan = document.createElement('span');
  dateSpan.textContent = currentDate.toLocaleString('ru-RU');

  const data = {
    sex: gender,
    weight: Number(weight),
    height: Number(height),
    age: Number(age),
    activityLevel: activity, 
    goal: 'lose'            
  }

  const lose = calculateKBZU(data);
  data.goal = 'maintail';
  const maintail = calculateKBZU(data);
  data.goal = 'gain';
  const gain = calculateKBZU(data);

  const cardsContainer = document.createElement('div');
  cardsContainer.classList.add('cards-container');

  // Создаем карточки
  const loseCard = renderLimits(lose, 'Lose', userId);
  const maintailCard = renderLimits(maintail, 'Maintail', userId);
  const gainCard = renderLimits(gain, 'Gain', userId);

  // Добавляем переключатель
  const switcher = createCardSwitcher((cardId) => {
    // Скрываем все карточки
    [loseCard, maintailCard, gainCard].forEach(card => {
      card.style.display = 'none';
    });

    // Показываем выбранную карточку
    const selectedCard = cardsContainer.querySelector(`[data-card="${cardId}"]`);
    if (selectedCard) {
      selectedCard.style.display = 'flex';
    }
  });

  // Изначально показываем только карточку Lose
  maintailCard.style.display = 'none';
  gainCard.style.display = 'none';

  div.appendChild(dateSpan);
  div.appendChild(switcher);
  cardsContainer.appendChild(loseCard);
  cardsContainer.appendChild(maintailCard);
  cardsContainer.appendChild(gainCard);
  
  div.appendChild(cardsContainer);
  return div;
};

export default getBju;