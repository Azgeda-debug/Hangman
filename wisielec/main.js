const lettersDisplay = document.querySelector('.letters');
const passwordDisplay = document.querySelector('.password');
const hangmanDisplay = document.querySelector('.hangman');
const resultDisplay = document.querySelector('.result');
const resetTheGame = document.querySelector('.reset-the-game');
const wordGame = document.querySelector('.set-word');
const startTheGame = document.querySelector('.start-the-game');
const showResults = document.querySelector('.show-results');
const hideResults = document.querySelector('.hide-results');

const letters = ['a','ą','b','c','ć','d','e','ę','f','g','h','i','j','k','l','ł','m','n','ń','o','ó','p','q','r','s','ś','t','u','v','w','x','y','z','ź','ż'];
let password = '';
let hidePassword = [];
let lost = 0;
let win = 0;
let word = '';
let check = [];
let gamesWon = 0;
let gamesLost = 0;
let image = "img/s"+ lost +".jpg";

wordGame.addEventListener('input', (e) =>
{
    password = '';
    hidePassword = [];
    word = e.target.value;
    password = word.toLowerCase();
    passwordLength = password.length;
});

const SetGame = () =>
{
    lettersDisplay.innerHTML = '';

    for(let i = 0; i < letters.length; i++)
    {
        const newDiv = document.createElement('div');
        newDiv.classList.add('div-letter');
        newDiv.innerHTML =  letters[i].toUpperCase();
        newDiv.dataset.letter = letters[i];

        lettersDisplay.appendChild(newDiv);
        hangmanDisplay.innerHTML = '<img src="'+image+'">';
        newDiv.style.pointerEvents = 'none'
    }
}

const SetPassword = () =>
{
    for(let i = 0; i < passwordLength; i++)
    {
        if(password[i] === ' ')
        {
            hidePassword[i] = '&nbsp;';
        }
        else
        {
            hidePassword[i] = '_';
        }
    }
    
    passwordDisplay.innerHTML = hidePassword.join(' ');
}

startTheGame.addEventListener('click', () =>
{
    const letterCheck = /^[A-Za-z]+$/;

    if(wordGame.value.match(letterCheck))
    {
        if(word !== '')
        {
            SetPassword();
            wordGame.style.display = 'none'
            startTheGame.style.display = 'none'
            divLetter.forEach(letter => letter.style.pointerEvents = 'auto');
        }
        else
        {
            alert('Fill the required field');
        }
    }
    else
    {
        alert('You can not use numbers.');
    }

});

window.onload = SetGame();

const divLetter = document.querySelectorAll('.div-letter');

divLetter.forEach(btn => btn.addEventListener('click', (e) =>
{ 
    const letter = e.target.dataset.letter;
    let hit = false;

    for(let i = 0; i < passwordLength; i++)
    {
        if(password[i].toUpperCase().includes(letter.toUpperCase()))    //if(password.charAt(i) === letter)
        {
            hidePassword[i] = letter;
            hit = true;
            
            if(hidePassword[i] !== '_')
            {
                win++;
            }
        }
        if(hidePassword[i] == '&nbsp;')
        {
            while (check[i] !== true) 
            {
                win++;
                check[i] = true
            }
        }
    }

    passwordDisplay.innerHTML = hidePassword.join(' ');

    // Styling Letters 
    if(hit === true)
    {
        e.target.style.background = 'green';
    }
    else
    {
        e.target.style.background = 'red';
        lost++;
        image = "img/s"+ lost +".jpg";
		hangmanDisplay.innerHTML = '<img src="'+image+'">';
        document.querySelector('.div-letter').style.userSelect = 'none'
    }

    e.target.style.pointerEvents = 'none';

    // Game Result
    if(lost >= 9)
    {
        resultDisplay.innerHTML = 'Result of the game: You lost!'
        resultDisplay.style.color = 'red';
        divLetter.forEach(btn => btn.style.pointerEvents = 'none');
        gamesLost++;
        showGameResults();
    }  

    if(win === passwordLength)
    {
        resultDisplay.innerHTML = 'Result of the game: You won!'
        resultDisplay.style.color = 'green';
        divLetter.forEach(btn => btn.style.pointerEvents = 'none');
        gamesWon++;
        showGameResults();
    }
}));

resetTheGame.addEventListener('click', () =>
{
    divLetter.forEach(letter => letter.style.background = 'inherit');
    wordGame.style.display = 'block';
    startTheGame.style.display = 'block';
    resultDisplay.style.color = 'inherit';
    resultDisplay.innerHTML = 'Result of the game:';
    image = "img/s"+ 0 +".jpg";
    lost = 0;
    win = 0;
    hangmanDisplay.innerHTML = '<img src="'+image+'">';
    passwordDisplay.innerHTML = '';
});

const newSpan = document.createElement('span');

const createGameResult = () =>
{
    newSpan.className = 'show-results-span';
    newSpan.innerHTML = `<p class="show-results-span-title">Games:</p>
    <p class="show-results-span-won">won: ${gamesWon}</p>
    <p class="show-results-span-lost">lost: ${gamesLost}</p>`;

    document.body.appendChild(newSpan);
    hideResults.classList.add('active');
    hideResults.style.display = 'block';
    hideResults.style.color = 'black';
    hideResults.style.background = 'white';
    showResults.style.display = 'none';
}

const hideScores = () =>
{
    newSpan.classList.add('active');
    hideResults.style.display = 'none';
    showResults.style.display = 'block';
}

const showGameResults = () =>
{
    newSpan.innerHTML = `<p class="show-results-span-title">Games:</p>
    <p class="show-results-span-won">won: ${gamesWon}</p>
    <p class="show-results-span-lost">lost: ${gamesLost}</p>`;

}

showResults.addEventListener('click', createGameResult);
hideResults.addEventListener('click', hideScores);