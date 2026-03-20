// ===== ЗАДАНИЕ 2: ПОДСВЕТКА ЯЧЕЕК =====
const tableCells = document.querySelectorAll(
  ".styled-table td, .styled-table th",
);
tableCells.forEach((cell) => {
  cell.addEventListener("mouseenter", () => {
    cell.style.background = "linear-gradient(90deg, #dbeafe, #bfdbfe)";
    cell.style.color = "#1e40af";
  });
  cell.addEventListener("mouseleave", () => {
    cell.style.background = "";
    cell.style.color = "";
  });
});

// ===== ЗАДАНИЕ 3: ВЫБОР КНИГ =====
const books = document.querySelectorAll(".book-list li");
let lastSelectedIndex = -1;

books.forEach((book, index) => {
  book.addEventListener("click", (e) => {
    if (e.ctrlKey) {
      book.classList.toggle("selected");
      lastSelectedIndex = index;
    } else if (e.shiftKey && lastSelectedIndex !== -1) {
      const start = Math.min(lastSelectedIndex, index);
      const end = Math.max(lastSelectedIndex, index);
      books.forEach((b) => b.classList.remove("selected"));
      for (let i = start; i <= end; i++) {
        books[i].classList.add("selected");
      }
    } else {
      books.forEach((b) => b.classList.remove("selected"));
      book.classList.add("selected");
      lastSelectedIndex = index;
    }
  });
});

// ===== ЗАДАНИЕ 4: ЦВЕТНЫЕ БЛОКИ =====
const addBlockBtn = document.getElementById("addBlockBtn");
const blocksContainer = document.querySelector(".blocks-container");

addBlockBtn.addEventListener("click", () => {
  const block = document.createElement("div");
  block.className = "block";
  block.textContent = "❌";

  // Случайный яркий цвет
  const hue = Math.floor(Math.random() * 360);
  block.style.background = `linear-gradient(135deg, hsl(${hue}, 80%, 60%), hsl(${hue + 30}, 80%, 60%))`;

  // Удаление блока при клике
  block.addEventListener("click", () => block.remove());

  blocksContainer.appendChild(block);
});

// ===== ЗАДАНИЕ 5: ДЕРЕВО ПАПОК =====
const folders = document.querySelectorAll(".folder");

folders.forEach((folder) => {
  folder.addEventListener("click", (e) => {
    e.stopPropagation();
    const parentLi = folder.parentElement;
    const nestedUl = parentLi.querySelector("ul");

    if (nestedUl) {
      parentLi.classList.toggle("open");
    }
  });
});

// Открываем все папки по умолчанию
document.querySelectorAll(".folder-tree li").forEach((li) => {
  if (li.querySelector("ul")) {
    li.classList.add("open");
  }
});

// ===== ЗАДАНИЕ 6: КАЛЬКУЛЯТОР =====
class Calculator {
  constructor(previousOperandElement, currentOperandElement) {
    this.previousOperandElement = previousOperandElement;
    this.currentOperandElement = currentOperandElement;
    this.clear();
  }

  clear() {
    this.currentOperand = "0";
    this.previousOperand = "";
    this.operation = undefined;
  }

  delete() {
    if (this.currentOperand === "0" || this.currentOperand.length === 1) {
      this.currentOperand = "0";
    } else {
      this.currentOperand = this.currentOperand.slice(0, -1);
    }
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    if (this.currentOperand === "0" && number !== ".") {
      this.currentOperand = number;
    } else {
      this.currentOperand += number;
    }
  }

  chooseOperation(operation) {
    if (this.currentOperand === "0") return;
    if (this.previousOperand !== "") this.compute();
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "0";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "/":
        computation = prev / current;
        break;
      default:
        return;
    }

    this.currentOperand = computation.toString();
    this.operation = undefined;
    this.previousOperand = "";
  }

  updateDisplay() {
    this.currentOperandElement.textContent = this.currentOperand;
    this.previousOperandElement.textContent = this.operation
      ? `${this.previousOperand} ${this.operation}`
      : "";
  }
}

