document.addEventListener('DOMContentLoaded', () => {
    const boardSize = 5;
    const gameBoard = document.getElementById('game-board');
    const turnDisplay = document.getElementById('turn-display');
    const historyDisplay = document.getElementById('history-display');
    let selectedCell = null;
    let currentPlayer = 'A'; // Start with Player A
    let moveHistory = []; // Array to store move history

    // Initialize the game board
    for (let i = 0; i < boardSize * boardSize; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        gameBoard.appendChild(cell);
    }

    // Define initial positions and names for each player
    const initialPositions = {
        A: { indices: [0, 1, 2, 3, 4], names: ['A-P1', 'A-P2', 'A-H1', 'A-H2', 'A-H3'] },
        B: { indices: [20, 21, 22, 23, 24], names: ['B-P1', 'B-P2', 'B-H1', 'B-H2', 'B-H3'] }
    };

    // Place pieces on the board for Player A and Player B
    initialPositions.A.indices.forEach((index, i) => {
        const cell = gameBoard.children[index];
        cell.textContent = initialPositions.A.names[i];
        cell.classList.add('occupied');
        cell.dataset.player = 'A';
    });

    initialPositions.B.indices.forEach((index, i) => {
        const cell = gameBoard.children[index];
        cell.textContent = initialPositions.B.names[i];
        cell.classList.add('occupied');
        cell.dataset.player = 'B';
    });

    // Handle cell click
    gameBoard.addEventListener('click', (event) => {
        const cell = event.target;
        if (!cell.classList.contains('cell')) return;

        if (selectedCell) {
            if (cell !== selectedCell && !cell.classList.contains('occupied')) {
                if (movePiece(selectedCell, cell)) {
                    updateHistory(selectedCell, cell, currentPlayer);
                    changeTurn();
                }
            }
            selectedCell.classList.remove('selected');
            selectedCell = null;
        } else {
            if (cell.classList.contains('occupied') && cell.dataset.player === currentPlayer) {
                selectedCell = cell;
                selectedCell.classList.add('selected');
            }
        }
    });

    // Move piece from one cell to another
    function movePiece(fromCell, toCell) {
        toCell.textContent = fromCell.textContent;
        toCell.classList.add('occupied');
        toCell.dataset.player = fromCell.dataset.player;
        fromCell.textContent = '';
        fromCell.classList.remove('occupied');
        fromCell.removeAttribute('data-player');
        return true;
    }

    // Change turn
    function changeTurn() {
        currentPlayer = currentPlayer === 'A' ? 'B' : 'A';
        turnDisplay.textContent = `Current Turn: Player ${currentPlayer}`;
    }

    // Update history
    function updateHistory(fromCell, toCell, player) {
        const move = {
            from: fromCell.dataset.index,
            to: toCell.dataset.index,
            player: player,  // Capture the current player correctly
            piece: fromCell.textContent
        };
        moveHistory.push(move);
        displayHistory();
    }

    // Display history
    function displayHistory() {
        historyDisplay.innerHTML = moveHistory.map((move, index) => 
            `<p>Move ${index + 1}: Player ${move.player} moved ${move.piece} from ${move.from} to ${move.to}</p>`
        ).join('');
    }
});
