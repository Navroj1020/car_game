const score = document.querySelector(".score");
const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");
const again = document.querySelector(".again");
let player = {speed:4, score: 0};
let keys = { ArrowUp:false, ArrowDown:false, ArrowLeft:false, ArrowRight:false}
startScreen.addEventListener("click",start);
again.addEventListener("click",start);
document.addEventListener("keydown",pressOn);
document.addEventListener("keyup",pressOff);

function moveLines(){
    let lines = document.querySelectorAll(".line");
    lines.forEach(function(item){
       
        if(item.y > 1500){
            item.y -= 1500;
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}
function isCol(a,b){
    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();
    return !(
        (aRect.bottom < bRect.top) ||
        (aRect.top> bRect.bottom) ||
        (aRect.right < bRect.left) ||
        (aRect.left > bRect.right)
    )
}
function moveEnemy(car){
    let ele = document.querySelectorAll(".enemy");
    ele.forEach(function(item){
        if(isCol(car,item)){
            const audio = new Audio('crash-6711.mp3');
            audio.play();
            endGame();
        }
        if(item.y > 1500){
            item.y = -590;
            item.style.left = Math.floor(Math.random()*350)+ "px";
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
        
    })
}
function playGame(){
    let car = document.querySelector(".car");
    moveLines();
    moveEnemy(car);
    let road = gameArea.getBoundingClientRect();
    if(player.start){
        if(keys.ArrowUp && player.y > road.top){
            player.y -= player.speed;
        }
        if(keys.ArrowDown && player.y < road.bottom){
            player.y += player.speed;
        }
        if(keys.ArrowRight && player.x < (road.width-75)  ){
            player.x += player.speed;
        }
        if(keys.ArrowLeft && player.x > 0){
            player.x -= player.speed;
        }
        car.style.left = player.x + "px";
        car.style.top = player.y + "px";
    window.requestAnimationFrame(playGame);
    player.score ++;
    score.innerText ="Score: "+ player.score;
    }
}
function pressOn(e){
    e.preventDefault();
    keys[e.key] = true;
   
}
function pressOff(e){
    e.preventDefault();
    keys[e.key] = false;
    
}
function endGame(){
    player.start= false;
    score.innerHTML = "Game over<br>Score: "+ player.score;
    again.classList.remove("hide");
}
function start(){
    startScreen.classList.add("hide");
    gameArea.classList.remove("hide");
    again.classList.add("hide");
    score.classList.remove("hide");
    gameArea.innerHTML="";
    player.start = true;
    player.score = 0;
    for(let x=0;x<10;x++){
        let div2 = document.createElement("div");
        div2.classList.add("line2");
        div2.y=x*150;
        div2.style.top = (x*150) + "px";
        gameArea.appendChild(div2);
    }
    for(let x=0;x<10;x++){
        let div3 = document.createElement("div");
        div3.classList.add("line3");
        div3.y=x*150;
        div3.style.top = (x*150) + "px";
        gameArea.appendChild(div3);
    }
    for(let x=0;x<10;x++){
        let div = document.createElement("div");
        div.classList.add("line");
        div.y=x*150;
        div.style.top = (x*150) + "px";
        gameArea.appendChild(div);
    }
    window.requestAnimationFrame(playGame);
    let car = document.createElement("div");
    
    car.setAttribute("class", "car");
    gameArea.appendChild(car);
    player.x = car.offsetLeft;
    player.y = car.offsetTop;
    for(let x=0;x<4;x++){
        let enemy = document.createElement("div");
        enemy.classList.add("enemy");
        enemy.innerHTML ="<br>"+ (x+1);
        enemy.y= ((x+1)*600)*-1;
        enemy.style.top = enemy.y +"px";
        enemy.style.left = Math.floor(Math.random() *350)+ "px";
        gameArea.appendChild(enemy);
    }
}

