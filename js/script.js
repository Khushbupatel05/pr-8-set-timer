let timer;
let totalSeconds = 0;
let runningStage = false;
let time = document.querySelector(".timer-display");
let confettiRunning;
let paused = false;
let newQuote = document.getElementById("newQuote");
let newAuthor = document.getElementById("newAuthor");

let quotes = [
    { quote: "Time is the most valuable thing a man can spend.", author: "- Theophrastus" },
    { quote: "Lost time is never found again.", author: "- Benjamin Franklin" },
    { quote: "Your time is limited, so don’t waste it living someone else’s life.", author: "- Steve Jobs" },
    { quote: "Better three hours too soon than a minute too late.", author: "- William Shakespeare" },
    { quote: "Whatever you are, be a good one.", author: "- Abraham Lincoln" },
    { quote: "The way we spend our time defines who we are.", author: "- Jonathan Estrin" },
    { quote: "Time is what we want most, but what we use worst.", author: "- William Penn" },
    { quote: "Time, which changes people, does not alter the image we have of them.", author: "- Marcel Proust" },
    { quote: "Time flies over us but leaves its shadow behind.", author: "- Nathaniel Hawthorne" },
    { quote: "The key is in not spending time, but in investing it.", author: "- Stephen R. Covey" },
    { quote: "Time is a gift that most of us take for granted.", author: "- Cheryl Richardson" }
];

document.getElementById("start").addEventListener("click", function () {
    if (runningStage) return;
    startTimer();
});

function startTimer() {
    let h = parseInt(document.getElementById("hours").value) || 0;
    let m = parseInt(document.getElementById("minutes").value) || 0;
    let s = parseInt(document.getElementById("seconds").value) || 0;

    totalSeconds = (h * 3600) + (m * 60) + s;

    if (totalSeconds <= 0) {
        Swal.fire({
            title: "Invalid Time!",
            text: "Please enter a valid time.",
            icon: "warning"
        });
        return;
    }

    runningStage = true;
    timer = setInterval(displayTime, 1000);
}

function displayTime() {
    if (totalSeconds <= 0) {
        clearInterval(timer);
        runningStage = false;

        showModal();
        startConfetti();

        return;
    }

    let hrs = Math.floor(totalSeconds / 3600);
    let min = Math.floor((totalSeconds % 3600) / 60);
    let sec = totalSeconds % 60;

    time.innerHTML = `${hrs.toString().padStart(2, "0")} : ${min.toString().padStart(2, "0")} : ${sec.toString().padStart(2, "0")}`;
    totalSeconds--;
}

document.getElementById("pause").addEventListener("click", () => {
    const pauseButton = document.getElementById("pause");

    if (runningStage) {
        clearInterval(timer);
        runningStage = false;
        pauseButton.innerHTML = '<i class="fas fa-play"></i> Resume';
    } else {
        timer = setInterval(displayTime, 1000);
        runningStage = true;
        pauseButton.innerHTML = '<i class="fas fa-pause"></i> Pause';
    }
});

document.getElementById("reset").addEventListener("click", () => {
    clearInterval(timer);
    runningStage = false;
    totalSeconds = 0;

    document.getElementById("hours").value = "";
    document.getElementById("minutes").value = "";
    document.getElementById("seconds").value = "";

    time.innerHTML = `00:00:00`;
});

function showModal() {
    const myModal = new bootstrap.Modal(document.getElementById('quoteModal'));
    myModal.show();

    let val = Math.floor(Math.random() * quotes.length);
    newQuote.innerHTML = quotes[val].quote;
    newAuthor.innerHTML = quotes[val].author;
}


function startConfetti() {
    const end = Date.now() + 1 * 1000;
    const colors = ["#bb0000", "#ffffff"];

    (function frame() {
        confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors,
        });

        confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors,
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
}

document.querySelector(".close").addEventListener("click", () => {
    clearInterval(confettiRunning);
});
