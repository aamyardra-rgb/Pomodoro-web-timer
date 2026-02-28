let totalSeconds = 25 * 60;
let initialTime = totalSeconds;
let timerInterval = null;

const progressCircle = document.getElementById("progress");
const alarmSound = document.getElementById("alarmSound");
const darkModeToggle = document.getElementById("darkModeToggle");

const circumference = 2 * Math.PI * 100; 
progressCircle.style.strokeDasharray = circumference;

function updateDisplay() {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    document.getElementById("minutes").textContent =
        minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").textContent =
        seconds < 10 ? "0" + seconds : seconds;

    const progressPercent = totalSeconds / initialTime;
    progressCircle.style.strokeDashoffset =
        circumference - progressPercent * circumference;
}

function startTimer() {
    if (timerInterval) return;

    timerInterval = setInterval(() => {
        if (totalSeconds > 0) {
            totalSeconds--;
            updateDisplay();
        } else {
            clearInterval(timerInterval);
            timerInterval = null;
            alarmSound.play();
            alert("Time's up!");
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    totalSeconds = initialTime;
    updateDisplay();
}

function setMode(minutes) {
    clearInterval(timerInterval);
    timerInterval = null;
    totalSeconds = minutes * 60;
    initialTime = totalSeconds;
    updateDisplay();
}

darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});

updateDisplay();