// High-grade URLs pointing directly to official raw data repositories
const OFFICIAL_ANSWERS_URL = "https://githubusercontent.com";
const OFFICIAL_GUESSES_URL = "https://githubusercontent.com";

let targetPool = [];
let dictionaryWords = [];

let currentMode = "normal"; // normal, hard, extreme
let targetWord = "";
let currentGuess = "";
let currentRow = 0;
let gameOver = false;

// Challenge Variables
let timerEnabled = false;
let timerRunning = false;
let timeLeft = 300;
let timerInterval = null;
let bonusForfeited = false;

let cachedFeedback = [];
let cachedGuess = "";

document.addEventListener("DOMContentLoaded", () => {
    // Generate structural layouts IMMEDIATELY on screen layout paint
    buildGrid();
    buildKeyboard();
    loadOfficialWordLists();
});

// Automatically fetch the entire official 13,000+ Wordle database on startup
function loadOfficialWordLists() {
    Promise.all([
        fetch(OFFICIAL_ANSWERS_URL).then(res => res.text()),
        fetch(OFFICIAL_GUESSES_URL).then(res => res.text())
    ])
    .then(([answersText, guessesText]) => {
        targetPool = answersText.split("\n").map(w => w.trim().toLowerCase()).filter(w => w.length === 5);
        const allowedGuesses = guessesText.split("\n").map(w => w.trim().toLowerCase()).filter(w => w.length === 5);
        dictionaryWords = [...targetPool, ...allowedGuesses];
        
        // Lock in calculation hooks now that the network load is complete
        setupGameMode();
        setupEventListeners();
    })
    .catch(err => {
        console.error("Failed to stream official lists:", err);
        targetPool = ["crane", "apple", "beach", "dance", "eagle", "pecan", "leaky", "peaky"];
        dictionaryWords = [...targetPool, "about", "above", "bread", "brick"];
        setupGameMode();
        setupEventListeners();
    });
}

function setupGameMode() {
    if (targetPool.length === 0) return;
    
    currentMode = document.getElementById("modeSelector").value;
    clearInterval(timerInterval);
    timerRunning = false;
    timeLeft = 300;
    bonusForfeited = false;
    gameOver = false;
    currentRow = 0;
    currentGuess = "";
    cachedFeedback = [];
    cachedGuess = "";
    
    document.getElementById("timerDisplay").classList.add("hidden");
    document.getElementById("timerDisplay").innerText = "Time Remaining: 05:00";
    document.getElementById("completionBadge").classList.add("hidden");

    const dateStr = new Date().toLocaleDateString();
    const completedModes = JSON.parse(localStorage.getItem(`completed_${dateStr}`)) || [];
    
    if (completedModes.includes(currentMode)) {
        document.getElementById("completionBadge").classList.remove("hidden");
        gameOver = true;
    }

    const today = new Date();
    const dateSeed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    let modeOffset = currentMode === "normal" ? 0 : currentMode === "hard" ? 33 : 88;
    let targetIndex = (dateSeed + modeOffset) % targetPool.length;
    targetWord = targetPool[targetIndex];

    // Clear old row text data styles seamlessly
    const rows = document.querySelectorAll(".grid-row");
    rows.forEach(row => {
        const tiles = row.querySelectorAll(".tile");
        tiles.forEach(tile => {
            tile.innerText = "";
            tile.className = "tile";
        });
    });
}

function buildGrid() {
    const grid = document.getElementById("gameGrid");
    grid.innerHTML = "";
    for (let r = 0; r < 6; r++) {
        const row = document.createElement("div");
        row.className = "grid-row";
        row.dataset.row = r;
        for (let t = 0; t < 5; t++) {
            const tile = document.createElement("div");
            tile.className = "tile";
            row.appendChild(tile);
        }
        grid.appendChild(row);
    }
}

