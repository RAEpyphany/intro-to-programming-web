const sounds = {
    kick: new Audio("sounds/kick-bass.mp3"),
    snare: new Audio("sounds/snare.mp3"),
    "tom-1": new Audio("sounds/tom-1.mp3"),
    "tom-2": new Audio("sounds/tom-2.mp3"),
    "tom-3": new Audio("sounds/tom-3.mp3"),
    "tom-4": new Audio("sounds/tom-4.mp3"),
    crash: new Audio("sounds/crash.mp3")
};

const drumPieces = document.querySelectorAll(".drum");
const stage = document.querySelector(".stage");

drumPieces.forEach(piece => {
    piece.addEventListener("click", () => {
        const soundName = piece.dataset.sound;
        const color = piece.dataset.color || "#3b82f6";
        const audio = sounds[soundName];

        if (audio) {
            audio.currentTime = 0; 
            audio.play();
        }

        piece.classList.remove("hit");
        void piece.offsetWidth; 
        piece.classList.add("hit");

        if (stage) {
            stage.style.setProperty("--flash-color", hexToRgba(color, 0.55));
            stage.classList.remove("flash");
            void stage.offsetWidth; // restart animation
            stage.classList.add("flash");
        }
    });
});

function hexToRgba(hex, alpha) {
    hex = hex.replace("#", "");
    if (hex.length === 3) {
        hex = hex.split("").map(ch => ch + ch).join("");
    }

    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
