const diskInput = document.getElementById("diskInput");

const startButton = document.getElementById("startButton");

const decreaseDisk = document.getElementById("decreaseDisk");
const increaseDisk = document.getElementById("increaseDisk");

const previousButton = document.getElementById("previousButton");
const nextButton = document.getElementById("nextButton");

const playButton = document.getElementById("playButton");
const resetButton = document.getElementById("resetButton");

const currentStep = document.getElementById("currentStep");
const totalSteps = document.getElementById("totalSteps");

const progressValue = document.getElementById("progressValue");

const stateDescription =
    document.getElementById("stateDescription");

const diskStat =
    document.getElementById("diskStat");

const moveStat =
    document.getElementById("moveStat");

const stepStat =
    document.getElementById("stepStat");


const rods = [
    document.getElementById("rod0"),
    document.getElementById("rod1"),
    document.getElementById("rod2")
];


let states = [];
let currentIndex = 0;
let timer = null;


function diskWidth(disk, totalDisks) {
    const minWidth = 55;
    const maxWidth = 210;

    return minWidth +
        ((disk / totalDisks) * (maxWidth - minWidth));
}

function getDiskColor(disk, totalDisks) {
    const colors = [
        "#ff6b6b",
        "#ffa94d",
        "#ffd43b",
        "#69db7c",
        "#38d9a9",
        "#4dabf7",
        "#748ffc",
        "#9775fa",
        "#da77f2",
        "#f783ac"
    ];

    return colors[(disk - 1) % colors.length];
}

function renderState(index) {

    if (!states.length) {
        return;
    }

    const state = states[index];

    rods.forEach((rodElement, rodIndex) => {

        rodElement
            .querySelectorAll(".disk")
            .forEach(disk => disk.remove());

        const rodDisks = state[rodIndex];

        rodDisks.forEach((disk, position) => {

            const element = document.createElement("div");

            element.className = "disk";

            element.textContent = disk;

            const color = getDiskColor(
                disk,
                Number(diskInput.value)
            );
            element.style.background = `linear-gradient(135deg, ${color}, ${color}cc)`;
            element.style.boxShadow = `0 5px 15px ${color}55`;

            element.style.width =
                `${diskWidth(disk, diskInput.value)}px`;

            element.style.left = "50%";

            element.style.transform =
                "translateX(-50%)";

            element.style.bottom =
                `${22 + position * 27}px`;

            rods[rodIndex].appendChild(element);

        });

    });


    currentStep.textContent = index;

    totalSteps.textContent = states.length - 1;

    const progress =
        states.length <= 1
            ? 0
            : (index / (states.length - 1)) * 100;

    progressValue.style.width = `${progress}%`;

    stepStat.textContent =
        `${Math.round(progress)}%`;

    if (index === 0) {

        stateDescription.textContent =
            "Configuration initiale";

    } else if (index === states.length - 1) {

        stateDescription.textContent =
            "Résolution terminée ✓";

    } else {

        stateDescription.textContent =
            `Déplacement ${index} sur ${states.length - 1}`;

    }
}


async function startSimulation() {

    stopAnimation();

    const disks = Number(diskInput.value);

    if (!Number.isInteger(disks) || disks < 1 || disks > 10) {

        alert(
            "Veuillez choisir un nombre de disques entre 1 et 10."
        );

        return;
    }


    startButton.disabled = true;

    startButton.innerHTML =
        "<span>⏳</span> Calcul en cours...";


    try {

        const response = await fetch("/api/solve", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                disks: disks
            })

        });


        const data = await response.json();


        if (!response.ok) {
            throw new Error(data.error);
        }


        states = data.states;

        currentIndex = 0;


        diskStat.textContent = data.disks;

        moveStat.textContent = data.moves;


        renderState(currentIndex);


    } catch (error) {

        alert(error.message);

    } finally {

        startButton.disabled = false;

        startButton.innerHTML =
            "<span>▶</span> Lancer la simulation";
    }
}


function nextStep() {

    if (!states.length) {
        return;
    }

    if (currentIndex < states.length - 1) {

        currentIndex++;

        renderState(currentIndex);

    } else {

        stopAnimation();

    }
}


function previousStep() {

    if (!states.length) {
        return;
    }

    if (currentIndex > 0) {

        currentIndex--;

        renderState(currentIndex);

    }
}


function togglePlay() {

    if (!states.length) {
        return;
    }


    if (timer) {

        stopAnimation();

        return;
    }


    if (currentIndex >= states.length - 1) {

        currentIndex = 0;

        renderState(currentIndex);
    }


    playButton.textContent = "❚❚";


    timer = setInterval(() => {

        if (currentIndex >= states.length - 1) {

            stopAnimation();

            return;
        }


        currentIndex++;

        renderState(currentIndex);

    }, 650);
}


function stopAnimation() {

    if (timer) {

        clearInterval(timer);

        timer = null;
    }

    playButton.textContent = "▶";
}


function resetSimulation() {

    stopAnimation();

    currentIndex = 0;

    states = [];

    rods.forEach(rod => {

        rod.querySelectorAll(".disk")
            .forEach(disk => disk.remove());

    });


    currentStep.textContent = "0";
    totalSteps.textContent = "0";

    progressValue.style.width = "0%";

    diskStat.textContent = "0";
    moveStat.textContent = "0";
    stepStat.textContent = "0%";

    stateDescription.textContent =
        "Prêt à commencer";
}


decreaseDisk.addEventListener("click", () => {

    const value = Number(diskInput.value);

    if (value > 1) {
        diskInput.value = value - 1;
    }

});


increaseDisk.addEventListener("click", () => {

    const value = Number(diskInput.value);

    if (value < 10) {
        diskInput.value = value + 1;
    }

});


startButton.addEventListener(
    "click",
    startSimulation
);


previousButton.addEventListener(
    "click",
    previousStep
);


nextButton.addEventListener(
    "click",
    nextStep
);


playButton.addEventListener(
    "click",
    togglePlay
);


resetButton.addEventListener(
    "click",
    resetSimulation
);


diskInput.addEventListener("change", () => {

    let value = Number(diskInput.value);

    if (value < 1) {
        value = 1;
    }

    if (value > 10) {
        value = 10;
    }

    diskInput.value = value;
});