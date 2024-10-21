let moves = 0;

const gameboard = function (){
    /** @param {number} size size of the board */
    function createBoard(size){ 
        return Array.from({ length: size }, () => Array(size).fill(null)); 
    }
    function printBoard(board){
        for(let i = 0; i < board.length; i++){
            console.log(board[i]);
        }
    }
    function updateBoard(board, player, x, y){
        if( x < 0 || y < 0 || x >= board.length || y >= board.length){
            alert(`Invalid move try again out of bounds ${x} ${y}`);
            return;
        }
        if(board[x][y] !== null){
            alert(`Invalid move try again already taken by ${board[x][y]}`);
            return;
        }
        board[x][y] = player;
    }
    function resetBoard(board){
        for(let i = 0; i < board.length; i++){
            for(let j = 0; j < board.length; j++){
                board[i][j] = null;
            }
        }
        moves = 0;
        setTimeout(() => {alert('Game reset')}, 0);
        renderBoard();
    }
    return {createBoard, printBoard, updateBoard, resetBoard};
}();

const board = gameboard.createBoard(3);
let player1 = createPlayer('X').name;
let player2 = createPlayer('O').name;

function createPlayer(name){
    return { name };
}

function checkForWinner(gameboard){
    for(let i = 0; i < gameboard.length; i++){
        for(let j = 0; j < gameboard.length; j++){
            const winner = gameboard[i][j];
            if(winner === null) continue;
            // check for horizontal and vertical wins
            if(i + 2 < gameboard.length && gameboard[i][j] === gameboard[i + 1][j] && gameboard[i][j] === gameboard[i + 2][j]){
                return winner;
            }
            if(j + 2 < gameboard.length && gameboard[i][j] === gameboard[i][j + 1] && gameboard[i][j] === gameboard[i][j + 2]){
                return winner;
            }
            // check for downward right diagonal wins
            if(i + 2 < gameboard.length && j + 2 < gameboard.length && gameboard[i][j] === gameboard[i + 1][j + 1] && gameboard[i][j] === gameboard[i + 2][j + 2]){
                return winner;
            }
            // check for downward left diagonal wins
            if(i + 2 < gameboard.length && j - 2 >= 0 && gameboard[i][j] === gameboard[i + 1][j - 1] && gameboard[i][j] === gameboard[i + 2][j - 2]){
                return winner;
            }
        }
    }
    return null;
}



function checkForTie(gameboard){
    return gameboard.every(row => row.every(cell => cell !== null));
}


function renderBoard(){
    const gameboardDiv = document.querySelector(".gameboard");
    gameboardDiv.innerHTML = '';
    board.forEach((row, rowIdx) => {
        const rowElement = document.createElement('div');
        rowElement.classList.add('row');
        row.forEach((cell, colIdx) => {
            const cellElement = document.createElement('span');
            cellElement.classList.add('cell');
            cellElement.textContent = cell;
            rowElement.appendChild(cellElement);
            cellElement.addEventListener('click', () => {
                handleBoardCellClick(cellElement, rowIdx, colIdx);
                const winner = checkForWinner(board);
                if(winner){
                    setTimeout(() => {
                        alert(`${winner} wins`);
                        gameboard.resetBoard(board);
                    }, 0);
                    return;
                }
                if(checkForTie(board)){
                    setTimeout(() => {
                        alert('Tie');
                        gameboard.resetBoard(board);
                    }, 0);
                    return;
                }
            });
        });
        gameboardDiv.appendChild(rowElement);
    });
}

function handleBoardCellClick(cellElement, xPos, yPos){
    if(cellElement.textContent !== ''){
        alert('Invalid move');
        return;
    }
    const currentPlayer = moves % 2 === 0 ? player1 : player2;
    gameboard.updateBoard(board, currentPlayer, xPos, yPos);
    cellElement.textContent = (currentPlayer.length > 3) ? currentPlayer.substring(0, 3).concat("..") : currentPlayer;
    moves++;
   
}

function handleResetGameButtonClick(){
    gameboard.resetBoard(board);
}
function handleEnterPlayerNames(){
    const dialog = document.getElementById('player-names-dialog');
    dialog.showModal();
    const form = document.getElementById('player-names-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        player1 = createPlayer(formData.get('player-one-name')).name;
        player2 = createPlayer(formData.get('player-two-name')).name;
        loadPlayersInUI();
        gameboard.resetBoard(board);
        dialog.close();
    });
}

function loadPlayersInUI(){
    const player1Element = document.getElementsByClassName('player-one')[0];
    player1Element.textContent = player1;
    const player2Element = document.getElementsByClassName('player-two')[0];
    player2Element.textContent = player2;
}


renderBoard();
loadPlayersInUI();