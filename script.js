const Player = (sign) => {
    const getSign = () => {
        return sign;
    }

    return { getSign };
}

const gameBoard = (() => {
    const board = ['','','','','','','','',''];

    const setField = (index, sign) => {
        if(index > board.length) return;
        board[index] = sign;
    }

    const getField = (index) => {
        if(index > board.length) return;
        return board[index];
    }

    const reset = () => {
        for (let i=0; i<board.length; i++) {
            board[i] = '';
        }
    }
    return { setField, getField, reset };
 })();

 const gameController = (() => {
    const playerX = Player('X');
    const playerO = Player('O');

    let round = 1;
    let isOver = false;

    const getIsOver = () => {
        return isOver;
    }

    const getPlayerSign = () => {
        if (round % 2 === 1) return playerX.getSign();
        else return playerO.getSign();
    }

    const increaseRound = () => {
        round++;
    }

    const reset = () => {
        round = 1;
        isOver = false;
    }

    return { getIsOver, getPlayerSign, increaseRound, reset };
})();



const displayController = (() => {
    const fieldElements = document.querySelectorAll('.field');
    const messageElement = document.querySelector('#message');
    const restartButton = document.querySelector('#restart-button');

    fieldElements.forEach(field => {
        field.addEventListener('click', (e) => {
            if(gameController.getIsOver() || e.target.textContent !== '') return;
            gameBoard.setField(parseInt(e.target.dataset.index), gameController.getPlayerSign());
            updateGameboard();
            gameController.increaseRound();
            updateMessage();
        })
    })

    restartButton.addEventListener('click', () => {
        gameBoard.reset();
        gameController.reset();
        updateGameboard();
        updateMessage();
    })

    const updateGameboard = () => {
        for (let i = 0; i < fieldElements.length; i++) {
            fieldElements[i].textContent = gameBoard.getField(i);
          }
    }

    const updateMessage = () => {
        messageElement.textContent = `Player ${gameController.getPlayerSign()} turn`;
    }
})();






