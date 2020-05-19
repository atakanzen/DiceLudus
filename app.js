
var scores, roundScore, activePlayer, gameRunning, lastDice;



init();
alert('Welcome to DiceLudus!\n\n-How To Play-\n- Roll the dices every round to add scores to your current round score.\n- Whoever reaches the winning score first wins!.\n\n-Rules-\n1) If you roll "one", turn will pass on to the next player and your round score will reset.\n2) If you roll "double six" twice in a row, turn will pass on to the next player and your general score will reset\n\nPlease set a winning score before starting.\n\nEnjoy!');
// function btn() {
//     // Code
// }
// We could also define our function inside the event listener, which is called an anonymous function.

// DICE ROLL BUTTON
document.querySelector('.btn-roll').addEventListener('click',function() {
    if (document.querySelector('.inp-score').value != ''){
        if (gameRunning) {
            //  Random Number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;    
        
        // Displaying result
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.querySelector('#dice-1').style.border = 'none';
        document.querySelector('#dice-2').style.border = 'none';
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

        // If dices are rolled double 6 twice in a row reset all of the score.
        if ((dice1 === 6 && lastDice1 === 6) && (dice2 === 6 && lastDice2 === 6)) {
            scores[activePlayer] = 0;
            document.querySelector('#score-'+activePlayer).textContent = '0';
            nextPlayer();
        }
        // Update Round Score, only if number was not 1
        else if (dice1 !== 1 && dice2 !== 1) {
           // update round score
           roundScore += dice1 + dice2;
           document.getElementById('current-' + activePlayer).textContent = roundScore;
       }
       else {
           // end round, reset round score and Update UI
           nextPlayer();
           // Hide dice
           if (dice1 === 1) {
               document.querySelector('#dice-1').style.border = '1px solid red';
               document.querySelector('#dice-1').style.display = 'block';

           } else {
               document.querySelector('#dice-2').style.border = '1px solid red';
               document.querySelector('#dice-2').style.display = 'block';
           } 
       }
       lastDice1 = dice1;
       lastDice2 = dice2;
        }
    } else {
        alert('Please set a winning score!');
    }
});
    // HOLD BUTTON 
    document.querySelector('.btn-hold').addEventListener('click', function() {
        if (document.querySelector('.inp-score').value != '') {
            if (gameRunning) {
                // Add round score to global score
            scores[activePlayer] += roundScore
            // Update UI 
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
            
            // Check if player won
            if (scores[activePlayer] >= document.querySelector('.inp-score').value) {
                document.querySelector('#name-'+activePlayer).textContent = 'WINNER';
                document.querySelector('#dice-1').style.display = 'none';
                document.querySelector('#dice-2').style.display = 'none';
                document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
                document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
                document.getElementById('current-' + activePlayer).textContent = 0;
                gameRunning = false;
            } else {
                // Next Player 
                 nextPlayer();
            }
           
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
       document.getElementById('dice-1').style.display = 'none';
       document.getElementById('dice-2').style.display = 'none'; 
}

function init() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    document.querySelector('#dice-1').style.display = 'none';
    document.querySelector('#dice-2').style.display = 'none';
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
    document.querySelector('.inp-score').value = '';
    gameRunning = true;
    
    }
    