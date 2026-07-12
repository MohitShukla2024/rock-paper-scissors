// --- STATE MANAGEMENT ---
let playerScore = 0;
let computerScore = 0;
const winningScore = 5;

// --- DOM ELEMENTS ---
const playerScoreEl = document.getElementById('player-score');
const computerScoreEl = document.getElementById('computer-score');
const playerChoiceEl = document.getElementById('player-choice-display');
const computerChoiceEl = document.getElementById('computer-choice-display');
const roundResultEl = document.getElementById('round-result');
const resetBtn = document.getElementById('reset-btn');
const choiceButtons = document.querySelectorAll('.choice-btn');

const emojiMap = {
    rock: '✊',
    paper: '✋',
    scissors: '✌️'
};

// --- GAME LOGIC ---

// Generate computer choice
function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

// Determine winner of the round
function getRoundWinner(player, computer) {
    if (player === computer) return 'tie';
    
    if (
        (player === 'rock' && computer === 'scissors') ||
        (player === 'paper' && computer === 'rock') ||
        (player === 'scissors' && computer === 'paper')
    ) {
        return 'player';
    }
    
    return 'computer';
}

// Update UI elements based on choices and results
function updateUI(playerChoice, computerChoice, winner) {
    playerChoiceEl.textContent = emojiMap[playerChoice];
    computerChoiceEl.textContent = emojiMap[computerChoice];

    if (winner === 'tie') {
        roundResultEl.textContent = `It's a tie! Both chose ${playerChoice}.`;
    } else if (winner === 'player') {
        roundResultEl.textContent = `You win this round! ${playerChoice} beats ${computerChoice}.`;
        playerScoreEl.textContent = playerScore;
    } else {
        roundResultEl.textContent = `Computer wins this round! ${computerChoice} beats ${playerChoice}.`;
        computerScoreEl.textContent = computerScore;
    }
}

// Check if anyone hit the max points
function checkGameOver() {
    if (playerScore === winningScore || computerScore === winningScore) {
        if (playerScore === winningScore) {
            roundResultEl.textContent = "🏆 Victory! You won the match! 🎉";
        } else {
            roundResultEl.textContent = "🤖 Game Over! The Computer won the match. 😢";
        }
        
        // Disable gameplay controls
        choiceButtons.forEach(btn => btn.disabled = true);
        resetBtn.classList.remove('hidden');
    }
}

// Handle round plays
function playRound(playerChoice) {
    const computerChoice = getComputerChoice();
    const winner = getRoundWinner(playerChoice, computerChoice);

    if (winner === 'player') playerScore++;
    if (winner === 'computer') computerScore++;

    updateUI(playerChoice, computerChoice, winner);
    checkGameOver();
}

// --- EVENT LISTENERS ---

// Listener for weapon choice buttons
choiceButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // Use currentTarget to ensure we grab the data attribute even if clicking the emoji text
        const choice = e.currentTarget.getAttribute('data-choice');
        playRound(choice);
    });
});

// Listener for Reset button
resetBtn.addEventListener('click', () => {
    playerScore = 0;
    computerScore = 0;
    playerScoreEl.textContent = '0';
    computerScoreEl.textContent = '0';
    playerChoiceEl.textContent = '?';
    computerChoiceEl.textContent = '?';
    roundResultEl.textContent = 'Choose your weapon!';
    
    choiceButtons.forEach(btn => btn.disabled = false);
    resetBtn.classList.add('hidden');
});
