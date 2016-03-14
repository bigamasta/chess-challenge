/**
 * Created by BigaMasta on 3/5/16.
 */
import alt from '../alt';
import TileActions from '../actions/TileActions';
import Tile from '../model/Tile/Tile.js';

class TileStore {
  constructor() {
    this.bindActions(TileActions);

    this.tiles = [];

    this.exportPublicMethods({
      getHighlightedTiles: this.getHighlightedTiles.bind(this),
      isTileHighlighted: this.isTileHighlighted.bind(this)
    });
  }

  create(tile) {
    if (!(tile instanceof Tile)) {
      throw new TypeError("The parameter figure is not of type Figure");
    }

    const tiles = this.tiles;

    this.setState({
      tiles: tiles.concat(tile)
    });
  }

  isTileHighlighted(position) {
    return (this.tiles.filter(tile => {
      return ((position === tile.pos)
        && (tile.highlighted === true));
    }).length > 0);
  }

  getHighlightedTiles() {
    return this.tiles.filter(tile => {
      return tile.highlighted === true;
    });
  }

  /**
   * Highlightes all tiles at positions given.
   * @param {Array} tilesPositions e.g. ['A1', 'A2', 'B3', 'D7']
     */
  highlightTilesAt(tilesPositions) {
    const tiles = this.tiles.map(tile => {
      if (tilesPositions.indexOf(tile.pos) > -1) {
        let highlightedTile = tile;
        highlightedTile.highlighted = true;
        return highlightedTile;
      }
      return tile;
    });
    this.setState({tiles});
  }

  /**
   * Unhighlightes all tiles.
   */
  unhighlightTiles() {
    const tiles = this.tiles.map(tile => {
      tile.highlighted = false;
      return tile;
    });
    this.setState({tiles});
  }
}

export default alt.createStore(TileStore, 'TileStore');
