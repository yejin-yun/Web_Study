const wordInput = document.querySelector("#word-input");
const currentWord = document.querySelector("#current-word"); // 현재 입력해야 하는 단어 
const scoreDisplay = document.querySelector("#score");
const timeDisplay = document.querySelector("#time");
const messageDisplay = document.querySelector("#message");


const GAME_TIME = 5; // 기본적으로 가질 수 있는 시간 // 변하지 않는 변수 선언시 대문자+언더바 사용됨. 

let score = 0; // 글로벌 변수 
let words = ["banana", "key", "car", "javascript", "helper"];
let time = 0;
let timeInterval;

// 시간이 count down 될 수 있는 interval을 하나 만들 것. 

wordInput.addEventListener("input", e => { // 인풋창에 입력이 들어오면 
    const typedText = e.target.value; // wordInput.value로 해도 상관없음. 아니면 event 객체의 data에 접근을 하거나(data에는 최근 입력한 한글자)
    const currentText = currentWord.innerText;

    // 기본적으로 typedText == currentText는 대소문자 구분을 함. 
    // 대소문자 구분을 없애줘야 함. 
    if(typedText.toUpperCase() === currentText.toUpperCase()) {
        addScore();
        setNewWord();
    }

});

// 시간 카운트 다운 
function countDown() {
    
}

function setNewWord() {
    // 시간 초기화
    time = GAME_TIME;
    // input의 글자를 초기화하는 기능
    wordInput.value = "";
    // 타자쳤을 때 메세지를 입력해줌
    messageDisplay.innerText = "Now Playing!!!"
    // 글자를 바꾸는 기능
    // 랜덤한 숫자를 만들려면 javascript에 내장된 Math.random()을 사용하면 됨.  0~1사이의 랜덤한 숫자가 나온다. 
    // 소수점을 자르기 위해서 Math.floor를 사용한다. 
    const randomIndex = Math.floor(Math.random() * words.length); // 단어의 길이를 곱하면 0~4 사이의 소수점이 나옴. 소수점은 잘라버리면 됨. 
    currentWord.innerText = words[randomIndex];
    
}

function addScore() {
    score++;
    scoreDisplay.innerText = score;
} 