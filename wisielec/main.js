const lettersDisplay = document.querySelector('.letters');
const passwordDisplay = document.querySelector('.password');
const hangmanDisplay = document.querySelector('.hangman');
const resultDisplay = document.querySelector('.result');
const resetTheGame = document.querySelector('.reset-the-game');
const wordGame = document.querySelector('.set-word');
const startTheGame = document.querySelector('.start-the-game');

const letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
let password = '';
let passwordLength = password.length;
let hidePassword = [];
let lost = 0;
let win = 0;
let word = '';
let check = [];

wordGame.addEventListener('input', (e) =>
{
    word = e.target.value;
    password = word.toLowerCase();
    passwordLength = password.length;
});

const SetGame = () =>
{
    for(let i = 0; i < letters.length; i++)
    {
        const newDiv = document.createElement('div');
        newDiv.classList.add('div-letter');
        newDiv.innerHTML =  letters[i].toUpperCase();
        newDiv.dataset.letter = letters[i];

        lettersDisplay.appendChild(newDiv);
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
    // if(word !== ' ')
    // {
        SetPassword();
        wordGame.style.display = 'none'
        startTheGame.style.display = 'none'
    // }
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
    console.log(password)
    console.log(hidePassword)
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
		const image = "img/s"+ lost + ".jpg";
		hangmanDisplay.innerHTML = '<img src="'+image+'" alt="" />';
        document.querySelector('.div-letter').style.userSelect = 'none'
    }

    e.target.style.pointerEvents = 'none';

    // Game Result
    if(lost >= 9)
    {
        resultDisplay.innerHTML = 'Result of the game: You lost!'
        resultDisplay.style.color = 'red';
        divLetter.forEach(btn => btn.style.pointerEvents = 'none');
    }  

    if(win === passwordLength)
    {
        resultDisplay.innerHTML = 'Result of the game: You won!'
        resultDisplay.style.color = 'green';
        divLetter.forEach(btn => btn.style.pointerEvents = 'none');
    }

    console.log(win)
    console.log(hidePassword.length)

}));

resetTheGame.addEventListener('click', () =>
{
    location.reload();
});