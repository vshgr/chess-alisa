import {Colors} from "./Colors";

export class Player {
  color: Colors;
  rusTitle: string
  engTitle: string
  currentTitle: string
  figuresCount: number


  constructor(color: Colors, rus: string, eng: string) {
    this.color = color
    this.rusTitle = rus
    this.engTitle = eng
    this.currentTitle = this.rusTitle
    this.figuresCount = 6
  }
}
