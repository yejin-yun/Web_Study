// input DOM을 가져와서 input에 들어있는 값을 가져온다.
const inputText = document.querySelector(".input-text");
const addButton = document.querySelector(".add-button");
const list = document.querySelector(".list");

const likeButtons = document.querySelectorAll(".like"); // 여러개니까 querySelectorAll을 사용해야 한다. 

const addItem = () => {

    // 빈 칸 등록 방지
    //if(inputText.value === "") return; // 함수 종료 
    // 하지만 스페이스 입력하면 등록이 됨. 이것을 방지하기 위해서 tream(공백제거)이라는 메서드 사용.
    if(inputText.value.trim() === "") return;

    // like
    const like = document.createElement("span");
    const likeIcon = document.createElement("i");
    like.classList.add("like"); // 클래스 추가
    likeIcon.classList.add("material-icons");
    likeIcon.innerText = "favorite_border"; // 태그 사이에 text를 넣어줘야 아이콘이 나왔음. 
    like.appendChild(likeIcon);

    // 할일 
    const item = document.createElement("span");
    item.classList.add("item");
    item.innerText = inputText.value;


    // manage 부분
    const manage = document.createElement("span");
    const checkIcon = document.createElement("i");
    const clearIcon = document.createElement("i");
    checkIcon.classList.add("material-icons", "check");
    clearIcon.classList.add("material-icons", "clear");
    checkIcon.innerText = "check";
    clearIcon.innerText = "clear";
    manage.classList.add("manage");
    manage.appendChild(checkIcon);
    manage.appendChild(clearIcon);

    // event
    like.addEventListener("click", (e) => { // 참고로 여기에 달면 이미 생성되어 있던 기존의 li는 작동하지 않음. 근데 어차피 테스트 li였으니까 상관없음. 
        //like의 event를 출력해서 like의 타겟을 찾아야함. 
        // 찾아보면 target : i.meteriaal-incos라고 되어 있음. 이 i 태그의 inner text를 바꿔주면 됨.  
        const target = e.target;
        const text = target.innerText === "favorite" ? "favorite_border" : "favorite";
        target.innerText = text;
    });

    checkIcon.addEventListener("click", (e) => { 
        console.log(e);
        // event를 출력해보면 target 안에 parentNode라는 것이 있음. 
        // parentNode를 보면 span.manage가 부모라는 것을 알 수 있음. 
        // 여기 parentNode안에 또 다시 parentNode를 보면(checkIncon(자신)의 부모의 부모) li가 선택 되는 것을 볼 수 있다. 
        // 정리를 하면 e의 target 안에 parentNode, 또 그 안에 parentNode. 
        const target = e.target.parentNode.parentNode;
        target.classList.add("done"); // li의 class로 done을 주면 된다. 
        
    });

    clearIcon.addEventListener("click", (e) => { 
        // 삭제를 할때는 동일하게 부모를 찾아서 해당 li를 삭제해주면 됨. 
        const target = e.target.parentNode.parentNode;
        list.removeChild(target); // list에서 선택된 li를 삭제함
        // removeChild는 list가 가진 자식요소 중 하나를 선택해서 삭제하는 것.  
    });


   // list에 추가를 하기 위해서 ul 태그의 li로 추가하면 된다. 
   // 먼저 li를 만들어서 집어넣을 것이다. 
   const li = document.createElement("li"); // html 요소를 하나 만들겠다는 거. 
   li.appendChild(like);
   li.appendChild(item);
   li.appendChild(manage);
   list.appendChild(li); //ul같은 태그 안에 자식 요소로 어떤 element를 집어넣을 때 사용하는 메서드 

   // 모든것이 다 추가된 후에 input을 초기화 해줌
   inputText.value = "";

    // 버튼을 누르면 포커스가 계속 버튼에 가 있음. input value를 초기화 시킨 후에 input으로 포커스를 옮겨줌
    inputText.focus();
}; // 일반 함수로 선언해도 됨.


// input에 enter를 쳤을 때 등록되게 함
inputText.addEventListener("keypress", e => { //인자로 event를 넘겨받을 수 있음. 
    if(e.keyCode === 13) {
        addItem();
    }
}); 


addButton.addEventListener("click", addItem);




