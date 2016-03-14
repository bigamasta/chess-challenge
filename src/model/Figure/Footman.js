/**
 * Created by BigaMasta on 3/8/16.
 */
import Figure from './Figure';
import FigureColors from '../../constants/FigureColors';
import React from 'react';
import Positioner from '../../utils/Positioner';
/**
 * The Footman object that encapsulates all footman specific logic.
 */
export default class Footman extends Figure {

  constructor(pos, color, whose) {
    super(pos, color, whose);
  }

  getPossibleMoves() {
    return Positioner.getAllPositions();
  }

  getRenderable() {
    if (this.color === FigureColors.BLACK)
      return (<a>&#9823;</a>);
    else if (this.color === FigureColors.WHITE)
      return (<a>&#9817;</a>);
  }

};
