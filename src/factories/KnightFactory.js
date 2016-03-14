/**
 * Created by BigaMasta on 3/8/16.
 */
import Knight from '../model/Figure/Knight';
/**
 * Factory method pattern for creating Knights.
 */
export default class KnightFactory {
  /**
   * Creates a new Knight object.
   * @param pos the position in the chessboard.
   * @param color the color of the knight, see FigureColors.
   * @returns {Knight} the new Knight object.
     */
  static create(pos, color, whose) {
    return new Knight(pos, color, whose);
  }
};
