import {Colors} from "./Colors";
import {Figure} from "./figures/Figure";
import {Board} from "./Board";

import whiteQueen from "../assets/white_queen.png";
import blackQueen from "../assets/black_queen.png";
import greenQueen from "../assets/green_queen.png";
import redQueen from "../assets/red_queen.png";


export class Cell {
    readonly x: number;
    readonly y: number;
    figure: Figure | null;
    board: Board;
    available: boolean;
    id: number;
    lostCell: Cell | null

    constructor(board: Board, x: number, y: number, figure: Figure | null) {
        this.x = x;
        this.y = y;
        this.figure = figure;
        this.board = board;
        this.available = false;
        this.id = Math.random()
        this.lostCell = null
    }

    isEmpty(): boolean {
        return this.figure === null;
    }

    isEnemy(target: Cell): boolean {
        if (target.figure) {
            return this.figure?.color !== target.figure.color;
        }
        return false;
    }

    isEmptyVertical(target: Cell): boolean {
        if (this.x !== target.x) {
            return false;
        }

        const min = Math.min(this.y, target.y);
        const max = Math.max(this.y, target.y);
        for (let y = min + 1; y < max; y++) {
            if (!this.board.getCell(this.x, y).isEmpty()) {
                return false
            }
        }
        return true;
    }

    isEmptyHorizontal(target: Cell): boolean {
        if (this.y !== target.y) {
            return false;
        }

        const min = Math.min(this.x, target.x);
        const max = Math.max(this.x, target.x);
        for (let x = min + 1; x < max; x++) {
            if (!this.board.getCell(x, this.y).isEmpty()) {
                return false
            }
        }
        return true;
    }

    setFigure(figure: Figure) {
        this.figure = figure;
        this.figure.cell = this;
    }

    addLostFigure(figure: Figure) {
        if (this.figure)
            switch (this.figure.color) {
                case Colors.BLACK:
                    this.board.lostBlackPlayer.push(figure)
                    break
                case Colors.WHITE:
                    this.board.lostWhitePlayer.push(figure)
                    break
                case Colors.GREEN:
                    this.board.lostGreenPlayer.push(figure)
                    break
                case Colors.RED:
                    this.board.lostRedPlayer.push(figure)
                    break
            }
    }

    moveFigure(target: Cell) {
        this.resetLost()
        if (this.figure && this.figure?.canMove(target, this.board)) {
            this.figure.moveFigure(target)
            if (target.lostCell && target.lostCell.figure) {
                this.addLostFigure(target.lostCell.figure)
                target.lostCell.figure = null
                target.lostCell = null
            }
            target.setFigure(this.figure)
            if (target.x == this.figure.queenX && target.y == this.figure.queenY) {
                this.figure.logo = this.getQueen(this.figure.color)
                this.figure.isQueen = true
            }
            this.figure = null;
        }
    }

    resetLost() {
        for(let i=0; i<6; i++){
            for (let j=0 ;j<6; j++){
                this.board.cells[i][j].lostCell = null
            }
        }
    }

    getQueen(color: Colors) {
        switch (color) {
            case Colors.WHITE:
                return whiteQueen
            case Colors.RED:
                return redQueen
            case Colors.GREEN:
                return greenQueen
            case Colors.BLACK:
                return blackQueen
        }
    }
}
