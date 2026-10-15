const targetPool = [
    "crane", "apple", "beach", "dance", "eagle", "react", "world", "heavy", "plant", "music", 
    "glove", "flame", "tower", "train", "pecan", "leaky", "peaky", "about", "above", "acute", 
    "adult", "agent", "agony", "agree", "ahead", "alarm", "album", "alert", "alike", "alive", 
    "allow", "alone", "along", "alter", "among", "anger", "angle", "angry", "apart", "apron", 
    "argue", "arise", "arrow", "aside", "asset", "audio", "audit", "awake", "award", "aware", 
    "awful", "bacon", "badge", "baker", "banjo", "barge", "barrel", "basin", "basket", "baste", 
    "batch", "baton", "beard", "beast", "beech", "begin", "being", "belly", "below", "bench", 
    "berry", "berth", "beset", "bible", "bicep", "bingo", "biome", "bison", "bitter", "black", 
    "blade", "blame", "bland", "blank", "blast", "blaze", "bleach", "bleak", "bleed", "blend", 
    "blind", "blink", "bliss", "blitz", "bloat", "block", "blood", "bloom", "blown", "bluff", 
    "blunt", "blur", "blush", "board", "boast", "bonus", "boost", "booth", "booty", "bough", 
    "bound", "bowel", "boxer", "brace", "braid", "brain", "brake", "brand", "brash", "brass", 
    "brave", "bravo", "brawl", "brawn", "bread", "break", "breed", "bribe", "brick", "bride", 
    "brief", "brine", "bring", "brink", "brisk", "broad", "broil", "broke", "brood", "brook", 
    "broom", "broth", "brown", "brush", "brute", "cabin", "cable", "cache", "camel", "cameo", 
    "canal", "candy", "canny", "canoe", "canon", "carat", "cargo", "carol", "carve", "caste", 
    "catch", "cater", "cause", "cease", "cedar", "cello", "chafe", "chain", "chair", "chalk", 
    "champ", "chant", "chaos", "charm", "chart", "chase", "chasm", "cheap", "cheat", "check", 
    "cheek", "cheer", "chef", "chess", "chest", "chick", "chide", "chief", "child", "chili", 
    "chill", "chime", "china", "chirp", "chive", "choir", "choke", "chord", "chore", "chose", 
    "chuck", "chunk", "churn", "chute", "cider", "cigar", "cinch", "circa", "civic", "civil", 
    "claim", "clamp", "clank", "clash", "clasp", "class", "clean", "clear", "cleft", "clerk", 
    "click", "cliff", "climb", "cling", "clink", "cloak", "clock", "clone", "close", "cloth", 
    "cloud", "clout", "clove", "clown", "cluck", "clump", "clung", "coach", "coast", "cobra", 
    "cocoa", "colon", "colt", "combo", "comet", "comic", "comma", "conch", "condo", "coral", 
    "couch", "cough", "could", "count", "coupe", "court", "crack", "craft", "cramp", "crank", 
    "crash", "crass", "crate", "crave", "crawl", "craze", "crazy", "creak", "cream", "creed", 
    "creek", "creep", "crepe", "crest", "crime", "crimp", "crisp", "croak", "crock", "crone", 
    "crony", "crook", "cross", "crowd", "crown", "crude", "cruel", "cruise", "crumb", "crush", 
    "crust", "crypt", "cubit", "cuff", "cult", "cumin", "cupid", "curio", "curly", "curry", 
    "curse", "curve", "cycle", "cynic", "daddy", "daily", "dairy", "daisy", "dally", "dandy", 
    "datum", "daunt", "dealt", "death", "debit", "debug", "debut", "decal", "decay", "decor", 
    "decoy", "decry", "defer", "deity", "delay", "delta", "delve", "demon", "demur", "denim", 
    "dense", "depot", "depth", "derby", "desk", "deter", "detox", "deuce", "devil", "diary", 
    "diode", "dirge", "dirty", "disco", "ditch", "ditto", "ditty", "diver", "divan", "divot", 
    "dizzy", "dodge", "dodgy", "dogma", "doing", "dolly", "donor", "donut", "dopey", "doubt", 
    "dough", "douse", "dove", "dowdy", "dowel", "downy", "dowry", "dozen", "draft", "drain", 
    "drake", "drama", "drank", "drape", "drawl", "drawn", "dread", "dream", "dress", "drift", 
    "drill", "drink", "drive", "droll", "drone", "drool", "droop", "drove", "drown", "drug", 
    "drum", "drunk", "dryer", "early", "earth", "easel", "east", "eaten", "eater", "ebony", 
    "eddy", "edict", "eerie", "egret", "eight", "eject", "elate", "elbow", "elder", "elect", 
    "elegy", "elite", "elope", "elude", "email", "embed", "ember", "empty", "enact", "endow", 
    "enemy", "enjoy", "enter", "entry", "envoy", "epoch", "epoxy", "equal", "equip", "erase", 
    "erect", "erode", "error", "erupt", "essay", "ester", "ether", "ethic", "ethos", "evade", 
    "event", "every", "evict", "evoke", "exact", "exalt", "exam", "excel", "exert", "exile", 
    "exist", "exit", "exotic", "expel", "extra", "exude", "exult", "fable", "facet", "faint", 
    "fairy", "faith", "fake", "faker", "false", "fame", "fancy", "farce", "farm", "fast", 
    "fatal", "fate", "fatty", "fault", "fauna", "favor", "fawn", "feast", "feat", "fecal", 
    "feces", "feeble", "feed", "feel", "feign", "feint", "feline", "felon", "felt", "fence", 
    "fend", "fender", "ferry", "fetal", "fetch", "fetus", "feud", "fever", "fewer", "fiat", 
    "fiber", "fibre", "field", "fiend", "fiery", "fifth", "fifty", "fight", "filch", "file", 
    "filer", "filet", "fill", "filler", "fillet", "filly", "film", "filmy", "filth", "final", 
    "finch", "find", "finder", "fine", "finer", "finny", "fiord", "firm", "first", "firth", 
    "fish", "fisher", "fishy", "fist", "fitly", "fiver", "fixer", "fizzy", "fjord", "flack", 
    "flag", "flail", "flair", "flake", "flaky", "flame", "flank", "flare", "flash", "flask", 
    "flat", "flaw", "flax", "flay", "flea", "fleck", "flee", "fleece", "fleecy", "fleet", 
    "flesh", "fleshy", "flick", "flier", "fling", "flint", "flinty", "flip", "flirt", "flit", 
    "float", "flock", "flog", "flood", "floor", "flop", "flora", "floss", "flour", "flout", 
    "flow", "flown", "flue", "fluent", "fluff", "fluffy", "fluid", "fluke", "flume", "flung", 
    "flunk", "flush", "flute", "flyer", "foam", "foamy", "focal", "focus", "foggy", "foil", 
    "foist", "fold", "folder", "folio", "folk", "folks", "folly", "fond", "fondu", "font", 
    "food", "fool", "foot", "foray", "force", "ford", "forest", "forge", "forgo", "fork", 
    "form", "fort", "forte", "forth", "forty", "forum", "foul", "found", "fount", "four", 
    "fowl", "foyer", "frail", "frame", "frank", "fraud", "fray", "freak", "free", "freed", 
    "freer", "freeze", "fresh", "fret", "friar", "fridge", "fried", "frill", "frilly", 
    "fringe", "frisk", "frisky", "frock", "frog", "frond", "front", "frost", "frosty", 
    "froth", "frothy", "frown", "froze", "frozen"
];
const offlineDefinitions = {
    "crane": "A tall, long-necked wading bird, or a machine for lifting heavy weights.",
    "apple": "A round fruit with red, green, or yellow skin and crisp white flesh.",
    "beach": "A pebbly or sandy shore, especially by the ocean or a lake.",
    "dance": "Move rhythmically to music, typically following a set sequence of steps.",
    "eagle": "A large bird of prey with a massive hooked bill and long broad wings.",
    "react": "Act in response to something; respond in a particular way.",
    "world": "The earth, together with all of its countries and peoples.",
    "heavy": "Of great weight; difficult to lift or move.",
    "plant": "A living organism of the kind exemplified by trees, shrubs, herbs, and mosses.",
    "music": "Vocal or instrumental sounds combined in such a way as to produce beauty of form.",
    "glove": "A covering for the hand worn for protection against cold or dirt.",
    "flame": "A hot glowing body of ignited gas that is generated by something on fire.",
    "tower": "A tall, narrow building, either standalone or forming part of a larger structure.",
    "train": "A series of connected railway carriages or wagons moved by a locomotive.",
    "pecan": "A smooth brown nut with an edible kernel, similar to a walnut.",
    "leaky": "Having holes or cracks that allow fluid or gas to enter or escape.",
    "peaky": "Having a peak, or appearing pale, sick, and gaunt."
};
const dictionaryWords = [...targetPool];
let currentMode = "normal";
let targetWord = "";
let currentGuess = "";
let currentRow = 0;
let gameOver = false;
let timerEnabled = false;
let timerRunning = false;
let timeLeft = 300;
let timerInterval = null;
let bonusForfeited = false;
let cachedFeedback = [];
let cachedGuess = "";
document.addEventListener("DOMContentLoaded", () => {
    buildGrid();
    buildKeyboard();
    setupGameMode();
    setupEventListeners();
});
function setupGameMode() {
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
    const rows = document.querySelectorAll(".grid-row");
    rows.forEach(row => {
        const tiles = row.querySelectorAll(".tile");
        tiles.forEach(tile => {
            tile.innerText = "";
            tile.className = "tile";
        });
    });
    const keys = document.querySelectorAll(".key");
    keys.forEach(k => {
        k.className = k.innerText === "enter" || k.innerText === "back" ? "key wide" : "key";
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
            btn.addEventListener("click", () => handleInput(key));
            rowDiv.appendChild(btn);
        });
        container.appendChild(rowDiv);
    });
}
function handleInput(key) {
    if (gameOver) return;
    if (key === "back" || key === "backspace") {
        if (currentGuess.length > 0) {
            currentGuess = currentGuess.slice(0, -1);
            repaintInputTiles();
        }
    } else if (key === "enter") {
        if (currentGuess.length === 5) commitAttempt();
        else showToast("Short of 5 letters");
    } else if (/^[a-z]\$/i.test(key) && currentGuess.length < 5) {
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
                document.getElementById("timerDisplay").innerText = "Timer Expired! Base rate applied.";
                showToast("Time run out! Score multiplier lost.");
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
            let name = prompt(`Victory! You scored ${base} points. Enter username:`) || "Anonymous";
            let board = JSON.parse(localStorage.getItem("w_leaderboard")) || [];
            board.push({name, score: base, date: dateStr});
            board.sort((a,b) => b.score - a.score);
            localStorage.setItem("w_leaderboard", JSON.stringify(board.slice(0, 10)));
            renderLeaderboard();
            openModal("leaderboardModal");
        }, 600);
    } else {
        showToast(`Game Over! The word was ${targetWord.toUpperCase()}`);
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
        list.innerHTML = "<li>No entries yet. Be the first to score!</li>";
    } else {
        board.forEach(entry => {
            let li = document.createElement("li");
            li.innerHTML = `<strong>${entry.name}</strong> - ${entry.score} pts (${entry.date})`;
            list.appendChild(li);
        });
    }
    const defReveal = document.getElementById("wordReveal");
    const defText = document.getElementById("wordDefinition");
    document.getElementById("dictionarySection").classList.remove("hidden");
    defReveal.innerHTML = `Word of the Day: <strong>${targetWord.toUpperCase()}</strong>`;
    if (offlineDefinitions[targetWord]) {
        defText.innerText = offlineDefinitions[targetWord];
    } else {
        defText.innerText = "Definition tracking complete. System vocabulary entry matched.";
    }
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
    const timerToggleInput = document.getElementById("timerToggle");
    if (timerToggleInput) {
        timerToggleInput.onchange = (e) => {
            timerEnabled = e.target.checked;
            setupGameMode();
        };
    }
    document.onkeydown = (e) => {
        if(e.key === "Backspace") handleInput("back");
        else if(e.key === "Enter") handleInput("enter");
        else handleInput(e.key.toLowerCase());
    };
}
