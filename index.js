document.addEventListener("DOMContentLoaded", () => {
    const resetButton = document.querySelector(".score-board button");
    const rollButton = document.querySelector(".dice-cards button");
    const diceNumbers = document.querySelectorAll(".card-title");
    const scoreBoard = document.querySelectorAll(".score-board small");
    const scoreContainer = document.querySelector(".score-board .card-body");

    let humanScore = 0;
    let computerScore = 0;
    let roundsPlayed = 0;
    const maxRounds = 3;


    
    // Function to display the green winner banner
    function displayWinnerBanner(message) {
        const banner = document.createElement("div");
        banner.textContent = message;
        banner.style.position = "absolute";
        banner.style.top = "10px";
        banner.style.left = "50%";
        banner.style.transform = "translateX(-50%)";
        banner.style.padding = "15px 30px";
        banner.style.backgroundColor = "green";
        banner.style.color = "white";
        banner.style.fontSize = "24px";
        banner.style.fontWeight = "bold";
        banner.style.borderRadius = "8px";
        banner.style.textAlign = "center";
        document.body.appendChild(banner);
    }

    // Change "Reset" button to "Play" and handle countdown
    resetButton.textContent = "Play";
    resetButton.style.backgroundColor = "green"; // Set Play button to green
    resetButton.addEventListener("click", () => {
        if (resetButton.textContent === "Play") {
            let countdown = 3;
            resetButton.disabled = true; // Disable button during countdown

            const interval = setInterval(() => {
                resetButton.textContent = `Starting in ${countdown}`;
                countdown--;

                if (countdown < 0) {
                    clearInterval(interval);
                    resetButton.textContent = "Reset";
                    resetButton.style.backgroundColor = "red"; // Change to red in Reset mode
                    resetButton.disabled = false; // Enable button after countdown
                    alert("Game starts now! Roll the dice.");
                }
            }, 1000);
        } else {
            // Reset the game
            humanScore = 0;
            computerScore = 0;
            roundsPlayed = 0;
            diceNumbers[0].textContent = "0";
            diceNumbers[1].textContent = "0";
            scoreBoard[0].textContent = "0";
            scoreBoard[1].textContent = "0";
            document.querySelector(".winner-banner")?.remove(); // Remove winner banner if exists
            scoreContainer.querySelector(".winner")?.remove(); // Remove winner text if exists
            alert("Game reset. Press Roll dice to start again.");
        }
    });

    // Handle "Roll dice" functionality
    rollButton.addEventListener("click", () => {
        if (roundsPlayed < maxRounds) {
            rollButton.disabled = true; // Disable Roll button

            // Temporarily show "Dice is rolling..." on the computer side
            diceNumbers[1].textContent = "Dice is rolling...";
            diceNumbers[1].style.color = "orange"; // Optional styling for emphasis

            // Simulate dice rolling delay
            setTimeout(() => {
                // Generate random numbers for human and computer and ensure they are not equal
                let humanRoll, computerRoll;
                do {
                    humanRoll = Math.floor(Math.random() * 6) + 1; // Human dice roll
                    computerRoll = Math.floor(Math.random() * 6) + 1; // Computer dice roll
                } while (humanRoll === computerRoll); // Repeat if numbers are equal

                // Update dice numbers in UI
                diceNumbers[0].textContent = humanRoll; // Human's dice
                diceNumbers[1].textContent = computerRoll; // Computer's dice
                diceNumbers[1].style.color = ""; // Reset text color to default

                // Compare rolls and update scoreboard
                if (humanRoll > computerRoll) {
                    humanScore++;
                    scoreBoard[0].textContent = humanScore; // Update human score
                } else {
                    computerScore++;
                    scoreBoard[1].textContent = computerScore; // Update computer score
                }

                roundsPlayed++;

                // Check if maximum rounds reached
                if (roundsPlayed === maxRounds) {
                    rollButton.disabled = true; // Disable Roll button
                    let winnerMessage = "";

                    if (humanScore > computerScore) {
                        winnerMessage = " Winner: Human! ";
                    } else if (computerScore > humanScore) {
                        winnerMessage = " Winner: Computer! ";
                    } else {
                        winnerMessage = " It's a Draw! ";
                    }

                    // Display winner banner at the top
                    displayWinnerBanner(winnerMessage);

                    alert("Game over. Reset the game to play again.");
                }

                rollButton.disabled = false; // Enable Roll button
            }, 1000); // 1 second delay for dice rolling effect
        } else {
            alert("Maximum rounds reached. Reset the game to play again.");
        }
    });
});
