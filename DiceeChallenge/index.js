function rollDice(player) {
    var dice = 1 + Math.floor(Math.random() * 6);
    var images = document.querySelectorAll("img");
    images[player - 1].setAttribute("src", "images/dice" + dice + ".png");
    return dice;
}

function selectWinner(dice1, dice2) {
    var caption = document.querySelector("h1");
    if(dice1 > dice2) {
        caption.textContent = "Player 1 wins!";
    } else if(dice1 < dice2) {
        caption.textContent = "Player 2 wins!";
    } else {
        caption.textContent = "Draw (Tie?)";
    }
}

selectWinner(rollDice(1), rollDice(2));
