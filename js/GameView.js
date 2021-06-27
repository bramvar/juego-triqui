export default class GameView{
    constructor(root){
        this.root = root;
        this.root.innerHTML =` 
            <div class="container">
                <div class="hea_fo header">

                    <div class="header_player">
                        Player's turn: X 
                    </div>

                    <div class="header_status">
                        FIGHT
                    </div>
                  
                    <button type="button" class="button_restart">
                        restart game
                    </button>

                
                </div>

                <div class="game">
                    <div class="board_square" data-index="0"></div>
                    <div class="board_square" data-index="1"></div>
                    <div class="board_square" data-index="2"></div>
                    <div class="board_square" data-index="3"></div>
                    <div class="board_square" data-index="4"></div>
                    <div class="board_square" data-index="5"></div>
                    <div class="board_square" data-index="6"></div>
                    <div class="board_square" data-index="7"></div>
                    <div class="board_square" data-index="8"></div>
                </div>

                <div class="hea_fo footer">
                    <div class="score_player1 cont_t">
                        <div class="player1"> PLAYER X </div>
                        <div class="score_p1 cont-t">0</div>                       
                    </div>

                    <div class="score_tie cont_t">
                        <div class="tie"> TIE </div>
                        <div class="score_t cont-t">0</div>   
                    </div>

                    <div class="score_player2 cont_t">
                        <div class="tie"> PLAYER O </div>
                        <div class="score_p2 cont-t">0</div> 
                    </div>
                </div>
            </div>
        `;

        this.onSquareClick = undefined;
        this.onRestartClick = undefined;

        this.root.querySelectorAll(".board_square").forEach(sq => {
            sq.addEventListener("click",() => {
                this.onSquareClick(sq.dataset.index);
            });
            
        });

        this.root.querySelector(".button_restart").addEventListener("click",() => {
            this.onRestartClick();
        });

        this.root.querySelector(".container").addEventListener("click",()=>{
            this.onCleanBoardClick();
        });
    }

    cleanScores(){
        let initialScore=0;
        this.root.querySelector(".score_p1").textContent =`${initialScore}`;
        this.root.querySelector(".score_p2").textContent =`${initialScore}`;
        this.root.querySelector(".score_t").textContent =`${initialScore}`;
    }
    
    resetGame(game){
        this.updateAll(game)
        this.cleanScores();
    }


    updateAll(game){
        this.updatePlayer(game);
        this.updateGameStatus(game);
        this.updateBoard(game);
        this.updateScores(game)
        
    }

    updateBoard2(game){
        this.updatePlayer(game);
        this.updateGameStatus(game);
    }

    updateScores(game){
        let actualScore=0;

        if(game.findValidCombination()){
           
            if(game.player==="X"){
                actualScore=Number(this.root.querySelector(".score_p1").innerHTML) + 1;
                console.log(actualScore)
                this.root.querySelector(".score_p1").textContent =`${actualScore}`;
            }  
            else{
                actualScore=Number(this.root.querySelector(".score_p2").innerHTML) + 1;
                console.log(actualScore)
                this.root.querySelector(".score_p2").textContent =`${actualScore}`;
            }
            
        }
        else if(game.isGameOver()){
            actualScore=Number(this.root.querySelector(".score_t").innerHTML) + 1;
            console.log(actualScore)
            this.root.querySelector(".score_t").textContent =`${actualScore}`;
        }

    }

    updatePlayer(game){
        this.root.querySelector(".header_player").textContent = `Player's turn: ${game.player} `
    }

    updateGameStatus(game){
        let status = "FIGHT";

        if(game.findValidCombination()){
            status = `GAME OVER! ${game.player} WIN`;
        }
        else if(game.isGameOver()){
            status = `GAME OVER! NOBODY WINS`;
        }
        this.root.querySelector(".header_status").textContent = status;
    }

    updateBoard(game){
        const vComb = game.findValidCombination();

        for(let i=0; i< game.board.length;i++){
            const square = this.root.querySelector(`.board_square[data-index="${i}"]`);

            square.classList.remove("win");
            square.textContent= game.board[i];

            if(vComb && vComb.includes(i)){
                square.classList.add("win");
            }
        }
    }
}