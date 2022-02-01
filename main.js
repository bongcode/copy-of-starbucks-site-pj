//랜덤번호 지정
//유저가 번호를 입력한다.. 그리고 'go'라는 버튼을 누름
//유저가 번호를 맞추면, 맞췄습니다!
//랜덤번호 > 유저번호 = Down!!
//랜덤번호 < 유저번호 = Up!!
//Reset 버튼을 누르면 게임이 리셋이 된다.
//5번의 기회를 다쓰면 게임이 끝난다.(더이상의 추측은 불가, 버튼이 disable)
//유저가 1~100 범위 밖의 숫자를 입력하면 알려준다.(기회를 깍지 않는다.)
//유저가 입력한 숫자를 또 입력하면, 알려준다.(기회를 깍지 않는다.)

let computerNum = 0;
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let resetButton = document.getElementById("reset-button")
let chances = 5
let gameOver = false
let chanceArea = document.getElementById("chance-area")
let history = []    

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus", function(){
    userInput.value = "";
}); //userInput의 값을 반영하고 난 뒤 '클릭'을 하면 공백으로 만들어라는 내용
 
function pickRandomNum(){
    computerNum = Math.floor(Math.random()*100)+1;
    console.log("정답",computerNum);
}

function play(){
    let userValue = userInput.value;

    ///유효성 검사///
    if(userValue < 1 || userValue > 100){
        resultArea.textContent = "1과 100사이의 숫자를 입력해주세요"
        return;
    }

    if(history.includes(userValue)){
        resultArea.textContent = "이미 입력한 값입니다. 다른 숫자를 입력해주세요"
        return;
    }
    ///유효성 검사 끝//
    chances --; 
    chanceArea.textContent = `남은기회: ${chances}번`  //맥북의 경우 뺵틱은 option + ~ 키를 누름(중요!!!)
    console.log("chance", chances);  //백틱의 경우 동적 + 정적인 수를 반영할때 주로 사용함!!

    if(userValue < computerNum){
        resultArea.textContent = "UP!!"
    } else if(userValue > computerNum){
        resultArea.textContent = "DOWN!!"
    } else{
        resultArea.textContent = "맞추셨습니다~"
        gameOver = true
    }

    history.push(userValue); //user가 사용한 값을 저장
    console.log(history)

    if(chances < 1){
        gameOver = true;
    }

    if(gameOver == true){
        playButton.disabled = true;
    }
}

function reset(){
    // user input창이 깨끗이 정리됨(초기화)
    userInput = ""
    // 새로운 번호(정답)이 제시됨
    pickRandomNum()
    resultArea.textContent = "결과값이 여기 나옵니다.";
}
pickRandomNum();