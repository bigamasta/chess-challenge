/**
 * Created by BigaMasta on 3/8/16.
 */
import AlphabetArrayGenerator from './AlphabetArrayGenerator';
import GameConstants from '../constants/GameConstants';
/**
 * Encapsulates the positioning logic.
 */
export default class Positioner {
  /**
   * rowNo:  0  ->  8 x x x x x x x x
   * rowNo:  1  ->  7 x x x x x x x x
   * rowNo:  2  ->  6 x x x x x x x x
   * rowNo:  3  ->  5 x x x x x x x x
   * rowNo:  4  ->  4 x x x x x x x x
   * rowNo:  5  ->  3 x x x x x x x x
   * rowNo:  6  ->  2 x x x x x x x x
   * rowNo:  7  ->  1 x x x x x x x x
   *                  A B C D E F G H
   *
   *                  | | | | | | | |
   *          colNo:  0 1 2 3 4 5 6 7
   * @param rowNo number of the column.
   * @param columnNo number of the column.
   * @param chesssboardSize size of the chessboard
   * @returns {*} the position calculated by the rowNo and columnNo
     */
  static positionOf(rowNo, columnNo, chesssboardSize) {
    const lettersArray = AlphabetArrayGenerator.generateAlphabetArray();
    return `${lettersArray[columnNo]}${chesssboardSize-rowNo}`;
  }

  static getAllPositions() {
    const size = GameConstants.CHESSBOARD_SIZE;
    const loopArray = [...Array(GameConstants.CHESSBOARD_SIZE)];
    const positionsArray = [];
    loopArray.map((x, rowNo) => {
      loopArray.map((y, columnNo) => {
        positionsArray.push(Positioner.positionOf(rowNo, columnNo, size));
      })
    });
    return positionsArray;
  }
}