const calculator = new Calculator(
  document.querySelector(".previous-operand"),
  document.querySelector(".current-operand"),
);

document
  .querySelectorAll(".calc-buttons button[data-number]")
  .forEach((button) => {
    button.addEventListener("click", () => {
      calculator.appendNumber(button.getAttribute("data-number"));
      calculator.updateDisplay();
    });
  });

document
  .querySelectorAll(".calc-buttons button[data-action]")
  .forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.getAttribute("data-action");

      switch (action) {
        case "clear":
          calculator.clear();
          calculator.updateDisplay();
          break;
        case "delete":
          calculator.delete();
          calculator.updateDisplay();
          break;
        case "add":
          calculator.chooseOperation("+");
          calculator.updateDisplay();
          break;
        case "subtract":
          calculator.chooseOperation("-");
          calculator.updateDisplay();
          break;
        case "multiply":
          calculator.chooseOperation("*");
          calculator.updateDisplay();
          break;
        case "divide":
          calculator.chooseOperation("/");
          calculator.updateDisplay();
          break;
        case "equals":
          calculator.compute();
          calculator.updateDisplay();
          break;
      }
    });
  });

// ===== ЗАДАНИЕ 7: ЗАПРЕТ ВЫДЕЛЕНИЯ =====
const noSelectSection = document.querySelector(".no-select-section");
const protectedInput = document.querySelector(".protected-input");

noSelectSection.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  alert("Контекстное меню заблокировано!");
});

noSelectSection.addEventListener("copy", (e) => e.preventDefault());
noSelectSection.addEventListener("cut", (e) => e.preventDefault());
noSelectSection.addEventListener("selectstart", (e) => e.preventDefault());

noSelectSection.addEventListener("keydown", (e) => {
  if (e.ctrlKey && ["c", "x", "v", "a"].includes(e.key.toLowerCase())) {
    e.preventDefault();
    alert(`Комбинация Ctrl+${e.key.toUpperCase()} заблокирована!`);
  }
});

protectedInput.addEventListener("paste", (e) => {
  e.preventDefault();
  alert("Вставка заблокирована!");
});

// ===== ЗАДАНИЕ 8: ИГРА В ФАНТЫ =====
class FantasyGame {
  constructor() {
    this.players = [];
    this.remainingPlayers = [];
    this.eliminatedPlayers = [];
    this.history = [];

    this.initElements();
    this.initEventListeners();
  }

  initElements() {
    this.startGameBtn = document.getElementById("startGameBtn");
    this.addPlayersBtn = document.getElementById("addPlayersBtn");
    this.resetGameBtn = document.getElementById("resetGameBtn");
    this.choosePlayerBtn = document.getElementById("choosePlayerBtn");
    this.playersList = document.getElementById("playersList");
    this.selectedPlayer = document.getElementById("selectedPlayer");
    this.eliminatedPlayersList = document.getElementById("eliminatedPlayers");
    this.historyList = document.getElementById("historyList");
    this.totalPlayersSpan = document.getElementById("totalPlayers");
    this.remainingPlayersSpan = document.getElementById("remainingPlayers");
  }

  initEventListeners() {
    this.addPlayersBtn.addEventListener("click", () => this.addPlayers());
    this.startGameBtn.addEventListener("click", () => this.startGame());
    this.resetGameBtn.addEventListener("click", () => this.resetGame());
    this.choosePlayerBtn.addEventListener("click", () =>
      this.chooseRandomPlayer(),
    );
  }

  addPlayers() {
    const input = prompt(
      "Введите имена участников через запятую:\n(Например: Анна, Борис, Виктор, Дарья)",
      "Даниил, Мария, Алексей, Ольга, Сергей",
    );

    if (input && input.trim() !== "") {
      this.players = input
        .split(",")
        .map((name) => name.trim())
        .filter((name) => name !== "");
      this.remainingPlayers = [...this.players];
      this.updateDisplay();
      alert(`Добавлено ${this.players.length} участников!`);
    }
  }

