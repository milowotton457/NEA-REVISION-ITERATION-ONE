class Player {
    
    constructor(colour, playerImage) {
        // The player starts at position 1 on the board.
        this.position = 1;
        this.colour = colour;
        this.image = playerImage;
    }

    // This function moves the player a certain number of steps.
    move(steps) {
        if (this.position + steps <= 100) {
            this.position += steps;
            this.checkSnakesAndLadders();
        }
    }

    // This function checks if the player's current position is the start of a snake or a ladder.
    checkSnakesAndLadders() {
        // If the player's position is a key in the 'snakes', or the'ldders' object, it means they've landed on a snake.
        // So, we move the player to the snake's end position.
        if (snakes[this.position]) {
            this.position = snakes[this.position];
        }
        if (ladders[this.position]) {
            this.position = ladders[this.position];
        }
    }
 
    // This function draws the player on the screen.
    draw() {
        // Get the x and y coordinates for the player's current position from the 'board' array.
        let pos = gBoard[this.position];
        // Draw the player as an image in the center of the square.
        image(this.image, pos.x, pos.y,60,60);
        imageMode(CORNER)
    }
}
