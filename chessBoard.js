class chessBoard {

    gameBoard = [];

    start() {

        for(let i = 0; i < 8; i++) {
            this.gameBoard.push([]);
            for(let j = 0; j < 8; j++) {
                this.gameBoard[i].push(0);
            }
        }
    }
    
    
    knightMove(start, destination) {
        
        const generateValidMove = (src) => {
            
            let [row, col] = src;
            
            const moveRule = [

                [row+1, col+2], [row+2, col+1], [row+1, col-2], [row+2, col-1],[row-1, col+2], [row-2, col+1], [row-1, col-2], [row-2, col-1]

            ]

            return moveRule.filter((arr) => {
                return (arr[0] >= 0 && arr[0] <= 7) && (arr[1] >= 0 && arr[1] <= 7);
            })

        }

        let q = [start];
        let visited = [start];
        let parents = {};

        const isVisited = (src) => {
            for(let i = 0; i < visited.length; i++) {
                if(src[0] === visited[i][0] && src[1] === visited[i][1]) {
                    return true;
                }
            }
            return false;
        }

        while(q.length > 0) {

            let deque = q.shift();
            
            if((deque[0] === destination[0]) && (deque[1] === destination[1])) {
                break;
            }

            const validMove = generateValidMove(deque);

            validMove.forEach((possibleMove) => {

                if(!isVisited(possibleMove)) {
                    visited.push(possibleMove);
                    q.push(possibleMove);
                    parents[possibleMove] = deque;
                }
            })
        }

        let shortestPath = [destination];
        let parent = 0;

        while(true) {
            if(!parents[shortestPath[parent]]) {
                break;
            }

            shortestPath.push(parents[shortestPath[parent]])
            parent++;
        }

        return shortestPath.reverse();
    }
}


export const game = new chessBoard();