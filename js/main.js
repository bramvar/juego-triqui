import GameLogic from "./GameLogic.js";
import GameView from "./GameView.js";

let logic = new GameLogic();

let view = new GameView(document.getElementById("main"));

view.onSquareClick = function(index) {
    
    //console.log(Number(document.querySelector(".score_p1").innerHTML))
    console.log(`square: ${index}`);
    logic.move(index);
    view.updateAll(logic);
};

view.onRestartClick = function(){
    logic = new GameLogic();
    view.resetGame(logic);
};

view.onCleanBoardClick = function(){
    view.updatePlayer(logic);
    if(logic.isGameOver()){
        logic = new GameLogic();
        //view.updateBoard2(logic);
    }
    
}

view.updateAll(logic)