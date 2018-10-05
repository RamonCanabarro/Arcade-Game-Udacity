// Enemies our player must avoid
//    let y = 60
//    let y = 140
var Score = function drawScore() {
    ctx.fot = "italic bold 16px Roboto"
    ctx.fillstyle = "#0000";
    ctx.fillText("score: " + player.score, 1, 100);

}
var Enemy = function (y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = 0
    this.width = 30
    this.y = y
    this.speed = Math.floor(Math.random() * 3 + 2);
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    this.x += this.speed;
    if (this.x > 500) {
        this.x = -100
    }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
function checkCollisions() {
    for (var i = 0; i < allEnemies.length; i++)

        if (allEnemies[i].x + allEnemies[i].width === player.x + 30
            && allEnemies[i].x + allEnemies[i].width > !player.x
            && allEnemies[i].y <= player.y + 30
            && allEnemies[i].y + allEnemies[i].width >= player.y
        ) {
            player.reset();
            player.score -= 100;
        }
}
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
var players = function () {
    this.x = 200;
    this.y = 400;
    this.width = 30;
    this.dx = 90;
    this.dy = 95;
    this.sprite = 'images/char-horn-girl.png';
    this.score = 0;
}
players.prototype.update = function (dt) {
    if (this.x > 400) {
        this.x = 400;
    } else if (this.x < 0) {
        this.x = 0;
    } else if (this.y > 400) {
        this.y = 400;
    } else if (this.y < 0) {
        this.y = 0
        alert("Congratulations!")
        this.reset();
        player.score += 100;
    }
}

players.prototype.reset = function () {
    this.x = 200;
    this.y = 400;
    if (!this.score) {
        this.score = 0;
    }
}

players.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
players.prototype.handleInput = function (keys) {
    if ('up' === keys) {
        this.y -= this.dy;
    }
    if ('down' === keys) {
        this.y += this.dy;
    }
    if ('left' === keys) {
        this.x -= this.dx;
    }
    if ('right' === keys) {
        this.x += this.dx;
    }
}
var enemy1 = new Enemy(50);
var enemy2 = new Enemy(140);
var enemy3 = new Enemy(220);

var allEnemies = [enemy1, enemy2, enemy3];


var player = new players();

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
