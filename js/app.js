const BOX_SIZE_X = 101;
const BOX_SIZE_Y = 82;

// Enemies our player must avoid
class Enemy {
    constructor(startPosition, speed, type = "bug") {
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
        this.startPosition = startPosition - 30;
        this.speed = speed;
        this.x = -100;
        this.y = this.startPosition;
    }
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started


    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x += this.speed * dt;
        // this.y += 20 * dt;
        if (this.x > 808) {
            this.x = -100;
            this.y = this.startPosition;
        }
    };

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
}

// Now write your own player class
class Player {
    constructor(name) {
        this.name = name;
        this.sprite = "images/char-boy.png";
        this.startPoint = [404, 390];
        [this.x, this.y] = this.startPoint
    }

    update() {
        this.render();
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(key) {
        if(key === "up") {
            this.y -= BOX_SIZE_Y;
        }else if (key === "down"){
            this.y += BOX_SIZE_Y;
        }else if (key === "right"){
            this.x += BOX_SIZE_X;
        }else if (key === "left"){
            this.x -= BOX_SIZE_X;
        }else {

        }
    };
}
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
const allEnemies = [new Enemy(BOX_SIZE_Y, 330),
                    new Enemy(BOX_SIZE_Y * 2, 300),
                    new Enemy(BOX_SIZE_Y * 2, 200),
                    new Enemy(BOX_SIZE_Y * 2, 400),
                    new Enemy(BOX_SIZE_Y * 3, 410),
                    new Enemy(BOX_SIZE_Y * 3, 450),
                    ];
// Place the player object in a variable called player
const player = new Player("Dor");



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
