/**
 * Created by BigaMasta on 3/10/16.
 */
import ReactDOM from 'react-dom';
import React from 'react';
import expect from 'expect';
import Figure from '../Figure';
import FigureActions from '../../../actions/FigureActions.js';
import FigureStore from '../../../stores/FigureStore.js';
import Footman from '../../../model/Figure/Footman.js';
import FootmanFactory from '../../../factories/FootmanFactory.js';
import Knight from '../../../model/Figure/Knight.js';
import KnightFactory from '../../../factories/KnightFactory.js';
import FigureColors from '../../../constants/FigureColors.js';
import GameConstants from '../../../constants/GameConstants.js';
import Positioner from '../../../utils/Positioner.js';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  findRenderedDOMComponentWithTag,
  scryRenderedDOMComponentsWithTag
} from 'react-addons-test-utils';

describe('Figure Component',() => {
  const blackFootmanRendered = '♟';
  const whiteFootmanRendered = '♙';
  const blackKnightRendered = '♞';
  const whiteKnightRendered = '♘';
  it('renders figures', () => {
    const posA8 = Positioner.positionOf(0,0,GameConstants.CHESSBOARD_SIZE);
    const posA7 = Positioner.positionOf(0,1,GameConstants.CHESSBOARD_SIZE);
    const posA6 = Positioner.positionOf(0,2,GameConstants.CHESSBOARD_SIZE);
    const posA5 = Positioner.positionOf(0,3,GameConstants.CHESSBOARD_SIZE);
    const blackFootman = FootmanFactory.create(posA8, FigureColors.BLACK);
    const whiteFootman = FootmanFactory.create(posA7, FigureColors.WHITE);
    const blackKnight = KnightFactory.create(posA6, FigureColors.BLACK);
    const whiteKnight = KnightFactory.create(posA5, FigureColors.WHITE);
    FigureActions.create(blackFootman);
    FigureActions.create(whiteFootman);
    FigureActions.create(blackKnight);
    FigureActions.create(whiteKnight);
    const component1 = renderIntoDocument(<Figure id={blackFootman.id} />);
    const component2 = renderIntoDocument(<Figure id={whiteFootman.id} />);
    const component3 = renderIntoDocument(<Figure id={blackKnight.id} />);
    const component4 = renderIntoDocument(<Figure id={whiteKnight.id} />);
    const valueComponents1 = findRenderedDOMComponentWithTag(component1, 'a');
    const valueComponents2 = findRenderedDOMComponentWithTag(component2, 'a');
    const valueComponents3 = findRenderedDOMComponentWithTag(component3, 'a');
    const valueComponents4 = findRenderedDOMComponentWithTag(component4, 'a');
    expect(valueComponents1.textContent).toEqual(blackFootmanRendered);
    expect(valueComponents2.textContent).toEqual(whiteFootmanRendered);
    expect(valueComponents3.textContent).toEqual(blackKnightRendered);
    expect(valueComponents4.textContent).toEqual(whiteKnightRendered);
  });
});

