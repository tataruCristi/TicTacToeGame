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

    const playRound = (fieldIndex) => {
        gameBoard.setField(fieldIndex, getPlayerSign());
        if(checkWinner(fieldIndex)) {
            displayController.setResultMessage(getPlayerSign())
            isOver = true;
            round = 1;
            return;
        }
        if(round === 9) {
            displayController.setResultMessage("Draw");
            isOver = true;
            round = 1;
            return;
        }
        round++;
        displayController.updateMessage();
    }

    const checkWinner = (fieldIndex) => {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
          ];

          return winConditions
      .filter((combination) => combination.includes(fieldIndex))
      .some((possibleCombination) =>
        possibleCombination.every(
          (index) => gameBoard.getField(index) === getPlayerSign()
        )
      );
    }

    const reset = () => {
        round = 1;
        isOver = false;
    }

    return { getIsOver, getPlayerSign, reset, playRound };
})();



const displayController = (() => {
    const fieldElements = document.querySelectorAll('.field');
    const messageElement = document.querySelector('#message');
    const restartButton = document.querySelector('#restart-button');

    fieldElements.forEach(field => {
        field.addEventListener('click', (e) => {
            if(gameController.getIsOver() || e.target.textContent !== '') return;
            gameBoard.setField(parseInt(e.target.dataset.index), gameController.getPlayerSign());
            gameController.playRound(parseInt(e.target.dataset.index));
            updateGameboard();
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

    const setResultMessage = (winner) => {
        if(winner === "Draw") {
            messageElement.textContent = "It's a draw!"; 
        } else {
            messageElement.textContent = `Player ${winner} has won!`;
        }
    }

    const updateMessage = () => {
        messageElement.textContent = `Player ${gameController.getPlayerSign()} turn`;
    }

    return { setResultMessage, updateMessage }
})();






