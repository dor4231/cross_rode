// Globals used for easy to change configuration.
const BOX_SIZE_X = 101;
const BOX_SIZE_Y = 83;

const CANVAS_WIDTH = 808;
const CANVAS_HEIGHT = 560;

let MAX_MONSTERS_AMOUNT = 60;
const SHOTS = new Set();


// Enemies class
class Enemy {
    constructor(startPosition, speed, type = "bug") {
        this.sprite = `images/enemy-${type}.png`;
        this.startPosition = [startPosition[0] - 30, startPosition[1]];
        this.speed = speed;
        this.x = this.startPosition[0];
        this.y = this.startPosition[1];
    }

    // Update the enemy's position
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // Movement is multiplied by the dt parameter which will
        // ensure the game runs at the same speed for all computers.
        this.x += this.speed * dt;
        if (this.x > 808) {
            this.x = this.startPosition[0];
            this.y = this.startPosition[1];
        }
    }

    // Draw the enemy on the screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// The Player class
class Player {
    constructor(name, char, shots) {
        this.name = name;
        this.health = 3;
        this.shots = shots;
        this.sprite = `images/char-${char}.png`;
        this.startPoint = [404, 560 - 50];
        [this.x, this.y] = this.startPoint
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    move(x, y) {
        this.x += x;
        this.y += y;
        if (this.x >= CANVAS_WIDTH
            || this.x <= -83
            || this.y >= CANVAS_HEIGHT
            || this.y <= -83) {
            this.x -= x;
            this.y -= y;
        }
    }

    shootAStar() {
        if(this.shots > 0){
            SHOTS.add(new Shot([this.x, this.y]));
            this.shots -= 1;
        }else {
            console.log("No more stars available");
        }
    }

    handleInput(key) {
        if (key === "up") {
            this.move(0, -BOX_SIZE_Y);
        } else if (key === "down") {
            this.move(0, BOX_SIZE_Y);
        } else if (key === "right") {
            this.move(BOX_SIZE_X, 0);
        } else if (key === "left") {
            this.move(-BOX_SIZE_X, 0);
        } else if (key === "space") {
            this.shootAStar();
        } else {
            console.log("Invalid key!");
        }
    }
}

class Shot {
    constructor(startPoint) {
        this.sprite = "images/Star.png";
        this.startPoint = startPoint;
        [this.x, this.y] = this.startPoint;
    }

    update(dt) {
        if (this.y > 808) {

        } else {
            this.y -= 700 * dt;
        }

    };

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Generate random numbers between min and max
function randomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

// Generate enemies with random speed, sprite and rode
function createEnemies(num) {
    const allEnemiesTemp = new Set();
    const enemyRows = [1, 2, 3, 5];
    const enemiesTypes = ["ninja-ghost", "bug", "pink-ghost", "pirate-ghost"];
    for (let i = 0; i < num; i++) {
        const startPoint_x = randomNum(100, 300) * (-1);
        const startPoint_y = BOX_SIZE_Y * enemyRows[randomNum(0, 4)] - 75;
        const enemyType = enemiesTypes[randomNum(-1, 4)];

        allEnemiesTemp.add(new Enemy([startPoint_x, startPoint_y], randomNum(100, 500), enemyType));
    }
    return allEnemiesTemp;
}


const allEnemies = createEnemies(8);
let player = new Player("Dor", "cat-girl");


function getRadioID(radio_form) {
    for (const radio of radio_form) {
        if (radio.checked) return radio.id;
    }
}

// Interval creates enemies every second up to the MAX_MONSTERS_AMOUNT
const enemiesRegenerate = setInterval(() => {
        if (allEnemies.size < MAX_MONSTERS_AMOUNT) {
            const enemiesUnit = createEnemies(2);
            for (const enemy of enemiesUnit)
                allEnemies.add(enemy)
        }
    }
    , 1000
);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    const allowedKeys = {
        32: "space",
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


// Staring the game by clicking on "Start Game" button.
// Setting Player Name, Character and Difficulty.
document.querySelector("#start-game").addEventListener("click", function(e) {
    e.preventDefault();
    const popup = document.querySelector(".pop-up-background.reset-game");
    const startForm = popup.querySelector(".start-form");
    const playerName = startForm.querySelector("#player-name");
    const playerChar = getRadioID(document.querySelectorAll(".radio.character input"));
    const difficulty = getRadioID(document.querySelectorAll(".radio.difficulty input"));
    let playerShots;
    popup.classList.add("hide");

    if (difficulty === "low") {
        MAX_MONSTERS_AMOUNT = 30;
        playerShots = 50;
    }else if (difficulty === "medium") {
        MAX_MONSTERS_AMOUNT = 40;
        playerShots = 30;
    }else if (difficulty === "high") {
        MAX_MONSTERS_AMOUNT = 50;
        playerShots = 20;
    }else {
        MAX_MONSTERS_AMOUNT = 60;
        playerShots = 100;
    }
    player = new Player(playerName, playerChar, playerShots);
});