/**
 * Created by BigaMasta on 3/11/16.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import expect from 'expect';
import alt from '../../../alt.js';
import Knight from '../../../model/Figure/Knight';
import KnightFactory from '../../../factories/KnightFactory';
import FigureColors from '../../../constants/FigureColors';
import TestUtils from 'react-addons-test-utils';
import Figure from '../../Figure/Figure';
import Tile from '../Tile.js';
import FigureActions from '../../../actions/FigureActions.js';
import GameConstants from '../../../constants/GameConstants.js';
import TileActions from '../../../actions/TileActions.js';
import TileFactory from '../../../factories/TileFactory.js';
import Positioner from '../../../utils/Positioner.js';
import {Draggable, Droppable} from 'react-drag-and-drop';
import TileStore from '../../../stores/TileStore.js';
import WhoseConstants from '../../../constants/WhoseConstants.js';
import uuid from 'uuid';
describe('Tile (Component)', () => {

  const size = GameConstants.CHESSBOARD_SIZE;
  const loopArray = [...Array(size)];
  loopArray.map((x, rowNo) => {
    loopArray.map((y, columnNo) => {
      const position = Positioner.positionOf(rowNo, columnNo, size);
      const tile = TileFactory.create(position);
      TileActions.create(tile);
    })
  });
  const posA1 = Positioner.positionOf(7, 0, size);
  let figure = KnightFactory.create(posA1, FigureColors.BLACK);
  FigureActions.create(figure);

  let rendered = TestUtils.renderIntoDocument(
    <table id="chess_board">
      <tbody>
        <tr key={0}>
        </tr>
      </tbody>
    </table>
  );
  let trDOMElement = rendered.childNodes[0].childNodes[0];

  let tileComponent;

  beforeEach(() => {
    alt.flush();
  });

  afterEach(() => {
    if (tileComponent)
      ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(tileComponent).parentNode);
  });

  /**
   * Tests of tiles gets a little bit complicated because the Tile itself
   * needs to be inside a <table><tbody><tr></table></tbody></tr>.
   */
  it('can render with figure', () => {
    //create tile
    const position = Positioner.positionOf(0, 0, GameConstants.CHESSBOARD_SIZE);
    const tile = TileFactory.create(position);
    TileActions.create(tile);

    //create figure
    const posA1 = Positioner.positionOf(7, 0, size);
    const figure = KnightFactory.create(posA1, FigureColors.BLACK);
    FigureActions.create(figure);

    //render tile
    tileComponent = ReactDOM.render(<Tile
      key={position}
      position={position}
      figure={figure}
    />, trDOMElement);

    //Figure should be at a tile since it is on the same position as tile.
    const figureComponent = TestUtils.findRenderedComponentWithType(tileComponent, Figure);
    expect(figureComponent).toExist();
    const renderedTileComponent = TestUtils.findRenderedComponentWithType(tileComponent, Tile);
    expect(renderedTileComponent).toExist();

  });

  it('can render without figure', () => {
    //create tile
    const position = Positioner.positionOf(0, 0, GameConstants.CHESSBOARD_SIZE);
    const tile = TileFactory.create(position);
    TileActions.create(tile);

    //render tile
    tileComponent = ReactDOM.render(<Tile
      key={position}
      position={position}
      figure={undefined}
    />, trDOMElement);

    expect(
      () => TestUtils.findRenderedComponentWithType(tileComponent, Figure)
    ).toThrow(Error);
    const renderedTileComponent = TestUtils.findRenderedComponentWithType(tileComponent, Tile);
    expect(renderedTileComponent).toExist();
  });
});

/**
 * Given are two tiles:
 *  - One is with figure
 *  - Another one is without a figure. This is a tile where a figure can be dropped to.
 *
 * DOM for every drag and drop test:
 * <table id="chess_board">
 *   <tbody>
 *     <tr>
 *       <td id="A7">
 *         <div draggable="true" type="figure" data="909621ea-4421-49fa-abc7-3298fe4eae83">
 *           <a>♞</a>
 *         </div>
 *       </td>
 *     </tr>
 *     <tr>
 *       <td id="B7">
 *         <div class="Droppable">
 *           <a data-pos="B7" class="not-highlighted">
 *           </a>
 *         </div>
 *       </td>
 *     </tr>
 *   </tbody>
 * </table>
 */
