function calculateKBZU({ sex, weight, height, age, activityLevel, goal }) {
  // 1. Расчёт BMR (Миффлина-Сан Жеора)
  let bmr;
  if (sex === 'male') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  // 2. Множитель активности
  const activityMultipliers = {
    low: 1.2,
    light: 1.375,
    moderate: 1.55,
    high: 1.725,
    very_high: 1.9,
  };
  const multiplier = activityMultipliers[activityLevel] || 1.2;
  const tdee = bmr * multiplier;

  // 3. Корректировка под цель
  let calories, protein, fat;
  switch (goal) {
    case 'lose': // снижение веса
      calories = tdee * 0.8;
      protein = 2.0 * weight;
      fat = 1.0 * weight;
      break;
    case 'gain': // набор массы
      calories = tdee * 1.15;
      protein = 2.0 * weight;
      fat = 1.2 * weight;
      break;
    case 'maintain': // поддержание
    default:
      calories = tdee;
      protein = 1.6 * weight;
      fat = 1.0 * weight;
      break;
  }

  // 4. Расчёт углеводов
  const proteinKcal = protein * 4;
  const fatKcal = fat * 9;
  const carbsKcal = calories - (proteinKcal + fatKcal);
  const carbs = carbsKcal / 4;

  return {
    calories: Math.round(calories),
    protein_g: Math.round(protein),
    fat_g: Math.round(fat),
    carbs_g: Math.round(carbs),
  };
}
export default calculateKBZU