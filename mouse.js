// ===== ЗАДАНИЕ 1: КООРДИНАТЫ МЫШИ =====
const mouseArea = document.querySelector(".mouse-area");
const coordDisplay = document.querySelector(".coord-display");

// Отслеживание движения мыши
mouseArea.addEventListener("mousemove", (e) => {
  // clientX/clientY - координаты относительно окна браузера
  coordDisplay.textContent = `X = ${e.clientX}, Y = ${e.clientY}`;
});

// Определение кнопки мыши
mouseArea.addEventListener("mousedown", (e) => {
  let buttonName;
  if (e.button === 0) buttonName = "Левая";
  else if (e.button === 2) buttonName = "Правая";
  else buttonName = "Другая";

  coordDisplay.textContent = `Нажата ${buttonName} кнопка мыши`;
});

// Блокировка контекстного меню правой кнопки
mouseArea.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});
