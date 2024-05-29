let timerInterval;
let isRunning = false;
let milliseconds = 0;
let seconds = 0;
let minutes = 0;

const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const minutesSpan = document.getElementById('minutes');
const secondsSpan = document.getElementById('seconds');
const millisecondsSpan = document.getElementById('milliseconds');
const lapsList = document.getElementById('lapsList');

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);

function startStop() {
    if (isRunning) {
        clearInterval(timerInterval);
        startStopBtn.textContent = 'Start';
    } else {
        timerInterval = setInterval(updateTime, 10);
        startStopBtn.textContent = 'Stop';
    }
    isRunning = !isRunning;
}

function reset() {
    clearInterval(timerInterval);
    isRunning = false;
    milliseconds = 0;
    seconds = 0;
    minutes = 0;
    minutesSpan.textContent = '00';
    secondsSpan.textContent = '00';
    millisecondsSpan.textContent = '00';
    lapsList.innerHTML = '';
    startStopBtn.textContent = 'Start';
}

function updateTime() {
    milliseconds += 10;
    if (milliseconds >= 1000) {
        milliseconds = 0;
        seconds++;
    }
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
    }

    minutesSpan.textContent = formatTime(minutes);
    secondsSpan.textContent = formatTime(seconds);
    millisecondsSpan.textContent = formatMilliseconds(milliseconds);
}

function formatTime(unit) {
    return unit < 10 ? `0${unit}` : unit;
}

function formatMilliseconds(unit) {
    return unit < 100 ? (unit < 10 ? `00${unit}` : `0${unit}`) : unit;
}

function recordLap() {
    if (isRunning) {
        const lapTime = `${formatTime(minutes)}:${formatTime(seconds)}:${formatMilliseconds(milliseconds)}`;
        const lapItem = document.createElement('li');
        lapItem.textContent = lapTime;
        lapsList.appendChild(lapItem);
    }
}
