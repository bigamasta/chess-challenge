/**
 * Created by BigaMasta on 3/13/16.
 */
import React from 'react';
import expect from 'expect';
import alt from '../../alt';
import Positioner from '../Positioner';
import AlphabetArrayGenerator from './../AlphabetArrayGenerator';
import GameConstants from '../../constants/GameConstants';

/**
 *
 * rowNo:  0  ->  8 x x x x x x x x
 * rowNo:  1  ->  7 x x x x x x x x
 * rowNo:  2  ->  6 x x x x x x x x
 * rowNo:  3  ->  5 x x x x x x x x
 * rowNo:  4  ->  4 x x x x x x x x
 * rowNo:  5  ->  3 x x x x x x x x
 * rowNo:  6  ->  2 x x x x x x x x
 * rowNo:  7  ->  1 x x x x x x x x
 *                  A B C D E F G H
 *
 *                  | | | | | | | |
 *          colNo:  0 1 2 3 4 5 6 7
 */
describe('Positioner', () => {
  beforeEach(() => {
    alt.flush();
  });

  it('positions correctly', () => {
    let position;
    const size = GameConstants.CHESSBOARD_SIZE;

    //A1, A2, A3, A4, A5, A6, A7, A8
    [...Array(8)].map((x, index) => {
      position = Positioner.positionOf(index, 0, size);
      expect(position).toBe(`A${size-index}`);
    });

    //A8, B8, C8, D8, E8, F8, G8, H8
    const lettersArray = AlphabetArrayGenerator.generateAlphabetArray();
    [...Array(8)].map((y, index) => {
      position = Positioner.positionOf(0, index, size);
      expect(position).toBe(`${lettersArray[index]}8`);
    });

  });
});
