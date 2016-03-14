/**
 * Created by BigaMasta on 3/13/16.
 */
import alt from '../alt';
import ChessboardActions from '../actions/ChessboardActions';
import GameConstants from '../constants/GameConstants.js';
import TileFactory from '../factories/TileFactory.js';
import FigureColors from '../constants/FigureColors.js';
import FigureActions from '../actions/FigureActions.js';
import TileActions from '../actions/TileActions.js';
import Positioner from '../utils/Positioner.js';
class ChessboardStore {
  constructor() {
    this.bindActions(ChessboardActions);
  }
}
export default alt.createStore(ChessboardStore, 'ChessboardStore');
