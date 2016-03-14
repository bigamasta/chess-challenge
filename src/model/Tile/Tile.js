/**
 * Created by BigaMasta on 3/11/16.
 */
import uuid from 'uuid';
/**
 * The Tile object that encapsulates all tile specific logic.
 */
export default class Tile {
  constructor(pos) {
    this.id = uuid.v4();
    this.pos = pos;
    //tile is not highlighted by default
    this.highlighted = false;
  }
}
