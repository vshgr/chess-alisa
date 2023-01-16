import {Figure} from "./Figure";
import {Colors} from "../Colors";
import {Cell} from "../Cell";

import blackLogo from "../../assets/black.png";
import whiteLogo from "../../assets/white.png";
import redLogo from "../../assets/red.png";
import greenLogo from "../../assets/green.png";
import {Board} from "../Board";


export class Chess extends Figure {
    constructor(color: Colors, cell: Cell) {
        switch (color) {
            case Colors.BLACK:
                super(color, cell, 5, 0);
                this.logo = blackLogo
                break
            case Colors.GREEN:
                super(color, cell, 0, 0);
                this.logo = greenLogo
                break
            case Colors.RED:
                super(color, cell, 0, 5);
                this.logo = redLogo
                break
            case Colors.WHITE:
                super(color, cell, 5, 5);
                this.logo = whiteLogo
                break
        }
    }

    canMove(target: Cell, board: Board): boolean {
        if (!super.canMove(target, board))
            return false;

        let directionX = 1;
        let directionY = 1;

        switch (this.cell.figure?.color) {
            case Colors.BLACK:
                directionX = 1;
                directionY = -1;
                break
            case Colors.GREEN:
                directionX = -1;
                directionY = -1;
                break
            case Colors.RED:
                directionX = -1;
                directionY = 1;
                break
            case Colors.WHITE:
                directionX = 1;
                directionY = 1;
                break
        }

        let longDirectionX = directionX * 2
        let longDirectionY = directionY * 2

        let figure = false
        let availableQueenCells = []
        let cell = null

        if (this.isQueen) {
            for (let i = this.cell.x + 1; i < 6; i++) {
                if (!board.cells[this.cell.y][i].figure) {
                    if (figure) {
                        board.cells[this.cell.y][i].lostCell = cell
                    }
                    availableQueenCells.push(board.cells[this.cell.y][i])
                } else if (!figure && i < 5 && !board.cells[this.cell.y][i + 1].figure) {
                    if (this.cell.isEnemy(board.cells[this.cell.y][i])) {
                        availableQueenCells.push(board.cells[this.cell.y][i + 1])
                        figure = true
                        cell = board.cells[this.cell.y][i]
                        board.cells[this.cell.y][i + 1].lostCell = cell
                        i++
                    }
                } else {
                    break
                }
            }
            cell = null
            figure = false
            for (let i = this.cell.x - 1; i >= 0; i--) {
                if (!board.cells[this.cell.y][i].figure) {
                    if (figure) {
                        board.cells[this.cell.y][i].lostCell = cell
                    }
                    availableQueenCells.push(board.cells[this.cell.y][i])
                } else if (!figure && i > 0 && !board.cells[this.cell.y][i - 1].figure) {
                    if (this.cell.isEnemy(board.cells[this.cell.y][i])) {
                        availableQueenCells.push(board.cells[this.cell.y][i - 1])
                        figure = true
                        cell = board.cells[this.cell.y][i]
                        board.cells[this.cell.y][i - 1].lostCell = cell
                        i--
                    }
                } else {
                    break
                }
            }
            cell = null
            figure = false
            for (let j = this.cell.y + 1; j < 6; j++) {
                if (!board.cells[j][this.cell.x].figure) {
                    if (figure) {
                        board.cells[j][this.cell.x].lostCell = cell
                    }
                    availableQueenCells.push(board.cells[j][this.cell.x])
                } else if (!figure && j < 5 && !board.cells[j + 1][this.cell.x].figure) {
                    if (this.cell.isEnemy(board.cells[j][this.cell.x])) {
                        availableQueenCells.push(board.cells[j + 1][this.cell.x])
                        figure = true
                        cell = board.cells[j][this.cell.x]
                        board.cells[j + 1][this.cell.x].lostCell = cell
                        j++
                    }
                } else {
                    break
                }
            }
            cell = null
            figure = false
            for (let j = this.cell.y - 1; j >= 0; j--) {
                if (!board.cells[j][this.cell.x].figure) {
                    if (figure) {
                        board.cells[j][this.cell.x].lostCell = cell
                    }
                    availableQueenCells.push(board.cells[j][this.cell.x])
                } else if (!figure && j > 0 && !board.cells[j - 1][this.cell.x].figure) {
                    if (this.cell.isEnemy(board.cells[j][this.cell.x])) {
                        availableQueenCells.push(board.cells[j - 1][this.cell.x])
                        figure = true
                        cell = board.cells[j][this.cell.x]
                        board.cells[j - 1][this.cell.x].lostCell = cell
                    }
                } else {
                    break
                }
            }
        }

        if (availableQueenCells.includes(target)) {
            return true
        }

        if (target.x == this.cell.x + directionX && target.isEmpty() && target.y == this.cell.y) {
            return true;
        }

        if (target.y == this.cell.y + directionY && target.isEmpty() && target.x == this.cell.x) {
            return true;
        }
        if (target.x - longDirectionX >= 0 && target.x - longDirectionX < 6) {
            if (target.y == this.cell.y) {
                if (board.cells[target.y][target.x - directionX].figure &&
                    this.cell.isEnemy(board.cells[target.y][target.x - directionX])) {
                    if (board.cells[target.y][target.x - longDirectionX].figure &&
                        !this.cell.isEnemy(board.cells[target.y][target.x - longDirectionX])) {
                        target.lostCell = board.cells[target.y][target.x - directionX]
                        return true;
                    }
                }
            }
        }
        if (target.y - longDirectionY >= 0 && target.y - longDirectionY < 6) {
            if (target.x == this.cell.x) {
                if (board.cells[target.y - directionY][target.x].figure &&
                    this.cell.isEnemy(board.cells[target.y - directionY][target.x])) {
                    if (board.cells[target.y - longDirectionY][target.x].figure &&
                        !this.cell.isEnemy(board.cells[target.y - longDirectionY][target.x])) {
                        target.lostCell = board.cells[target.y - directionY][target.x]
                        return true;
                    }
                }
            }
        }

        return false;
    }
}