function buildKeyboard() {
    const layout = [
        ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
        ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
        ["enter", "z", "x", "c", "v", "b", "n", "m", "back"]
    ];
    const container = document.getElementById("keyboard");
    container.innerHTML = "";
    layout.forEach(row => {
        const rowDiv = document.createElement("div");
        rowDiv.className = "kb-row";
        row.forEach(key => {
            const btn = document.createElement("button");
            btn.innerText = key;
            btn.className = "key";
            btn.dataset.key = key;
            if(key === "enter" || key === "back") btn.classList.add("wide");
            btn.addEventListener("click", () => processInput(key));
            rowDiv.appendChild(btn);
        });
        container.appendChild(rowDiv);
    });
}

function processInput(key) {
    if (gameOver) return;
    if (key === "back" || key === "backspace") {
        if (currentGuess.length > 0) {
            currentGuess = currentGuess.slice(0, -1);
            repaintInputTiles();
        }
    } else if (key === "enter") {
        if (currentGuess.length === 5) commitAttempt();
        else showToast("Short of 5 letters");
    } else if (/^[a-z]$/i.test(key) && currentGuess.length < 5) {
        currentGuess += key.toLowerCase();
        repaintInputTiles();
    }
}

function repaintInputTiles() {
    const tiles = document.querySelectorAll(`.grid-row[data-row="${currentRow}"] .tile`);
    for (let i = 0; i < 5; i++) {
        tiles[i].innerText = currentGuess[i] || "";
        if(currentGuess[i]) tiles[i].classList.add("filled");
        else tiles[i].classList.remove("filled");
    }
}

function commitAttempt() {
    if (!dictionaryWords.includes(currentGuess)) {
        showToast("Not in dictionary pool");
        return;
    }

    // Hard Mode Validation Loop
    if (currentMode === "hard" && cachedFeedback.length > 0) {
        for (let i = 0; i < 5; i++) {
            if (cachedFeedback[i] === "correct" && currentGuess[i] !== cachedGuess[i]) {
                showToast(`Hard Mode: Slot ${i+1} must be ${cachedGuess[i].toUpperCase()}`);
                return;
            }
            if (cachedFeedback[i] === "present" && !currentGuess.includes(cachedGuess[i])) {
                showToast(`Hard Mode: Missing ${cachedGuess[i].toUpperCase()}`);
                return;
            }
        }
    }

    // Trigger Clock activation strictly upon first legal guess submission
    if (timerEnabled && !timerRunning && currentRow === 0) {
        timerRunning = true;
        document.getElementById("timerDisplay").classList.remove("hidden");
        timerInterval = setInterval(() => {
            timeLeft--;
            let mins = Math.floor(timeLeft / 60);
            let secs = timeLeft % 60;
            document.getElementById("timerDisplay").innerText = `Time Remaining: ${mins}:${secs < 10 ? '0' : ''}${secs}`;
            
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                bonusForfeited = true;
                document.getElementById("timerDisplay").innerText = "Timer Expired! Payout drops to base rate.";
                showToast("Time run out! Double score multiplier forfeited.");
            }
        }, 1000);
    }

    const tiles = document.querySelectorAll(`.grid-row[data-row="${currentRow}"] .tile`);
    let counts = {};
    for (let c of targetWord) counts[c] = (counts[c] || 0) + 1;

    let rowStates = Array(5).fill("absent");
    for(let i=0; i<5; i++) {
        if(currentGuess[i] === targetWord[i]) { rowStates[i] = "correct"; counts[currentGuess[i]]--; }
    }
    for(let i=0; i<5; i++) {
        if(rowStates[i] !== "correct" && targetWord.includes(currentGuess[i]) && counts[currentGuess[i]] > 0) {
            rowStates[i] = "present"; counts[currentGuess[i]]--;
        }
    }

    const winStatus = currentGuess === targetWord;

    for (let i = 0; i < 5; i++) {
        if (currentMode === "extreme" && !winStatus) {
            if (rowStates[i] === "correct" || rowStates[i] === "present") {
                tiles[i].classList.add("present");
            } else {
                tiles[i].classList.add("absent");
            }
        } else {
            tiles[i].classList.add(rowStates[i]);
            updateKBColor(currentGuess[i], rowStates[i]);
        }
    }

    if (winStatus) {
        if (currentMode === "extreme") {
            tiles.forEach(t => { t.className = "tile correct"; });
        }
        concludeGame(true);
        return;
    }

    cachedFeedback = [...rowStates];
    cachedGuess = currentGuess;
    currentRow++;
    currentGuess = "";

    if (currentRow === 6) concludeGame(false);
}

