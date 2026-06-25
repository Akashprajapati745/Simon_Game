
const btn = document.querySelector(".start-btn")
let gameSeq = [];
let userSeq = [];
let players = [];
let head = document.querySelector(".head")
const color= ["red" , "green" , "blue" , "yellow"];

let started = false;
let level = 0;
let score = 0;

const playerName = document.querySelector("#playerInput")
const addbtn = document.querySelector("#addBtn")
const playerList = document.querySelector("#playerList");
let currentPlayerIndex = 0;
let gameFinished = false;

addbtn.addEventListener("click" , () =>{
    
    let name = playerName.value.trim();

    if(name === ""){
        alert("Please enter a name!!")
        return;
    }

    let div = document.createElement("div");
    div.classList.add("player")
    
    let nameSpan = document.createElement("span")
    nameSpan.innerText = name;

    let scoreSpan = document.createElement("span");
    scoreSpan.innerText = score; 
     
    players.push({
        name : name,
        scores : 0,
        scoreElement : scoreSpan,
    });
    div.appendChild(nameSpan);
    div.appendChild(scoreSpan);
    playerList.appendChild(div)

    playerName.value = ""
})





btn.addEventListener("click", () => {

    if(players.length === 0){
        alert("Add at least one player!");
        return;
    }

    if(!started){

        head.classList.remove("error");

        head.innerHTML =
        `${players[currentPlayerIndex].name}'s Turn - Level 1`;

        btn.classList.add("btn-invisible");

        started = true;

        randomColor();
    }
});
    


function randomColor (){
    level++;
    
    head.innerHTML =`${players[currentPlayerIndex].name} - Level ${level}`;
    let randnumber = Math.floor(Math.random()*4);
    let randomcolor = color[randnumber]
    gameSeq.push(randomcolor)
    
      

    flashBtn(randomcolor)

}

function flashBtn(randomcolor){
    let colors = document.querySelector(`.${randomcolor}`)

    
    colors.classList.add("flash")
    setTimeout(() => {
        colors.classList.remove("flash")
    }, 180);
    
}
let allBtns = document.querySelectorAll(".box")


for(let btn of allBtns){
    btn.addEventListener("click",userPress)
}
function userPress(){
    if(!started) return;
    let userColor = this.classList[0];
    
    userSeq.push(userColor)
    flashBtn(userColor)

    checkAnswer(userSeq.length-1)
}

function checkAnswer(idx){
        if(userSeq[idx] === gameSeq[idx]){
            
        if(userSeq.length === gameSeq.length){
            score+=3;
            userSeq=[];
            setTimeout(() =>{
                randomColor();
            },1000)
        }
    }
    else{

    players[currentPlayerIndex].scores = score;

    players[currentPlayerIndex].scoreElement.innerText = score;

    currentPlayerIndex++;

    if(currentPlayerIndex >= players.length){

        let winner = players[0];

        for(let player of players){

            if(player.scores > winner.scores){
                winner = player;
            }
           
        }

        head.innerHTML =
        `🏆 Winner: ${winner.name} (${winner.scores} points)`;

        gameFinished = true;

        btn.classList.add("btn-invisible");

        return;
    }

    head.innerHTML =
    `${players[currentPlayerIndex-1].name} scored ${score}.
     Click Start for ${players[currentPlayerIndex].name}`;

    head.classList.add("error");

    btn.classList.remove("btn-invisible");

    started = false;

    level = 0;
    score = 0;

    gameSeq = [];
    userSeq = [];
}
}




const themeBtn = document.querySelector("#theme-btn");
let value = false;

themeBtn.addEventListener("click", () => {
     if(!value){
        themeBtn.innerText = "☀️ Light Mode"
        document.body.classList.toggle("theme2");
        value = true;
     }
     else{
        themeBtn.innerText = "🌙 Dark Mode"
        document.body.classList.toggle("theme2");
        value = false
     }

});