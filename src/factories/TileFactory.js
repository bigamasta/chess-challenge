/**
 * Created by BigaMasta on 3/11/16.
 */
import Tile from '../model/Tile/Tile.js';
/**
 * Factory method pattern for creating Tiles.
 */
export default class TileFactory {

  /**
   * Created a tile with position passed as an argument.
   * @param pos position of the tile
   * @returns {Tile} created tile
     */
  static create(pos) {
    return new Tile(pos);
  }
};
