const symbols = [
  { id: "ten", icon: "10", label: "", weight: 16, pay: 1.5 },
  { id: "jack", icon: "J", label: "", weight: 14, pay: 2 },
  { id: "watermelon", icon: "🍉", label: "西瓜", weight: 12, pay: 3 },
  { id: "cherry", icon: "🍒", label: "樱桃", weight: 11, pay: 4 },
  { id: "pineapple", icon: "🍍", label: "菠萝", weight: 9, pay: 5 },
  { id: "starfruit", icon: "⭐", label: "星果", weight: 7, pay: 8 },
  { id: "wild", icon: "🥤", label: "WILD", weight: 5, pay: 0 },
  { id: "scatter", icon: "✦", label: "SCATTER", weight: 4, pay: 0 },
  { id: "bonus", icon: "🪙", label: "BONUS", weight: 3, pay: 0 }
];

const paylines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [6, 4, 2]
];

const betSteps = [10, 20, 50, 100];
const state = {
  credits: 1000,
  betIndex: 0,
  lastWin: 0,
  freeSpins: 0,
  autoMode: false,
  isSpinning: false,
  jackpots: {
    grand: 80000,
    major: 20000,
    mini: 8000
  },
  result: []
};

const els = {
  reels: document.querySelector("#reels"),
  credits: document.querySelector("#creditsValue"),
  bet: document.querySelector("#betValue"),
  lastWin: document.querySelector("#lastWinValue"),
  grand: document.querySelector("#grandValue"),
  major: document.querySelector("#majorValue"),
  mini: document.querySelector("#miniValue"),
  message: document.querySelector("#messageText"),
  free: document.querySelector("#freeText"),
  toast: document.querySelector("#winToast"),
  spin: document.querySelector("#spinButton"),
  auto: document.querySelector("#autoButton"),
  take: document.querySelector("#takeButton"),
  betDown: document.querySelector("#betDownButton"),
  betUp: document.querySelector("#betUpButton"),
  wheel: document.querySelector(".citrus-wheel")
};

function formatNumber(value) {
  return Math.round(value).toLocaleString("zh-CN");
}

function currentBet() {
  return betSteps[state.betIndex];
}

function weightedSymbol() {
  const total = symbols.reduce((sum, item) => sum + item.weight, 0);
  let roll = Math.random() * total;

  for (const item of symbols) {
    roll -= item.weight;
    if (roll <= 0) return item;
  }

  return symbols[0];
}

function randomResult() {
  return Array.from({ length: 9 }, weightedSymbol);
}

function renderReels(spinning = false, winIndexes = new Set()) {
  els.reels.innerHTML = "";

  state.result.forEach((symbol, index) => {
    const cell = document.createElement("div");
    cell.className = "symbol";
    cell.dataset.id = symbol.id;
    if (spinning) cell.classList.add("spinning");
    if (winIndexes.has(index)) cell.classList.add("win");

    const icon = document.createElement("div");
    icon.className = "symbol-icon";
    icon.textContent = symbol.icon;

    const label = document.createElement("div");
    label.className = "symbol-label";
    label.textContent = symbol.label;

    cell.append(icon, label);
    els.reels.appendChild(cell);
  });
}

function updateHud() {
  els.credits.textContent = formatNumber(state.credits);
  els.bet.textContent = formatNumber(currentBet());
  els.lastWin.textContent = formatNumber(state.lastWin);
  els.free.textContent = `Free Spins: ${state.freeSpins}`;
  els.grand.textContent = formatNumber(state.jackpots.grand);
  els.major.textContent = formatNumber(state.jackpots.major);
  els.mini.textContent = formatNumber(state.jackpots.mini);
  els.auto.classList.toggle("active", state.autoMode);
  els.spin.classList.toggle("spinning", state.isSpinning);
  els.spin.disabled = state.isSpinning;
  els.betDown.disabled = state.isSpinning || state.betIndex === 0;
  els.betUp.disabled = state.isSpinning || state.betIndex === betSteps.length - 1;
}

function showToast(text) {
  els.toast.textContent = text;
  els.toast.classList.remove("show");
  void els.toast.offsetWidth;
  els.toast.classList.add("show");
}

function setMessage(text) {
  els.message.textContent = text;
}

function countSymbols(id) {
  return state.result.filter((symbol) => symbol.id === id).length;
}

