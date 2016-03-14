/**
 * Created by BigaMasta on 3/11/16.
 */
import Tile from '../../model/Tile/Tile';
import TileFactory from '../../factories/TileFactory';
import TileStore from '../TileStore';
import TileActions from '../../actions/TileActions';
import GameConstants from '../../constants/GameConstants';
import Positioner from '../../utils/Positioner.js';

import React from 'react';
import expect from 'expect';
import alt from '../../alt';

describe('TileStore', () => {
  beforeEach(() => {
    alt.flush();
  });

  it('stores tiles', () => {
    const posA1 = Positioner.positionOf(7, 0, GameConstants.CHESSBOARD_SIZE);
    const posA2 = Positioner.positionOf(6, 0, GameConstants.CHESSBOARD_SIZE);
    const posA3 = Positioner.positionOf(5, 0, GameConstants.CHESSBOARD_SIZE);
    const posA4 = Positioner.positionOf(4, 0, GameConstants.CHESSBOARD_SIZE);
    const posA5 = Positioner.positionOf(3, 0, GameConstants.CHESSBOARD_SIZE);
    const tileA1 = TileFactory.create(posA1);
    const tileA2 = TileFactory.create(posA2);
    const tileA3 = TileFactory.create(posA3);
    const tileA4 = TileFactory.create(posA4);
    const tileA5 = TileFactory.create(posA5);
    TileActions.create(tileA1);
    TileActions.create(tileA2);
    TileActions.create(tileA3);
    TileActions.create(tileA4);
    TileActions.create(tileA5);
    const tiles = TileStore.getState().tiles;
    expect(tiles).toInclude(tileA1);
    expect(tiles).toInclude(tileA2);
    expect(tiles).toInclude(tileA3);
    expect(tiles).toInclude(tileA4);
    expect(tiles).toInclude(tileA5);
  });

  it('does not store null or undefined objects', () => {
    expect(() => {
      TileActions.create(null)
    }).toThrow(TypeError);
    expect(() => {
      TileActions.create(undefined)
    }).toThrow(TypeError);
  });

  describe('highlighting', () => {
    const posA1 = Positioner.positionOf(7, 0, GameConstants.CHESSBOARD_SIZE);
    const posA2 = Positioner.positionOf(6, 0, GameConstants.CHESSBOARD_SIZE);
    const posA3 = Positioner.positionOf(5, 0, GameConstants.CHESSBOARD_SIZE);
    const posA4 = Positioner.positionOf(4, 0, GameConstants.CHESSBOARD_SIZE);
    const posA5 = Positioner.positionOf(3, 0, GameConstants.CHESSBOARD_SIZE);
    let tileA1;
    let tileA2;
    let tileA3;
    let tileA4;
    let tileA5;
    beforeEach(() => {
      tileA1 = TileFactory.create(posA1);
      tileA2 = TileFactory.create(posA2);
      tileA3 = TileFactory.create(posA3);
      tileA4 = TileFactory.create(posA4);
      tileA5 = TileFactory.create(posA5);
      tileA1.highlighted = true;
      tileA2.highlighted = false;
      tileA3.highlighted = true;
      tileA4.highlighted = false;
      tileA5.highlighted = true;
      TileActions.create(tileA1);
      TileActions.create(tileA2);
      TileActions.create(tileA3);
      TileActions.create(tileA4);
      TileActions.create(tileA5);
    });
    it('is able to answer whether tile is highlighted', () => {
      expect(TileStore.isTileHighlighted(tileA1.pos)).toBe(true);
      expect(TileStore.isTileHighlighted(tileA2.pos)).toBe(false);
      expect(TileStore.isTileHighlighted(tileA3.pos)).toBe(true);
      expect(TileStore.isTileHighlighted(tileA4.pos)).toBe(false);
      expect(TileStore.isTileHighlighted(tileA5.pos)).toBe(true);
    });

    it('is able to return all highlighted tiles', () => {
      const highlightedTiles = TileStore.getHighlightedTiles();
      expect(highlightedTiles).toInclude(tileA1);
      expect(highlightedTiles).toExclude(tileA2);
      expect(highlightedTiles).toInclude(tileA3);
      expect(highlightedTiles).toExclude(tileA4);
      expect(highlightedTiles).toInclude(tileA5);
    });

    it('is able to highlight given tiles', () => {
      TileActions.highlightTilesAt([tileA1.pos, tileA2.pos, tileA3.pos, tileA4.pos, tileA5.pos]);
      const tiles = TileStore.getState().tiles;
      tiles.map(tile => {
        expect(tile.highlighted).toBe(true);
      });
    });

    it('is able to unhighlight given tiles', () => {
      TileActions.unhighlightTiles();
      const tiles = TileStore.getState().tiles;
      tiles.map(tile => {
        expect(tile.highlighted).toBe(false);
      });
    });
  });
});
