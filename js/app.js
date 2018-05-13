const BOX_SIZE_X = 101;
const BOX_SIZE_Y = 83;

const CANVAS_WIDTH = 808;
const CANVAS_HEIGHT = 560;


// Enemies class
class Enemy {
    constructor(startPosition, speed, type = "bug") {
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
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
    constructor(name, char) {
        this.name = name;
        this.health = 3;
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
            shots.add(new Shot([this.x, this.y]))
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

function randomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}


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


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
const shots = new Set();
const allEnemies = createEnemies(1);
// Place the player object in a variable called player
let player = new Player("Dor", "cat-girl");



const enemiesRegenerate = setInterval(() => {
        if (allEnemies.size < 50) {
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


document.querySelector("#start-game").addEventListener("click", function(e) {
    e.preventDefault();
    const popup = document.querySelector(".pop-up-background.reset-game");
    const startForm = popup.querySelector(".start-form");
    const playerName = startForm.querySelector("#player-name");
    popup.classList.add("hide");
    player = new Player(playerName, "boy");
});