function resolveLine(line) {
  const lineSymbols = line.map((index) => state.result[index]);
  const regular = lineSymbols.find((symbol) => !["wild", "scatter", "bonus"].includes(symbol.id));
  if (!regular) return null;

  const matched = lineSymbols.every((symbol) => symbol.id === regular.id || symbol.id === "wild");
  if (!matched) return null;

  return {
    symbol: regular,
    indexes: line,
    win: Math.round(currentBet() * regular.pay)
  };
}

function pulseJackpot(tier) {
  const panel = document.querySelector(`.jackpot[data-tier="${tier}"]`);
  if (!panel) return;
  panel.classList.remove("pulse");
  void panel.offsetWidth;
  panel.classList.add("pulse");
}

function burstWheel() {
  els.wheel.classList.remove("spin-burst");
  void els.wheel.offsetWidth;
  els.wheel.classList.add("spin-burst");
}

function settle() {
  const winIndexes = new Set();
  let lineWin = 0;
  let lineCount = 0;

  paylines.forEach((line) => {
    const resolved = resolveLine(line);
    if (!resolved) return;
    lineWin += resolved.win;
    lineCount += 1;
    resolved.indexes.forEach((index) => winIndexes.add(index));
  });

  const scatterCount = countSymbols("scatter");
  const bonusCount = countSymbols("bonus");
  let featureWin = 0;

  if (scatterCount >= 3) {
    state.freeSpins += 5;
    burstWheel();
    setMessage("SCATTER触发，获得5次Free Game。");
    showToast("FREE GAME +5");
  }

  if (bonusCount >= 3) {
    const roll = Math.random();
    const tier = roll > 0.94 ? "grand" : roll > 0.72 ? "major" : "mini";
    const multiplier = tier === "grand" ? 80 : tier === "major" ? 20 : 8;
    featureWin += currentBet() * multiplier;
    pulseJackpot(tier);
    burstWheel();
    setMessage(`${tier.toUpperCase()}奖池触发，果汁金币爆发。`);
  }

  state.lastWin = lineWin + featureWin;
  state.credits += state.lastWin;

  if (lineWin > 0) {
    setMessage(`${lineCount}条赔线中奖，果汁管道已加压。`);
  }

  if (state.lastWin > 0) {
    renderReels(false, winIndexes);
    showToast(`WIN ${formatNumber(state.lastWin)}`);
  } else if (scatterCount < 3 && bonusCount < 3) {
    renderReels(false);
    setMessage("未命中，下一次果汁能量继续累积。");
  } else {
    renderReels(false, winIndexes);
  }

  Object.keys(state.jackpots).forEach((key) => {
    state.jackpots[key] += Math.round(currentBet() * (key === "grand" ? 0.09 : key === "major" ? 0.05 : 0.03));
  });

  updateHud();
}

function spin() {
  if (state.isSpinning) return;

  const bet = currentBet();
  const free = state.freeSpins > 0;

  if (!free && state.credits < bet) {
    state.autoMode = false;
    setMessage("余额不足，请降低下注或重置Demo。");
    updateHud();
    return;
  }

  state.isSpinning = true;
  state.lastWin = 0;
  if (free) {
    state.freeSpins -= 1;
    setMessage("Free Spin进行中，不扣除余额。");
  } else {
    state.credits -= bet;
    setMessage("果汁卷轴启动。");
  }

  state.result = randomResult();
  renderReels(true);
  updateHud();

  window.setTimeout(() => {
    state.isSpinning = false;
    settle();

    if (state.autoMode) {
      window.setTimeout(spin, state.freeSpins > 0 ? 850 : 1050);
    }
  }, 980 + Math.random() * 340);
}

function changeBet(delta) {
  if (state.isSpinning) return;
  state.betIndex = Math.min(betSteps.length - 1, Math.max(0, state.betIndex + delta));
  setMessage(`下注调整为 ${currentBet()}。`);
  updateHud();
}

function init() {
  state.result = [
    symbols[0],
    symbols[6],
    symbols[1],
    symbols[2],
    symbols[3],
    symbols[4],
    symbols[6],
    symbols[5],
    symbols[8]
  ];

  renderReels(false);
  updateHud();

  els.spin.addEventListener("click", spin);
  els.betDown.addEventListener("click", () => changeBet(-1));
  els.betUp.addEventListener("click", () => changeBet(1));
  els.take.addEventListener("click", () => {
    state.lastWin = 0;
    setMessage("已收下本轮奖励，准备下一次Spin。");
    updateHud();
  });
  els.auto.addEventListener("click", () => {
    state.autoMode = !state.autoMode;
    setMessage(state.autoMode ? "Auto Spin已启动。" : "Auto Spin已停止。");
    updateHud();
    if (state.autoMode && !state.isSpinning) spin();
  });
}

init();

