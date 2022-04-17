// http request

const url = "https://api.covid19api.com/country/south-korea/status/confirmed?from=2021-09-01T00:00:00Z&to=2021-09-09T00:00:00Z";
const corona = fetch(url).then(function(res) { //res는 우리가 받는 응답
    // fetch를 한 후에 실행하라는 의미에서 then을 사용한 것.  
    return res.json();
}).then(data => console.log(data)); // 화살표 함수 인자가 하나이면 괄호 생략 가능해짐
// 또한 return 되는 내용도 한 줄이면 중괄호를 생략할 수 있음. 즉 아래와 같은 코드가 가능해진다. 
const coronaA = fetch(url).then(res => res.json()).then(data => console.log(data));


