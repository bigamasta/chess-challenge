/**
 * Created by BigaMasta on 3/5/16.
 */
import alt from '../alt';
import FigureColors from '../constants/FigureColors';
import AppActions from '../actions/AppActions';
import FigureTypes from '../constants/FigureTypes';

class AppStore {
  constructor() {
    this.bindActions(AppActions);
    this.playerColorPreference = FigureColors.BLACK;
    this.mode = FigureTypes.FOOTMAN;
  }

  footmanMode() {
    this.setState({mode: FigureTypes.FOOTMAN});
  }

  knightMode() {
    this.setState({mode: FigureTypes.KNIGHT});
  }

}

export default alt.createStore(AppStore, 'AppStore');
