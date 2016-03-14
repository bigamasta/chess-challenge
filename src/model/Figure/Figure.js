/**
 * Created by BigaMasta on 3/8/16.
 */
import uuid from 'uuid';
/**
 * Figure objects class to serve objects to be stored in FigureStore.
 */
export default class Figure {

  /**
   * @param pos the position of the figure in the chessboard.
   * @param color the color of the figure.
   * @param whose the identifier of whose the figure is.
     */
  constructor(pos, color, whose) {
    this.id = uuid.v4();
    this.pos = pos;
    this.color = color;
    this.whose = whose;
  }

  /**
   * @returns {Array} of possible positions of tiles, where the figure can move.
     */
  getPossibleMoves() {
    return [];
  }

  /**
   * Returns the JSX for this figure.
   * @returns {JSX}
     */
  getRenderable() {
    return (<a></a>);
  }
};

