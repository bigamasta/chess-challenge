/**
 * Created by BigaMasta on 3/12/16.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import expect from 'expect';
import alt from '../../../alt';
import Chessboard from '../Chessboard';
import Tile from '../../Tile/Tile';
import TestUtils from 'react-addons-test-utils';
import FigureStore from '../../../stores/FigureStore';
import TileStore from '../../../stores/TileStore';

describe('Chessboard', () => {
  let component;
  beforeEach(() => {
    alt.flush();
    component = TestUtils.renderIntoDocument(
      <Chessboard playerColorPreference="black"/>
    );
  });

  /**
   * Must unmount the rendered component after each test.
   * Otherwise it will stay in the document for the next test.
   */
  afterEach(() => {
    ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(component).parentNode);
  });

  it('creates figures', () => {
    const figures = FigureStore.getState().figures;
    expect(figures.length > 0).toBe(true);
  });

  it('creates 8x8 tiles', () => {
    const tiles = TileStore.getState().tiles;
    expect(tiles.length).toBe(64);

  });

  it('can render', () => {
    const domComponent = TestUtils.findRenderedDOMComponentWithTag(component, 'table');
    expect(domComponent).toExist();
  });

  it('renders 8x8 tiles', () => {
    const tileComponents = TestUtils.scryRenderedComponentsWithType(component, Tile);
    expect(tileComponents.length).toBe(64);
  });

});
