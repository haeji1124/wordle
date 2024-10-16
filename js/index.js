let index = 0;
let attempts = 0;
let timer;

const 정답 = "APPLE"

function appStart(){
    const displayGameover = () => {
        const div = document.createElement('div');
        div.innerText = "게임이 종료되었습니다.";
        div.style = "display:flex; justify-content:center; align-items:center; position:absolute; top:100px; left:74px; background-color:black; color:white; width:200px; height:100px;";
        const board = document.querySelector(".board")
        board.appendChild(div);
    };

    const gameover = () => {
        window.removeEventListener("keydown", handleKeydown)
        displayGameover();
        clearInterval(timer);
    }
    const nextLine = () => {
        if (attempts === 5) gameover();
        attempts += 1;
        index = 0;
    }
    const handleEnterKey = (event) => {
        if (index === 5){
            let 맞은_갯수 = 0
            // 정답 확인
            for (let i = 0 ; i < 5; i++){
                const block = document.querySelector(`.board-block[data-index='${attempts}${i}']`);
                block.style.color = "white";
                if (block.innerText === 정답[i]) {
                    block.style.background = '#6AAA64'
                    맞은_갯수 += 1
                }
                else if (정답.includes(block.innerText)) block.style.background = "#C9B458"
                else block.style.background = "#787C7E"
            }
            if (맞은_갯수 === 5) gameover();
            else nextLine();
        }
        else{
            // 5글자 모두 입력하세요
        }
    }

    const handleBackspace = () => {
        if (index > 0){
            const preBlock = document.querySelector(`.board-block[data-index='${attempts}${index-1}']`);
            preBlock.innerText = ""
        }
        if (index !== 0) index -= 1;
        
    }

    const handleKeydown = (event) => {
        const key = event.key;
        const keyCode = event.keyCode
        const b = document.querySelector(`.board-block[data-index='${attempts}${index}']`);
        if (event.key === "Backspace") handleBackspace();
        else if (event.key === "Enter") handleEnterKey();
        else if (index === 5) return;

        else if (keyCode >= 65 && keyCode <= 90){
            b.innerText = key.toUpperCase();
            index += 1;
        }
    }

    const startTimer = () => {
        const 시작_시간 = new Date();

        function setTime() {
            const 현재_시간 = new Date();
            const 흐른_시간 = new Date(현재_시간 - 시작_시간);
            const 분 = 흐른_시간.getMinutes().toString().padStart(2, "0");
            const 초 = 흐른_시간.getSeconds().toString().padStart(2, "0");
            const timeDiv = document.querySelector(".time");
            timeDiv.innerText = `${분}:${초}`;
        }

        timer = setInterval(setTime, 1000);
    }
    startTimer();
    window.addEventListener("keydown", handleKeydown)
}

appStart();