  startGame() {
    if (this.players.length === 0) {
      alert("Сначала добавьте участников!");
      return;
    }

    this.choosePlayerBtn.disabled = false;
    this.startGameBtn.disabled = true;
    alert('Игра началась! Нажимайте кнопку "ВЫБРАТЬ" для выбора игрока.');
  }

  chooseRandomPlayer() {
    if (this.remainingPlayers.length === 0) {
      alert("Все игроки уже выбыли!");
      return;
    }

    const randomIndex = Math.floor(
      Math.random() * this.remainingPlayers.length,
    );
    const chosenPlayer = this.remainingPlayers[randomIndex];

    this.remainingPlayers.splice(randomIndex, 1);
    this.eliminatedPlayers.push(chosenPlayer);

    const timestamp = new Date().toLocaleTimeString();
    this.history.push({ player: chosenPlayer, time: timestamp });

    this.animateSelection(chosenPlayer);
    this.updateDisplay();

    if (this.remainingPlayers.length === 0) {
      setTimeout(() => {
        alert("Игра окончена! Все игроки выбыли.");
        this.choosePlayerBtn.disabled = true;
      }, 500);
    }
  }

  animateSelection(playerName) {
    const element = this.selectedPlayer;
    element.textContent = "🎲";

    let counter = 0;
    const interval = setInterval(() => {
      if (counter < 8) {
        const randomIndex = Math.floor(Math.random() * this.players.length);
        element.textContent = this.players[randomIndex];
        counter++;
      } else {
        clearInterval(interval);
        element.textContent = playerName;
        element.style.transform = "scale(1.2)";
        setTimeout(() => (element.style.transform = "scale(1)"), 300);
      }
    }, 100);
  }

  updateDisplay() {
    this.totalPlayersSpan.textContent = this.players.length;
    this.remainingPlayersSpan.textContent = this.remainingPlayers.length;

    this.playersList.innerHTML = "";
    if (this.players.length === 0) {
      this.playersList.innerHTML =
        '<p class="empty-msg">Игроки не добавлены</p>';
    } else {
      this.players.forEach((player) => {
        const isEliminated = this.eliminatedPlayers.includes(player);
        const div = document.createElement("div");
        div.className = `player-item ${isEliminated ? "player-eliminated" : ""}`;
        div.innerHTML = `<span>${player}</span><span>${isEliminated ? "❌ Выбыл" : "✅ В игре"}</span>`;
        this.playersList.appendChild(div);
      });
    }

    this.eliminatedPlayersList.innerHTML = "";
    if (this.eliminatedPlayers.length === 0) {
      this.eliminatedPlayersList.innerHTML =
        '<p class="empty-msg">Пока никого</p>';
    } else {
      this.eliminatedPlayers.forEach((player) => {
        const div = document.createElement("div");
        div.className = "eliminated-player";
        div.textContent = player;
        this.eliminatedPlayersList.appendChild(div);
      });
    }

    this.historyList.innerHTML = "";
    this.history
      .slice()
      .reverse()
      .forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "history-item";
        div.textContent = `${this.history.length - index}. ${item.player} (${item.time})`;
        this.historyList.appendChild(div);
      });

    this.startGameBtn.disabled = this.players.length === 0;
    this.choosePlayerBtn.disabled =
      this.players.length === 0 || this.remainingPlayers.length === 0;
  }

  resetGame() {
    if (confirm("Вы уверены, что хотите сбросить игру?")) {
      this.players = [];
      this.remainingPlayers = [];
      this.eliminatedPlayers = [];
      this.history = [];
      this.updateDisplay();
      this.selectedPlayer.textContent = "—";
      this.startGameBtn.disabled = false;
      alert("Игра сброшена!");
    }
  }
}

const game = new FantasyGame();
