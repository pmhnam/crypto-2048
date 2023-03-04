// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract GameBoard {
    uint8[4][4] board;
    uint256 score;

    struct Game {
        uint8[4][4] board;
        uint256 score;
    }

    function newGame() public returns (string memory) {
        for (uint8 i = 0; i < 4; i++) {
            for (uint8 j = 0; j < 4; j++) {
                board[i][j] = 0;
            }
        }
        score = 0;
        addRandomTile();
        addRandomTile();
        return 'Hello world!';
    }

    
    function moveLeft() public {
        for (uint i = 0; i < 4; i++) {
            for (uint j = 1; j < 4; j++) {
                if (board[i][j] != 0) {
                    uint k = j;
                    while (k > 0 && board[i][k-1] == 0) {
                        board[i][k-1] = board[i][k];
                        board[i][k] = 0;
                        k--;
                    }
                    if (k > 0 && board[i][k-1] == board[i][k]) {
                        board[i][k-1] = board[i][k-1] * 2;
                        score += board[i][k-1];
                        board[i][k] = 0;
                    }
                }
            }
        }
        addRandomTile();
        addRandomTile();
    }

    function moveRight() public {
        for (uint i = 0; i < 4; i++) {
            for (uint j = 2; j >= 0 ; j--) {
                if (board[i][j] != 0) {
                    uint k = j;
                    while (k < 3 && board[i][k+1] == 0) {
                        board[i][k+1] = board[i][k];
                        board[i][k] = 0;
                        k++;
                    }
                    if (k < 3 && board[i][k+1] == board[i][k]) {
                        board[i][k+1] = board[i][k+1] * 2;
                        score += board[i][k+1];
                        board[i][k] = 0;
                    }
                }
            }
        }
        addRandomTile();
        addRandomTile();
    }
    
    // Implement other move functions (moveRight, moveUp, moveDown) similarly
    
    function getBoard() public view returns (uint8[4][4] memory) {
        return board;
    }
    
    function getScore() public view returns (uint256) {
        return score;
    }

    function addRandomTile() private {
        uint8 emptyCount = 0;
        for (uint8 i = 0; i < 4; i++) {
            for (uint8 j = 0; j < 4; j++) {
                if (board[i][j] == 0) {
                    emptyCount++;
                }
            }
        }
        if (emptyCount == 0) {
            return;
        }
        uint8 tileIndex = uint8(block.timestamp % emptyCount) + 1;
        emptyCount = 0;
        for (uint8 i = 0; i < 4; i++) {
            for (uint8 j = 0; j < 4; j++) {
                if (board[i][j] == 0) {
                    emptyCount++;
                    if (emptyCount == tileIndex) {
                        board[i][j] = 2;
                        return;
                    }
                }
            }
        }
    }
}