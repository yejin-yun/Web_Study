const wordInput = document.querySelector("#word-input");
const currentWord = document.querySelector("#current-word"); // 현재 입력해야 하는 단어 
const scoreDisplay = document.querySelector("#score");
const timeDisplay = document.querySelector("#time");
const messageDisplay = document.querySelector("#message");


const GAME_TIME = 10; // 기본적으로 가질 수 있는 시간 // 변하지 않는 변수 선언시 대문자+언더바 사용됨. 
const API_URL = "https://random-word-api.herokuapp.com/word?number=1000";

init_async();
// 처음 화면이 실행되면 init이라는 함수를 실행하도록 만들어볼 것.
// 보통 가장 첫번째로 초기화시키고 준비를 해주는 셋팅해주는 함수를 init이라는 이름으로 convention을 많이 한다. 
function init() {
    
    const res = fetch(API_URL).then((res)=>{return res.json()})
        .then((data)=>{
            // words라는 변수에 넘겨 받은 데이터를 담아주면 된다. 
            words = data;
        }); 
    //const res = fetch(API_URL)후에 res에 담긴 값을 확인해보면 Promise가 찍힌다. 
    // fetch를 하면 통신을 하는 시간이 필요한데, 통신을 하는 시간에 consol.log(res)를 통해 출력했기 때문에 아직 통신이 완료되지 않았기 때문이다. 
    // 이것을 보완하기 위해서 Promise 문법을 사용할 수 있다. promise 문법은 이게 실행이되고, 그러고 나서 이것을 실행하고, 그리고 나서 실행을 하라는 명령어. then이라는 키워드를 사용한다. 
    // 첫번쨰 then 설명
    // then안에 함수 형태로 들어가는데, 인자 부분에 통신한 내용(응답)을 넘겨받음(우리는 res라는 이름으로 받을 것)
    // 응답을 return 시켜서 다음 then으로 넘겨받으면 된다. res를 json으로 변환한 값을 return해주면 된다. 
    // 화살표 함수 사용할 때 우리가 넘겨받는 인자가 하나이고 바로 return을 해주면(코드가 한줄이면) 리턴과 중괄호 생략 가능해서 res => res.json()으로 코드를 작성할 수 있다. 
}

//async await
async function init_async() {
    // 함수 앞에 async function임을 알려준다. 이 함수를 실행하면 async await을 사용할 것임을 알려준다. 
    // async function(비동기 함수) : callback과 promise의 단점을 보완하기 위해 추가됨. 
    const res = await fetch(API_URL); // await 키워드를 앞에 붙이면 fetch가 실행이 다 된 후에 그 값이 res에 담기게 된다. 
    const data = await res.json(); // 마찬가지로 await을 통해서 res.json()을 해준다. 
    // await 명령어를 줬기 때문에 const res = await fetch(API_URL);가 완벽하게 실행된 다음에 다음 라인 코드를 실행한다. 

    //words = data를 해도 되지만 우리는 가공한 data 값을 담아볼 것. 
    // 단어가 6글자 이상인 것은 잘라버릴 것. 
    words = data.filter(item => item.length < 7);
    isReady = true;
}

let score = 0; // 글로벌 변수 
let words = ["banana", "key", "car", "javascript", "helper"];
let time = 0;
let timeInterval; // 시간이 count down 될 수 있는 interval을 하나 만들 것. 
let isPlaying = false;
let isReady = false;

wordInput.addEventListener("input", e => { // 인풋창에 입력이 들어오면 
    const typedText = e.target.value; // wordInput.value로 해도 상관없음. 아니면 event 객체의 data에 접근을 하거나(data에는 최근 입력한 한글자)
    const currentText = currentWord.innerText;

    // 기본적으로 typedText == currentText는 대소문자 구분을 함. 
    // 대소문자 구분을 없애줘야 함. 
    if(typedText.toUpperCase() === currentText.toUpperCase() && isReady) { // 단어가 같고 isReady가 true이면 실행을 함. 
        addScore();
        setNewWord();
    }

});

//게임 종료
function gameover() {
    isPlaying = false;
    // interval을 중지시키려면 clearInteval을 사용하면 된다. timeInteval을 clearInteval 시키면 된다. 
    clearInterval(timeInterval);
    timeInterval = null; // 좀 더 명확하게 하기 위해서 빈 값으로 초기화 시킴
    messageDisplay.innerText = "GAME OVER!";
    score = 0;
    scoreDisplay.innerText = score; // 선생님은 이 코드는 안 작성하심.
}

// 시간 카운트 다운 
function countDown() { //interval을 실행시킬 수 있는 함수 
    time--;
    timeDisplay.innerText = time;
    if(time == 0) {
        gameover();
    }
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
  
    // 화면이 렌더링 되었을 때 게임 시작
    //timeInterval = setInterval(countDown, 1000); //1000ms(1초)마다 실행을 해서, 1초마다 시간이 줄어들도록 만들 것. 
    // 위와 같이하면 단어를 성공할때마다 interval이 계속 쌓이게 된다. 시간이 미친듯이 줄어들게 되는 버그가 생김. 이것을 방지하기 위해서 현재 게임이 진행중인지 아닌지에 대한 상태값을 관리할 수 있는 변수를 하나 만들것.  
    // isPlaying=false인 상태로 setNewWord가 시작이되면 첫번째로 글자를 입력했다는 뜻. isPlaying에 게임을 하고 있다는 의미로 true를 넣어주면 된다. 

    // 두번째로 setNewWord가 시작이 되면 그때는 isPlaying이 true이기 때문에 interval이 중복되는 현상을 막을 수 있다.  
    if(!isPlaying) {
        timeInterval = setInterval(countDown, 1000); 
        isPlaying = true;
    }
}

function addScore() {
    score++;
    scoreDisplay.innerText = score;
} 