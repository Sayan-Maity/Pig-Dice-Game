var scores, activePlayer, roundScore, gamePlaying;

init();

//querySelector is used to select Id or class
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice +'</em>';

//var x = document.querySelector('#score-0').textContent;
//console.log(x); // checking



/**************************** ROLL BTN ************************* */

document.querySelector('.btn-roll').addEventListener('click', function() { //anonymous fun - doesn't have name and we can't use it outside this context
      
    if (gamePlaying) {

        //1. random number
        var dice = Math.floor(Math.random() * 6) + 1;

        //2. display result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'assets/dice-' + dice + '.png';

        //3. update the round score if the rolled number was not a 1
        if (dice !== 1) { //add score (type cohesion)

            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {  //next player
            nextPlayer();
        }
    }
        
});


/************************HOLD BTN************************* */

document.querySelector('.btn-hold').addEventListener('click', function() {

    if (gamePlaying) {
        //Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        //Update UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //check if player won the game
        if (scores[activePlayer] >= 100) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('winner');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }

});

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1: activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // //adding and removing class
    // document.querySelector('.player-0-panel').classList.remove('active');
    // document.querySelector('.player-1-panel').classList.add('active');
     document.querySelector('.player-0-panel').classList.toggle('active');
     document.querySelector('.player-1-panel').classList.toggle('active');
}

/*******************New game********************** */

document.querySelector('.btn-new').addEventListener('click', init);

/*******************initializing func ******************/

function init() { 
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0; //0 is first player and 1 is second player
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none'; //changing css - method.property

    document.getElementById('score-0').textContent = '0'; // getElementById is faster than queryScelector
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

}