/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, gameRunning;

init();

// function btn() {
//     // Code
// }
// We could also define our function inside the event listener, which is called an anonymous function.

// DICE ROLL BUTTON
document.querySelector('.btn-roll').addEventListener('click',function() {
    if (gameRunning) {
        //  Random Number
    var dice = Math.floor(Math.random() * 6) + 1;
    // Displaying result
    var diceDOM = document.querySelector('.dice');
    diceDOM.src = 'dice-' + dice + '.png';
    diceDOM.style.display = 'block';
    // Update Round Score, only if number was not 1
   if (dice !== 1) {
       // update round score
       roundScore += dice;
       document.getElementById('current-' + activePlayer).textContent = roundScore;
   } else {
       // end round, reset round score and Update UI
       nextPlayer();
       // Hide dice
       document.querySelector('.dice').style.display = none;    
   }
    }
});
    // HOLD BUTTON 
    document.querySelector('.btn-hold').addEventListener('click', function() {
        if (gameRunning) {
            // Add round score to global score
        scores[activePlayer] += roundScore
        // Update UI 
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        
        // Check if player won
        if (scores[activePlayer] >= 100) {
            document.querySelector('#name-'+activePlayer).textContent = 'WINNER';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
            document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
            document.getElementById('current-' + activePlayer).textContent = 0;
            gameRunning = false;
        } else {
            // Next Player 
             nextPlayer();
        }
       
        }
    })

    // NEW GAME BUTTON
    document.querySelector('.btn-new').addEventListener('click', init);

    // FUNCTIONS

function nextPlayer() {
    roundScore = 0;
       document.getElementById('current-' + activePlayer).textContent = roundScore;
       document.querySelector('.player-'+activePlayer+'-panel').classList.toggle('active');
       activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
       document.querySelector('.player-'+activePlayer+'-panel').classList.toggle('active');
       document.querySelector('.dice').style.display = 'none';
}

function init() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    gameRunning = true;
    }
    