function updateKBColor(letter, status) {
    const key = document.querySelector(`.key[data-key="${letter}"]`);
    if (!key || key.classList.contains("correct")) return;
    key.className = `key ${status}`;
}

function concludeGame(won) {
    gameOver = true;
    clearInterval(timerInterval);
    
    const dateStr = new Date().toLocaleDateString();
    let completedModes = JSON.parse(localStorage.getItem(`completed_${dateStr}`)) || [];
    if (!completedModes.includes(currentMode)) {
        completedModes.push(currentMode);
    }
    localStorage.setItem(`completed_${dateStr}`, JSON.stringify(completedModes));

    let base = currentMode === "normal" ? 10 : currentMode === "hard" ? 25 : 100;
    if (timerEnabled && !bonusForfeited && won) base *= 2; 
    if (!won) base = 0;

    if (won) {
        setTimeout(() => {
            let name = prompt(`Victory! You scored ${base} points. Enter your username for the Leaderboard:`) || "Anonymous";
            let board = JSON.parse(localStorage.getItem("w_leaderboard")) || [];
            board.push({name, score: base, date: dateStr});
            board.sort((a,b) => b.score - a.score);
localStorage.setItem("w_leaderboard", JSON.stringify(board.slice(0, 10)));
renderLeaderboard();
openModal("leaderboardModal");
}, 600);
} else {
showToast(Game Over! The word was ${targetWord.toUpperCase()});
setTimeout(() => {
renderLeaderboard();
openModal("leaderboardModal");
}, 1200);
}
}
function renderLeaderboard() {
const list = document.getElementById("leaderboardList");
list.innerHTML = "";
let board = JSON.parse(localStorage.getItem("w_leaderboard")) || [];
if(board.length === 0) {
list.innerHTML = "No entries yet. Be the first to score!";
} else {
board.forEach(entry => {
let li = document.createElement("li");
li.innerHTML = <strong>${entry.name}</strong> - ${entry.score} pts (${entry.date});
list.appendChild(li);
});
}
const defReveal = document.getElementById("wordReveal");
const defText = document.getElementById("wordDefinition");
document.getElementById("dictionarySection").classList.remove("hidden");
defReveal.innerHTML = Word of the Day: <strong>${targetWord.toUpperCase()}</strong>;
defText.innerText = "Looking up matching definition strings...";
fetch(https://dictionaryapi.dev{targetWord})
.then(res => res.json())
.then(data => {
const definition = data.meanings.definitions.definition;
defText.innerText = definition;
})
.catch(() => { defText.innerText = "Definition lookup completed. Entry meaning discovered via context."; });
}
function showToast(m) {
const container = document.getElementById("toastContainer");
if (!container) return;
const el = document.createElement("div"); el.className = "toast"; el.innerText = m;
container.appendChild(el);
setTimeout(() => el.remove(), 2500);
}
function openModal(id) { document.getElementById(id).classList.remove("hidden"); }
function closeModal(id) { document.getElementById(id).classList.add("hidden"); }
function setupEventListeners() {
document.getElementById("modeSelector").removeEventListener("change", setupGameMode);
document.getElementById("modeSelector").addEventListener("change", setupGameMode);
document.getElementById("settingsBtn").onclick = () => openModal("settingsModal");
document.getElementById("closeSettings").onclick = () => closeModal("settingsModal");
document.getElementById("leaderboardBtn").onclick = () => { renderLeaderboard(); openModal("leaderboardModal"); };
document.getElementById("closeLeaderboard").onclick = () => closeModal("leaderboardModal");
document.getElementById("timerToggle").onchange = (e) => {
timerEnabled = e.target.checked;
setupGameMode();
};
document.onkeydown = (e) => {
if(e.key === "Backspace") processInput("back");
else if(e.key === "Enter") processInput("enter");
else processInput(e.key.toLowerCase());
};
}
