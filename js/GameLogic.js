export default class GameLogic{
    
    constructor(){
        this.player ="X";
        this.board = new Array(9).fill(null);
    }

    playerTurn(){
        if(this.player === "X"){
            this.player = "O";
        }else{
            this.player = "X";
        }
    }

    move(num){
        if(this.isGameOver()){
            return; 
        }

        if(this.board[num]){
            return;
        }

        this.board[num] = this.player;

        if(!this.findValidCombination()){
            this.playerTurn(); 
        }
        
    }

    findValidCombination(){
        const validCombinations =[
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,4,8],
            [2,4,6],
            [0,3,6],
            [1,4,7],
            [2,5,8]
        ];

        for (const comb of validCombinations) {
            const [a,b,c] = comb;

            if(this.board[a] && (this.board[a]===this.board[b] && this.board[a]===this.board[c])){
                return comb;
            }
        }
        return null; 
    }

    isGameOver(){
        return !!this.findValidCombination() || !this.board.includes(null);
    }

    cleanBoard(){
        this.board.fill(null);
    }

}