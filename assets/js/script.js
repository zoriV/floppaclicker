import { openModal, closeModal } from "./modalController.js";

const clicker = document.querySelector("#clicker");
const reset = document.querySelector("#reset");
const resetDialog = document.querySelector("#resetDialog");
const resetDialog_confirm = document.querySelector("#confirmReset");
const resetDialog_cancel = document.querySelector("#cancelReset");
const scoreOut = document.querySelector("#score");
const store = document.querySelector("#store");
const storeBtn = document.querySelector("#openStore");
const store_multiplier = document.querySelector("#store_multiplier");
const store_generator = document.querySelector("#store_generator");
const store_ownedGen = document.querySelector("#ownedGen");
const store_ownedMulti = document.querySelector("#ownedMulti");
const pointsOut = document.querySelector("#yourPoints");

const PRICES = Object.freeze({
  multiplier: 250,
  generator: 550,
});

const canBuy = (price, score) => {
  return score >= price;
};

const addPoints = (amount, useMultiplier) => {
  useMultiplier ? (score += amount * items.multiplier) : (score += amount);
  setStorage(score);
  setOutput(score);
};

const removePoints = (amount) => {
  score -= amount;
  setStorage(score);
  setOutput(score);
};

const setStorage = (score) => {
  window.localStorage.setItem("score", score);
};

const setOutput = (score) => {
  scoreOut.innerText = score;
  pointsOut.innerText = score;
};

const resetProgress = () => {
  score = 0;
  setStorage(0);
  setOutput(0);
};

const getCurrentScore = () => {
  return Number.parseInt(window.localStorage.getItem("score"));
};

const updateStore = (score) => {
  if (score >= PRICES.multiplier) store_multiplier.classList.add("available");
  else {
    if (store_multiplier.classList.contains("available")) store_multiplier.classList.remove("available");
  }

  if (score >= PRICES.generator) store_generator.classList.add("available");
  else {
    if (store_generator.classList.contains("available")) store_generator.classList.remove("available");
  }

  pointsOut.innerText = score;
};

const updateMultiplier = () => {
  if (canBuy(PRICES.multiplier, score)) {
    removePoints(PRICES.multiplier);
    items.multiplier++;
    store_ownedMulti.innerText = items.multiplier;
    updateStore(score);
    setOutput(score);
    window.localStorage.setItem("items_multiplier", items.multiplier);
  }
};

const updateGenerator = () => {
  if (canBuy(PRICES.generator, score)) {
    removePoints(PRICES.generator);
    items.generator++;
    store_ownedGen.innerText = items.generator;
    updateStore(score);
    setOutput(score);
    window.localStorage.setItem("items_generator", items.multiplier);
  }
};

const items = {};

const loadItems = () => {
  items.multiplier = Number.parseInt(window.localStorage.getItem("items_multiplier")) || 1;
  items.generator = Number.parseInt(window.localStorage.getItem("items_generator")) || 0;
  store_ownedMulti.innerText = items.multiplier;
  store_ownedGen.innerText = items.generator;

  setInterval(() => {
    addPoints(items.generator, false);
  }, 1000);
};
loadItems();
// const getItems = () => {
//   const m = Number.parseInt(window.localStorage.getItem("store_multiplier")) || 1,
//     g = Number.parseInt(window.localStorage.getItem("store_generator")) || 0;
//   return {
//     multiplier: m,
//     generator: g,
//   };
// };

let score = getCurrentScore() || 0;
setOutput(score);

clicker.addEventListener("mousedown", () => {
  addPoints(1, true);
  if (!clicker.classList.contains("pop")) {
    clicker.classList.add("pop");
    clicker.src = "assets/img/floppa2.jpg";
    clicker.addEventListener(
      "animationend",
      () => {
        clicker.classList.remove("pop");
      },
      { once: true }
    );
    window.addEventListener(
      "mouseup",
      () => {
        clicker.src = "assets/img/floppa.jpg";
      },
      { once: true }
    );
  }
});

reset.addEventListener("click", () => {
  openModal(resetDialog);
});

store_multiplier.addEventListener("click", () => {
  updateMultiplier();
});

store_generator.addEventListener("click", () => {
  updateGenerator();
});

resetDialog_cancel.addEventListener("click", () => {
  closeModal(resetDialog);
});

resetDialog_confirm.addEventListener("click", () => {
  resetProgress();
  closeModal(resetDialog);
});

storeBtn.addEventListener("click", () => {
  updateStore(score);
  openModal(store);
});
