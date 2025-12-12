// -----------------------------
// 1. Variables & elements
// -----------------------------

let clicks = [];          // stores timestamps
let min_clicks = 10;      // minimum number of taps needed

let tapButtonVariable = document.getElementById('tapButton');
let resetButton = document.getElementById('resetButton');
let bpmValueEl = document.getElementById('bpmValue');
let statusTextEl = document.getElementById('statusText');
let pulseCircle = document.getElementById('pulseCircle');

// Audio context for metronome tick (created lazily)
let audioCtx = null;


// -----------------------------
// 2. Event listeners
// -----------------------------

tapButtonVariable.addEventListener('click', getBPM);
resetButton.addEventListener('click', resetTapper);


// -----------------------------
// 3. Main tap handler
// -----------------------------

function getBPM() {
    // Ensure audio context exists (required for browsers)
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    // 1) record timestamp
    let date_right_now = Date.now();
    clicks.push(date_right_now);

    // 2) visual & audio feedback
    playTick();
    animatePulse();
    animateTapButton();

    // 3) update status text live
    if (clicks.length < min_clicks) {
        statusTextEl.textContent =
            `Keep tapping... (${clicks.length}/${min_clicks})`;
    }

    // 4) when we have enough clicks, calculate BPM
    if (clicks.length >= min_clicks) {
        let calculatedBPM = calculateBPMFromClicks(clicks);

        // Show BPM on screen
        bpmValueEl.textContent = calculatedBPM;
        statusTextEl.textContent =
            "Tempo locked in! Tap again to refine or press Reset.";

        // Optional: alert (can remove if you hate popups)
        alert("Your calculated BPM is: " + calculatedBPM);

        // Get ready for a new run
        clicks = [];
    }
}


// -----------------------------
// 4. Reset logic
// -----------------------------

function resetTapper() {
    clicks = [];
    bpmValueEl.textContent = "--";
    statusTextEl.textContent =
        "Tap the button 10 times at a steady pace.";
}


// -----------------------------
// 5. BPM calculation helper
// -----------------------------

function calculateBPMFromClicks(clickArray) {
    if (clickArray.length < 2) {
        return 0;
    }

    let intervals = [];

    // differences between consecutive timestamps
    for (let i = 1; i < clickArray.length; i++) {
        let difference = clickArray[i] - clickArray[i - 1];
        intervals.push(difference);
    }

    // average interval
    let sum = 0;
    for (let interval of intervals) {
        sum += interval;
    }

    let averageInterval = sum / intervals.length;

    // ms per beat -> beats per minute
    let bpm = 60000 / averageInterval;
    return Math.round(bpm);
}


// -----------------------------
// 6. Visual pulse + button animation
// -----------------------------

function animatePulse() {
    // restart animation by forcing reflow
    pulseCircle.classList.remove('pulse-active');
    void pulseCircle.offsetWidth;
    pulseCircle.classList.add('pulse-active');
}

function animateTapButton() {
    tapButtonVariable.classList.remove('tapped');
    void tapButtonVariable.offsetWidth;
    tapButtonVariable.classList.add('tapped');
}


// -----------------------------
// 7. Softer metronome tick sound
// -----------------------------

function playTick() {
    if (!audioCtx) return;

    let osc = audioCtx.createOscillator();
    let gainNode = audioCtx.createGain();

    // Softer, rounder sound
    osc.type = "sine";
    osc.frequency.value = 750;   // Hz, mid-soft click

    // Very gentle volume envelope
    let now = audioCtx.currentTime;

    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.08, now + 0.01);   // quick rise
    gainNode.gain.linearRampToValueAtTime(0.0, now + 0.12);    // fade out

    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.15); // short, subtle tick
}
