const board = document.querySelector('.board');

let gameState = {
    board: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ]
};

function renderBoard() {
    board.innerHTML = '';
    gameState.board.forEach(row => {
        row.forEach(value => {
            const tile = document.createElement('div');
            tile.className = 'tile tile-' + value;
            tile.textContent = value > 0 ? value : '';
            board.appendChild(tile);
        });
    });
}

renderBoard();

document.addEventListener('keydown', event => {
    let direction;
    switch (event.key) {
        case 'ArrowUp':
            direction = 'up';
            break;
        case 'ArrowDown':
            direction = 'down';
            break;
        case 'ArrowLeft':
            direction = 'left';
            break;
        case 'ArrowRight':
            direction = 'right';
            break;
        default:
            return;
    }
    axios.post('/api/move', { direction })
        .then(response => {
            if (response.data.success) {
                axios.get('/api/board')
                    .then(response => {
                        gameState = response.data;
                        renderBoard();
                    })
                    .catch(error => console.error(error));
            }
        })
        .catch(error => console.error(error));
}); 
