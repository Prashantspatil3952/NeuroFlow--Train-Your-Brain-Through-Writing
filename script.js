/* =========================
   ELEMENTS
========================= */

const editor = document.getElementById("editor");
const timer = document.getElementById("timer");
const wordCount = document.getElementById("wordCount");
const charCount = document.getElementById("charCount");
const focusScore = document.getElementById("focusScore");
const progressFill = document.getElementById("progressFill");
const newPromptBtn = document.getElementById("newPromptBtn");
const promptText = document.getElementById("promptText");
const brainFact = document.getElementById("brainFact");
const resetBtn = document.getElementById("resetBtn");

/* =========================
   DATA
========================= */

const prompts = [
    "Describe a future where humans can directly share thoughts.",
    "You wake up with a second brain. What happens next?",
    "What would happen if social media disappeared tomorrow?",
    "A scientist discovers how to download memories.",
    "Write a letter to yourself 10 years from now.",
    "Imagine a city powered entirely by human creativity.",
    "You find a notebook that predicts the future.",
    "Describe your dream company and your role in it.",
    "What would you do with unlimited focus for one day?",
    "A robot becomes your mentor."
];

const brainFacts = [
    "Your brain contains around 86 billion neurons.",
    "The brain uses about 20% of your body's energy.",
    "Writing regularly strengthens neural connections.",
    "Focused work improves memory formation.",
    "Reading and writing activate multiple brain regions.",
    "Learning creates new neural pathways.",
    "Multitasking can reduce productivity significantly.",
    "Sleep helps transfer information into long-term memory.",
    "Creativity increases when distractions are reduced.",
    "The human brain can process information faster than many computers in specific tasks."
];

/* =========================
   VARIABLES
========================= */

let countdown = 5;
let interval;
let score = 100;

/* =========================
   LOAD SAVED WRITING
========================= */

const savedText = localStorage.getItem("neuroflowWriting");

if (savedText) {
    editor.value = savedText;
}

/* =========================
   COUNTS
========================= */

function updateCounts() {

    const text = editor.value.trim();

    const words = text === ""
        ? 0
        : text.split(/\s+/).length;

    wordCount.textContent = words;

    charCount.textContent =
        editor.value.length;
}

/* =========================
   SAVE WRITING
========================= */

function saveWriting() {

    localStorage.setItem(
        "neuroflowWriting",
        editor.value
    );
}

/* =========================
   TIMER
========================= */

function startTimer() {

    clearInterval(interval);

    countdown = 5;

    timer.textContent = countdown;

    progressFill.style.width = "100%";

    interval = setInterval(() => {

        countdown--;

        timer.textContent = countdown;

        progressFill.style.width =
            (countdown / 5) * 100 + "%";

        if (countdown <= 0) {

            clearInterval(interval);

            score -= 10;

            if (score < 0) {
                score = 0;
            }

            focusScore.textContent = score;

            destroyWriting();
        }

    }, 1000);
}

/* =========================
   FADE DELETE EFFECT
========================= */

function destroyWriting() {

    editor.classList.add("fade-out");

    setTimeout(() => {

        editor.value = "";

        updateCounts();

        saveWriting();

        editor.classList.remove("fade-out");

        countdown = 5;

        timer.textContent = countdown;

        progressFill.style.width = "100%";

    }, 2000);
}

/* =========================
   RANDOM PROMPT
========================= */

newPromptBtn.addEventListener("click", () => {

    const randomPrompt =
        prompts[
            Math.floor(
                Math.random() * prompts.length
            )
        ];

    promptText.textContent =
        randomPrompt;
});

/* =========================
   RANDOM BRAIN FACT
========================= */

function changeFact() {

    const randomFact =
        brainFacts[
            Math.floor(
                Math.random() *
                brainFacts.length
            )
        ];

    brainFact.textContent =
        randomFact;
}

setInterval(changeFact, 8000);

/* =========================
   STREAK SYSTEM
========================= */

function updateStreak() {

    const today =
        new Date().toDateString();

    const lastVisit =
        localStorage.getItem(
            "lastVisit"
        );

    let streak =
        Number(
            localStorage.getItem(
                "streak"
            )
        ) || 0;

    if (lastVisit !== today) {

        streak++;

        localStorage.setItem(
            "streak",
            streak
        );

        localStorage.setItem(
            "lastVisit",
            today
        );
    }

    console.log(
        "Current Streak:",
        streak
    );
}

updateStreak();

/* =========================
   EDITOR EVENT
========================= */

editor.addEventListener("input", () => {

    updateCounts();

    saveWriting();

    score++;

    if (score > 100) {
        score = 100;
    }

    focusScore.textContent = score;

    startTimer();
});

/* =========================
   RESET BUTTON
========================= */

resetBtn.addEventListener("click", () => {

    editor.value = "";

    updateCounts();

    saveWriting();

    countdown = 5;

    timer.textContent = countdown;

    progressFill.style.width = "100%";

    score = 100;

    focusScore.textContent = score;

    clearInterval(interval);
});

/* =========================
   INITIALIZE
========================= */

updateCounts();
changeFact();

focusScore.textContent = score;