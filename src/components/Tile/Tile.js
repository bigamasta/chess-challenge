/**
 * Created by BigaMasta on 3/2/16.
 */
import React from 'react';
import Figure from '../Figure/Figure';
import uuid from 'uuid';
import styles from './Tile.css';
import withStyles from '../../decorators/withStyles';

import { Droppable, Draggable } from 'react-drag-and-drop';

import FigureStore from '../../stores/FigureStore';
import FigureActions from '../../actions/FigureActions';

import TileActions from '../../actions/TileActions';
import TileStore from '../../stores/TileStore';

import Knight from '../../model/Figure/Knight';

@withStyles(styles)
class Tile extends React.Component {

  constructor(props) {
    super(props);
  }

  static propTypes = {
    position: React.PropTypes.string.isRequired,
    optionalFigure: React.PropTypes.instanceOf(Figure)
  };

  componentDidMount() {
    TileStore.listen(this.storeChanged);
  }

  componentWillUnmount() {
    TileStore.unlisten(this.storeChanged);
  }

  storeChanged = (state) => {
    this.setState(state);
  };

  render() {
    if (this.props.figure)
      return this.renderWithFigure();
    else
      return this.renderWithoutFigure();
  }

  renderWithFigure = () => {
    const tilePosition = this.props.position;
    const figureId = this.props.figure.id;
    return (
      <td id={tilePosition}>
          <Draggable
            type="figure" data={figureId}
            onDragStart={this.handleDragStart.bind(this)}
            onDragEnd={this.handleDragEnd.bind(this)}
          >
            <Figure key={uuid.v4()} id={figureId}/>
          </Draggable>
      </td>
    );
  };

  renderWithoutFigure = () => {
    const tilePosition = this.props.position;
    return <td id={tilePosition}>
      <Droppable
        types={['figure']}
        onDrop={this.handleDrop.bind(this)}
        key={uuid.v4()}
      >
        <a data-pos={tilePosition} className={TileStore.isTileHighlighted(tilePosition) ? "highlight" : "not-highlighted"}></a>
      </Droppable>
    </td>
  };

  handleDrop(data, event) {
    let dropPos = event.target.getAttribute("data-pos");
    let draggedFigure = FigureStore.getFigureById(data.figure);
    if (draggedFigure && TileStore.isTileHighlighted(dropPos)) {
      draggedFigure.pos = dropPos;
      FigureActions.update(draggedFigure);
    }
    TileActions.unhighlightTiles();
  }

  handleDragStart(event) {
    const figureId = event.target.getAttribute("data");
    const figure = FigureStore.getFigureById(figureId);
    const possibleMovesToHighlight = figure.getPossibleMoves();
    TileActions.highlightTilesAt(possibleMovesToHighlight);
  }

  handleDragEnd(event) {
    TileActions.unhighlightTiles();
  }
}

export default Tile;