describe('Drag and Drop', () => {
  const rendered = TestUtils.renderIntoDocument(
    <table id="chess_board">
      <tbody>
        <tr key={0}>
        </tr>
        <tr key={1}>
        </tr>
      </tbody>
    </table>
  );

  //root elements to add tiles to.
  let trElementForFirstTile = rendered.childNodes[0].childNodes[0];
  let trElementForSecondTile = rendered.childNodes[0].childNodes[1];

  //components for tiles
  let tileComponentWithFigure;
  let tileComponentWithoutFigure;

  //positions
  const position = Positioner.positionOf(7, 0, GameConstants.CHESSBOARD_SIZE);
  const positionForAnotherTile = Positioner.positionOf(5, 1, GameConstants.CHESSBOARD_SIZE);;

  //tiles and figure
  const tile = TileFactory.create(position);
  const anotherTile = TileFactory.create(positionForAnotherTile);
  const figure = KnightFactory.create(position, FigureColors.BLACK);

  beforeEach(() => {
    alt.flush();

    TileActions.create(tile);
    TileActions.create(anotherTile);
    FigureActions.create(figure);
    //render tiles
    tileComponentWithFigure = ReactDOM.render(<Tile
      key={position}
      position={position}
      figure={figure}
    />, trElementForFirstTile);

    tileComponentWithoutFigure = ReactDOM.render(<Tile
      key={positionForAnotherTile}
      position={positionForAnotherTile}
      figure={undefined}
    />, trElementForSecondTile);
  });

  afterEach(() => {
    if (tileComponentWithFigure)
      ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(tileComponentWithFigure).parentNode);
    if (tileComponentWithoutFigure)
      ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(tileComponentWithoutFigure).parentNode);
  });

  it('has a figure draggable', () => {
    const draggable = TestUtils.findRenderedComponentWithType(tileComponentWithFigure, Draggable);
    expect(draggable).toExist();
  });

  it('it is dropable when there\'s no figure on it', () => {
    const droppable = TestUtils.findRenderedComponentWithType(tileComponentWithoutFigure, Droppable);
    expect(droppable).toExist();
  });

  let DataTransfer = function() {
    this.types = ["figure"];
    this.setData = (type)=> {this.types.concat(type); };
    this.getData = (type) => {return figure.id};
    this.items = [{kind: "string", type: "figure"}];
    this.preventDefault = () => {};
  };

  it('unhighlights tiles when figure is dropped to a tile', () => {

    let dataTransfer = new DataTransfer();

    const mockEvent = {dataTransfer};
    const draggableComponent = TestUtils.findRenderedComponentWithType(tileComponentWithFigure, Draggable);
    const droppableComponent = TestUtils.findRenderedComponentWithType(tileComponentWithoutFigure, Droppable);
    const droppableDOMComponent = TestUtils.findRenderedDOMComponentWithClass(tileComponentWithoutFigure, 'not-highlighted');
    const draggableDOMComponent = ReactDOM.findDOMNode(draggableComponent);

    TestUtils.Simulate.dragStart(draggableDOMComponent, mockEvent);

    const tilesBefore = TileStore.getHighlightedTiles();
    expect(tilesBefore.length > 0).toBe(true);

    TestUtils.Simulate.dragOver(droppableComponent, mockEvent);

    //simulate onDrop by myself, didn't find the reason why TestUtils.Simulate.drop does not work
    //TestUtils.Simulate.drop(droppableDOMComponent, mockEvent); //does not work
    //also produces warning
    droppableComponent.onDrop({
      preventDefault: ()=>{},
      dataTransfer,
      target: droppableDOMComponent
    });

    TestUtils.Simulate.dragEnd(draggableDOMComponent, mockEvent);

    const tilesAfter = TileStore.getHighlightedTiles();
    expect(tilesAfter.length).toBe(0);
  });

  it('handleDrop updates the position of figure', () => {
    const previousFigurePos = Positioner.positionOf(7, 0, GameConstants.CHESSBOARD_SIZE); //todo - previous should be withdrawn from object

    let dataTransfer = new DataTransfer();

    const mockEvent = {dataTransfer};
    const draggableComponent = TestUtils.findRenderedComponentWithType(tileComponentWithFigure, Draggable);
    const droppableComponent = TestUtils.findRenderedComponentWithType(tileComponentWithoutFigure, Droppable);
    const droppableDOMComponent = TestUtils.findRenderedDOMComponentWithClass(tileComponentWithoutFigure, 'not-highlighted')
    const draggableDOMComponent = ReactDOM.findDOMNode(draggableComponent);

    TestUtils.Simulate.dragStart(draggableDOMComponent, mockEvent);

    TestUtils.Simulate.dragOver(droppableComponent, mockEvent);

    //simulate onDrop by myself, didn't find the reason why TestUtils.Simulate.drop does not work
    //TestUtils.Simulate.drop(droppableDOMComponent, mockEvent); //does not work
    //also produces warning
    droppableComponent.onDrop({
      preventDefault: ()=>{},
      dataTransfer,
      target: droppableDOMComponent
    });

    TestUtils.Simulate.dragEnd(draggableDOMComponent, mockEvent);

    expect(previousFigurePos).toNotBe(figure.pos);
  });

  it('handleDragStart highlights tiles', () => {
    const draggable = TestUtils.findRenderedComponentWithType(tileComponentWithFigure, Draggable);

    TestUtils.Simulate.dragStart(ReactDOM.findDOMNode(draggable), {dataTransfer : {setData: ()=>{}}});

    const tiles = TileStore.getHighlightedTiles();
    expect(tiles.length > 0).toBe(true);
  });

  it('handleDragEnd unhighlights tiles', () => {
    const draggable = TestUtils.findRenderedComponentWithType(tileComponentWithFigure, Draggable);

    TestUtils.Simulate.dragStart(ReactDOM.findDOMNode(draggable), {dataTransfer : {setData: ()=>{}}});

    TestUtils.Simulate.dragEnd(ReactDOM.findDOMNode(draggable), {dataTransfer : {setData: ()=>{}}});

    const tiles = TileStore.getHighlightedTiles();
    expect(tiles.length).toBe(0);
  });
});

