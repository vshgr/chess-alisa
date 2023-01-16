import {Cell} from "./Cell";
import {Colors} from "./Colors";
import {Chess} from "./figures/Chess";
import {Figure} from "./figures/Figure";
import {Player} from "./Player";

export class Board {
    cells: Cell[][] = []
    lostBlackPlayer: Figure[] = []
    lostWhitePlayer: Figure[] = []
    lostGreenPlayer: Figure[] = []
    lostRedPlayer: Figure[] = []
    currentPlayer: Player

    constructor(player: Player) {
        this.currentPlayer = player

    }
    public initCells() {
        for (let i = 0; i < 6; i++) {
            const row: Cell[] = []
            for (let j = 0; j < 6; j++) {
                row.push(new Cell(this, j, i, null))
            }
            this.cells.push(row);
        }
    }

    public getCopyBoard(): Board {
        const newBoard = new Board(this.currentPlayer);
        newBoard.cells = this.cells;
        newBoard.lostWhitePlayer = this.lostWhitePlayer
        newBoard.lostBlackPlayer = this.lostBlackPlayer
        newBoard.lostRedPlayer = this.lostRedPlayer
        newBoard.lostGreenPlayer = this.lostGreenPlayer
        return newBoard;
    }

    public highlightCells(selectedCell: Cell | null) {
        for (let i = 0; i < this.cells.length; i++) {
            const row = this.cells[i];
            for (let j = 0; j < row.length; j++) {
                const target = row[j];
                target.available = !!selectedCell?.figure?.canMove(target, this)
            }
        }
    }

    public getCell(x: number, y: number) {
        return this.cells[y][x]
    }

    private addWhiteChess() {
        new Chess(Colors.WHITE, this.getCell(0, 0))
        new Chess(Colors.WHITE, this.getCell(0, 1))
        new Chess(Colors.WHITE, this.getCell(0, 2))
        new Chess(Colors.WHITE, this.getCell(1, 0))
        new Chess(Colors.WHITE, this.getCell(2, 0))
        new Chess(Colors.WHITE, this.getCell(1, 1))
    }

    private addBlackChess() {
        new Chess(Colors.BLACK, this.getCell(0, 3))
        new Chess(Colors.BLACK, this.getCell(0, 4))
        new Chess(Colors.BLACK, this.getCell(0, 5))
        new Chess(Colors.BLACK, this.getCell(2, 5))
        new Chess(Colors.BLACK, this.getCell(1, 4))
        new Chess(Colors.BLACK, this.getCell(1, 5))
    }

    private addRedChess() {
        new Chess(Colors.RED, this.getCell(3, 0))
        new Chess(Colors.RED, this.getCell(4, 0))
        new Chess(Colors.RED, this.getCell(5, 0))
        new Chess(Colors.RED, this.getCell(4, 1))
        new Chess(Colors.RED, this.getCell(5, 1))
        new Chess(Colors.RED, this.getCell(5, 2))
    }

    private addGreenChess() {
        new Chess(Colors.GREEN, this.getCell(5, 3))
        new Chess(Colors.GREEN, this.getCell(5, 4))
        new Chess(Colors.GREEN, this.getCell(5, 5))
        new Chess(Colors.GREEN, this.getCell(3, 5))
        new Chess(Colors.GREEN, this.getCell(4, 5))
        new Chess(Colors.GREEN, this.getCell(4, 4))
    }

    public addFigures() {
        this.addBlackChess()
        this.addWhiteChess()
        this.addRedChess()
        this.addGreenChess()
    }
}
