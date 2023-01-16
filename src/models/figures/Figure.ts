import logo from '../../assets/white.png'
import {Colors} from "../Colors";
import {Cell} from "../Cell";
import {Board} from "../Board";

export class Figure {
  color: Colors;
  logo: typeof logo | undefined;
  cell: Cell;
  id: number;
  queenX: number;
  queenY: number;
  isQueen: boolean;


  constructor(color: Colors, cell: Cell, x: number, y: number) {
    this.color = color;
    this.cell = cell;
    this.cell.figure = this;
    this.logo = undefined;
    this.id = Math.random()
    this.queenX = x;
    this.queenY = y;
    this.isQueen = false;
  }

  canMove(target: Cell, board: Board) : boolean {
    return !target.figure;
  }

  moveFigure(target: Cell) {}
}
