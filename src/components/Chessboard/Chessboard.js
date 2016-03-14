/**
 * Created by BigaMasta on 3/2/16.
 */
import React from 'react';
import Tile from '../Tile/Tile';
import styles from './Chessboard.css';
import withStyles from '../../decorators/withStyles';
import uuid from 'uuid';
import alt from '../../alt';

import FigureStore from '../../stores/FigureStore';
import FigureActions from '../../actions/FigureActions';
import TileActions from '../../actions/TileActions';
import ChessboardActions from '../../actions/ChessboardActions';
import ChessboardStore from '../../stores/ChessboardStore';

import KnightFactory from '../../factories/KnightFactory';
import Knight from '../../model/Figure/Knight';
import FootmanFactory from '../../factories/FootmanFactory';
import GameConstants from '../../constants/GameConstants';
import TileFactory from '../../factories/TileFactory';

import Positioner from '../../utils/Positioner';
import FigureColors from '../../constants/FigureColors';
import FigureTypes from '../../constants/FigureTypes';

@withStyles(styles)
class Chessboard extends React.Component {
  constructor(props) {
    super(props);
    this._createFigures(this.props.mode);
    this._createTiles();
  }

  static propTypes = {
    playerColorPreference: React.PropTypes.string.isRequired
  };

  componentDidMount() {
    FigureStore.listen(this.storeChanged);
  }

  componentWillUnmount() {
    FigureStore.unlisten(this.storeChanged);
  }

  storeChanged = (state) => {
    this.setState(state);
  };

  render() {
    const size = GameConstants.CHESSBOARD_SIZE;
    const figuresMap = FigureStore.getFiguresMap();
    const loopArray = [...Array(size)];

    return (
      <div>
        <table id="chess_board">
          <tbody>
            {loopArray.map((x, rowNo) =>
              <tr key={rowNo}>
                {loopArray.map((y, columnNo) => {
                  const position = Positioner.positionOf(rowNo, columnNo, size);
                  return <Tile
                    key={position}
                    position={position}
                    figure={figuresMap.get(position)}
                  />;
                })}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }

  /**
   * Creates tiles for the chessboard.
   * @private
     */
  _createTiles() {
    const size = GameConstants.CHESSBOARD_SIZE;
    const loopArray = [...Array(GameConstants.CHESSBOARD_SIZE)];
    loopArray.map((x, rowNo) => {
      loopArray.map((y, columnNo) => {
        const position = Positioner.positionOf(rowNo, columnNo, size);
        const tile = TileFactory.create(position);
        TileActions.create(tile);
      })
    });
  }

  /**
   * Creates figures for the chessboard.
   * @private
     */
  _createFigures(mode) {
    const position = Positioner.positionOf(0, 0, GameConstants.CHESSBOARD_SIZE);
    let figure;
    if (mode == FigureTypes.KNIGHT) {
      figure = KnightFactory.create(position, FigureColors.BLACK);
    }
    else if (mode == FigureTypes.FOOTMAN) {
      figure = FootmanFactory.create(position, FigureColors.WHITE);
    }
    else {
      figure = FootmanFactory.create(position, FigureColors.WHITE);
    }

    FigureActions.create(figure);
  }
}

export default Chessboard;
