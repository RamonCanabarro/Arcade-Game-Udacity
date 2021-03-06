let allGems = []
var gameState = "NotStarted"; //Defines state of the game. 

var playerImg = 'images/char-horn-girl.png'
var drawScore = function () {
    ctx.fot = "italic bold 16px Roboto"
    ctx.fillstyle = "#0000";
    ctx.fillText("score: " + player.score, 1, 100);

}

var Gem = function (x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/Gem Orange.png';
    this.gemWaitTime = undefined;
};

Gem.prototype.update = function () {
    this.checkCollision();
};

Gem.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Gem.prototype.checkCollision = function () {
    // Set hitboxes for collision detection
    var playerBox = { x: player.x, y: player.y, width: 50, height: 40 };
    var gemBox = { x: this.x, y: this.y, width: 60, height: 70 };
    // Check for collisions, if playerBox intersects gemBox, we have one
    if (playerBox.x < gemBox.x + gemBox.width &&
        playerBox.x + playerBox.width > gemBox.x &&
        playerBox.y < gemBox.y + gemBox.height &&
        playerBox.height + playerBox.y > gemBox.y) {
        // Collision detected, call collisionDetected function
        this.collisionDetected();
    }
};

// Gem collision detected, hide the gem off canvas,
// Increase player score, wait 5 seconds, then reset the gem
Gem.prototype.collisionDetected = function () {
    this.x = 900;
    this.y = 900;
    player.score += 30;
    this.wait();
};

// Call setTimeout in a function so we can assign it to a variable
// Necessary for clearTimeout(gem.gemWaitTime) to work
Gem.prototype.wait = function () {
    this.gemWaitTime = setTimeout(function () {
        gem.gemReset();
    }.bind(this), 5000);
};

// Reset the gem to a new location
Gem.prototype.gemReset = function () {
    // Gems appear at one of the following x positions: 0, 101, 202, 303, 404
    this.x = (101 * Math.floor(Math.random() * 4) + 0);
    // Gems appear at one of the following Y positions: 60, 145, 230
    this.y = (60 + (85 * Math.floor(Math.random() * 3) + 0));
};

var Enemy = function (y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = 0
    this.width = 40
    this.height = 40
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
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
function checkCollisions() {
    for (var i = 0; i < allEnemies.length; i++)
        if (player.x < allEnemies[i].x + allEnemies[i].width
            && player.x + player.width > allEnemies[i].x
            && player.y < allEnemies[i].y + allEnemies[i].height
            && player.y + player.height > allEnemies[i].y
        ) {
            player.reset();
            player.score -= 100;
        }
}
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
var Players = function () {
    this.x = 200;
    this.y = 410;
    this.width = 40;
    this.dx = 90;
    this.dy = 95;
    this.height = 40
    this.sprite = playerImg;
    this.score = 0;
}
Players.prototype.update = function (dt) {
    if (this.x > 400) {
        this.x = 400;
    } else if (this.x < 0) {
        this.x = 0;
    } else if (this.y > 400) {
        this.y = 400;
    } else if (this.y < 0) {
        this.y = 0
        alert("Congratulations")
        this.reset();
        player.score += 100;
    }
}

Players.prototype.reset = function () {
    this.x = 200;
    this.y = 400;
    if (!this.score) {
        this.score = 0;
    }
}

Players.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
Players.prototype.handleInput = function (keys) {
    switch (keys) {
        case 'up':
            this.y -= this.dy;
            break;
        case 'down':
            this.y += this.dy;
        case 'left':
            this.x -= this.dx;
            break;
        case 'right':
            this.x += this.dx;
    }
}
const allEnemies = [
    new Enemy(50),
    new Enemy(140),
    new Enemy(220)
];


var player = new Players();

var gem = new Gem(101 * Math.floor(Math.random() * 4) + 0, 60 +
    (85 * Math.floor(Math.random() * 3) + 0));

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
