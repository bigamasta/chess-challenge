/**
 * Created by BigaMasta on 3/10/16.
 */
import React from 'react';
import assert from 'assert';
import expect from 'expect';
import Knight from '../../model/Figure/Knight';
import KnightFactory from '../../factories/KnightFactory';
import Footman from '../../model/Figure/Footman';
import FootmanFactory from '../../factories/FootmanFactory.js';
import FigureColors from '../../constants/FigureColors';
import FigureStore from '../FigureStore';
import FigureActions from '../../actions/FigureActions.js';
import Positioner from '../../utils/Positioner.js';
import GameConstants from '../../constants/GameConstants.js';
import alt from '../../alt';

describe('FigureStore', () => {
  beforeEach(() => {
    alt.flush();
  });

  it('stores knights', () => {
    const posA1 = Positioner.positionOf(7, 0, GameConstants.CHESSBOARD_SIZE);
    const posA2 = Positioner.positionOf(6, 0, GameConstants.CHESSBOARD_SIZE);
    const blackKnight = KnightFactory.create(posA1, FigureColors.BLACK);
    const whiteKnight = KnightFactory.create(posA2, FigureColors.WHITE);

    let state = FigureStore.getState();

    expect(state.figures).toExist();
    expect(state.figures.length).toBe(0);

    FigureActions.create(blackKnight);
    state = FigureStore.getState();
    const blackKnightInStore = state.figures.indexOf(blackKnight) != (-1);
    expect(blackKnightInStore).toExist();

    FigureActions.create(whiteKnight);
    state = FigureStore.getState();
    const whiteKnightInStore = state.figures.indexOf(whiteKnight) != (-1);
    expect(whiteKnightInStore).toExist();

  });

  it('stores multiple types of figures', () => {
    const posA1 = Positioner.positionOf(7, 0, GameConstants.CHESSBOARD_SIZE);
    const posA2 = Positioner.positionOf(6, 0, GameConstants.CHESSBOARD_SIZE);
    const blackFootman = FootmanFactory.create(posA1, FigureColors.BLACK);
    const whiteFootman = FootmanFactory.create(posA2, FigureColors.WHITE);
    const blackKnight = KnightFactory.create(posA1, FigureColors.BLACK);
    const whiteKnight = KnightFactory.create(posA2, FigureColors.WHITE);
    FigureActions.create(blackKnight);
    FigureActions.create(whiteKnight);
    FigureActions.create(blackFootman);
    FigureActions.create(whiteFootman);
    const state = FigureStore.getState();
    expect(state.figures.length).toBe(4);
  });

  it('does not store null or undefined objects', () => {
    expect(
      () => {FigureActions.create(null)}
    ).toThrow(TypeError);
    expect(
      () => {FigureActions.create(undefined)}
    ).toThrow(TypeError);
  });

  it('is able to update', () => {
    const posA1 = Positioner.positionOf(7, 0, GameConstants.CHESSBOARD_SIZE);
    const blackFootman = FootmanFactory.create(posA1, FigureColors.BLACK);
    FigureActions.create(blackFootman);

    const newPos = 'D5';
    blackFootman.pos = newPos;

    FigureActions.update(blackFootman);

    const updatedFootman = FigureStore.getFigureById(blackFootman.id);

    expect(updatedFootman.pos).toBe(newPos);
  });

  it('deletes the figure with specified id', () => {
    const posA1 = Positioner.positionOf(7, 0, GameConstants.CHESSBOARD_SIZE);
    const posA2 = Positioner.positionOf(6, 0, GameConstants.CHESSBOARD_SIZE);
    const blackFootman = FootmanFactory.create(posA1, FigureColors.BLACK);
    const whiteFootman = FootmanFactory.create(posA2, FigureColors.WHITE);
    FigureActions.create(blackFootman);
    FigureActions.create(whiteFootman);

    FigureActions.delete(blackFootman.id);

    const state = FigureStore.getState();
    expect(state.figures.length).toBe(1);
    expect(state.figures[0]).toBe(whiteFootman);
  });

  it('getFigureById(id) should return the correct figure by id', () => {
    const posA1 = Positioner.positionOf(7, 0, GameConstants.CHESSBOARD_SIZE);
    const posA2 = Positioner.positionOf(6, 0, GameConstants.CHESSBOARD_SIZE);
    const blackFootman = FootmanFactory.create(posA1, FigureColors.BLACK);
    const whiteFootman = FootmanFactory.create(posA2, FigureColors.WHITE);
    FigureActions.create(blackFootman);
    FigureActions.create(whiteFootman);
    const figure = FigureStore.getFigureById(blackFootman.id);
    expect(blackFootman).toBe(figure);
    const figure2 = FigureStore.getFigureById(whiteFootman.id);
    expect(whiteFootman).toBe(figure2);
  });

  it('getFigureById(id) returns null in case of invalid id', () => {
    const posA1 = Positioner.positionOf(7, 0, GameConstants.CHESSBOARD_SIZE);
    const posA2 = Positioner.positionOf(6, 0, GameConstants.CHESSBOARD_SIZE);
    const blackFootman = FootmanFactory.create(posA1, FigureColors.BLACK);
    const whiteFootman = FootmanFactory.create(posA2, FigureColors.WHITE);
    FigureActions.create(blackFootman);
    FigureActions.create(whiteFootman);
    const figure = FigureStore.getFigureById('some invalid id');
    expect(figure).toNotBe(blackFootman);
    expect(figure).toNotBe(whiteFootman);
  });

  it('getFiguresMap() returns a valid map of positions -> figures', () => {
    const posA1 = Positioner.positionOf(7, 0, GameConstants.CHESSBOARD_SIZE);
    const posA2 = Positioner.positionOf(6, 0, GameConstants.CHESSBOARD_SIZE);
    const blackFootman = FootmanFactory.create(posA1, FigureColors.BLACK);
    const whiteFootman = FootmanFactory.create(posA2, FigureColors.WHITE);
    FigureActions.create(blackFootman);
    FigureActions.create(whiteFootman);
    const figuresMap = FigureStore.getFiguresMap();
    const blackFootmanPosFromMap = figuresMap.get(blackFootman);
    const whiteFootmanPosFromMap = figuresMap.get(whiteFootman);
    expect(blackFootmanPosFromMap).toBe(whiteFootmanPosFromMap);
  });
});
