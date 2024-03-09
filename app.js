// recupération du boutton
const button = document.getElementById('button');
// recupération du gameboard
const gameBoard = document.getElementById('game-board');
//recupération de la div de message
const msg = document.getElementById('msg');
// initialisations du tableau de cartes
//création des audios 
let fxGood = new Audio('./sounds/good.mp3');
let fxClick = new Audio('./sounds/click.mp3');
let fxWrong = new Audio('./sounds/wrong.mp3');

var cards = [];
// correspond à la longueur initiale du tab cards pour comparaison avec la var matched 
//      ----- si cardsLength === matched ---- victoire
var cardsLength = 0;
// initialisations du tableau de vérifications des cartes
var selectedCards = [];
// variable pour empecher de retourner plus de deux cartes par tour

var hits = 0;
// variable pour savoir si on à gagner
var matched =0; // +1 si deux cartes identiques sont trouvées

// initialisation du jeu
function initGame(){
    button.innerHTML='recommencer';
    
const p = msg.querySelector('p');
if (p !=null) {
    msg.removeChild(p);}

    // Réinitialiser le tableau cards
    cards = [
        'https://picsum.photos/id/237/100/100', 
        'https://picsum.photos/id/238/100/100',
        'https://picsum.photos/id/239/100/100',
        'https://picsum.photos/id/240/100/100',
        'https://picsum.photos/id/241/100/100',
        'https://picsum.photos/id/242/100/100',
        'https://picsum.photos/id/243/100/100',
        'https://picsum.photos/id/244/100/100'
    ];
    // Réinitialiser la longueur du tableau cards
    cardsLength = cards.length;
    // Réinitialiser les cartes sélectionnées
    selectedCards = [];
    // Réinitialiser le nombre de coups
    hits = 0;
    // Réinitialiser le nombre de cartes appariées
    matched = 0; 
    // Lancer le jeu
    createGameBoard();
}


//creation du game board
function createGameBoard () {
    // Effacer toutes les cartes existantes du plateau de jeu
    gameBoard.innerHTML = '';
    // duplication des url 
    for (var i = 0; i < cardsLength; i++) {
        cards.push(cards[i]);
    }

    //mélange des cartes 
    shuffle(cards);

    //affichage des cartes triées
    for (var i = 0; i < cards.length; i++) {
        //insertion de carte 
        gameBoard.appendChild(createCard(cards[i]));
    }
    

}

// création de carte
function createCard (cardUrl) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = cardUrl;

    const cardContent = document.createElement('img');
    cardContent.classList.add('card-content');
    cardContent.src = `${cardUrl}`;
    cardContent.addEventListener('click',onCardClick);
    cardContent.addEventListener('dragstart', function(e) {
        e.preventDefault(); // Annule le glissement de l'image
    });
    card.appendChild(cardContent);
  
    return card;
}

//clique sur carte 
function onCardClick(e){
    const card = e.target.parentElement;

    if (card.classList.contains('flip') || card.classList.contains('matched')) {
        return;
    }

    if (selectedCards.length < 2 ) {
        // bruitage
        fxClick.play();
        selectedCards.push(card);
        card.classList.add("flip");

        // Si deux cartes sont sélectionnées, comparer
        if (selectedCards.length === 2) {
            hits++;
            // Comparer les valeurs des cartes
            if (selectedCards[0].dataset.value === selectedCards[1].dataset.value) {
                // Si les valeurs des cartes sont identiques, marquer les cartes comme appariées
                fxGood.play();
                selectedCards[0].classList.add("matched");
                selectedCards[1].classList.add("matched");
                selectedCards = [];
                matched ++;

                // Vérifier si toutes les cartes ont été appariées
                if (matched === cardsLength) {
                    win();
                }
            } else {
                fxWrong.play();
                // Si les valeurs des cartes sont différentes, attendre un court instant avant de les retourner
                setTimeout(() => {
                    selectedCards[0].classList.remove("flip");
                    selectedCards[1].classList.remove("flip");
                    selectedCards = [];
                }, 1000);
            }
        }
    }
}



    
    


//fonction de tri
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }
// fonction de victoire 
function win () {
    let p = document.createElement('p');
    msg.appendChild(p);
    p.innerHTML = "vous avez gagné en " + hits + " coups"
}
