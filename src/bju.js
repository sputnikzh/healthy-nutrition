const getBju = () => {
  const div = document.createElement("div");
  div.classList.add('bju-info');
  const currentDate = new Date();
  const dateSpan = document.createElement('span');
  dateSpan.textContent = currentDate.toLocaleString('ru-RU');
  div.appendChild(dateSpan);
  return div;
}

export default getBju;