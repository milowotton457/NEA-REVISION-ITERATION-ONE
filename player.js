class Player {
    
    constructor(colour, playerImage) {
        // The player starts at position 1 on the board.
        this.position = 1;
        this.colour = colour;
    }

    // This function moves the player a certain number of steps.
    move(steps) {
        if (this.position + steps <= 100) {
            this.position += steps;
            this.checkSnakesAndLadders();
            if (this.position === 100) {
                currentScreen = ScreenTransitions.GAMEOVER;
            }
        }
    }

    // This function checks if the player's current position is the start of a snake or a ladder.
    checkSnakesAndLadders() {
        if (snakes[this.position]) {
            this.position = snakes[this.position];
        }
        if (ladders[this.position]) {
            this.position = ladders[this.position];
        }
    }
 
    // This function draws the player on the screen.
    draw() {
        let pos = gBoard[this.position];
        image(this.image, pos.x, pos.y,60,60);
        imageMode(CORNER)

        
    }
}
