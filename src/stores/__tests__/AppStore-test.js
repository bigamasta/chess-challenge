/**
 * Created by BigaMasta on 3/11/16.
 */
import React from 'react';
import expect from 'expect';
import alt from '../../alt';
import AppStore from '../AppStore';
describe('AppStore', () => {
  beforeEach(() => {
    alt.flush();
  });
  it('player shall pick a color at start of the game', () => {
    const chosenColor = AppStore.getState().playerColorPreference;
    expect(chosenColor).toExist("Player should have picked a color");
  });
});
