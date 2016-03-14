/**
 * Created by BigaMasta on 3/8/16.
 */
import Footman from '../model/Figure/Footman';
/**
 * Factory method pattern for creating Knights.
 */
export default class FootmanFactory {
  /**
   * Creates a footman.
   * @param pos footman's position in chessboard.
   * @param color color of footman, see FigureColors.
   * @param whose whose figure it is, see WhoseConstants.
   * @returns {Footman} a new Footman object.
     */
  static create(pos, color, whose) {
    return new Footman(pos, color, whose);
  }
};

