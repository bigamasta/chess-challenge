/**
 * Created by BigaMasta on 3/8/16.
 */
import React from 'react';
import Figure from './Figure';
import FigureColors from '../../constants/FigureColors';
/**
 * The Knight object that encapsulates all knight specific logic.
 */
export default class Knight extends Figure {
  constructor(pos, color, whose) {
    super(pos, color, whose);
  }

  getPossibleMoves() {
    let possibleMoves = [];

    const positionXY = this.pos.split('');
    let xPos = positionXY[0];
    let yPos = parseInt(positionXY[1]);

    const twoUpOneLeft = `${this._previousChar(xPos)}${yPos + 2}`;
    const twoUpOneRight = `${this._nextChar(xPos)}${yPos + 2}`;
    const oneUpTwoLeft = `${this._previousChar(this._previousChar(xPos))}${yPos + 1}`;
    const oneUpTwoRight = `${this._nextChar(this._nextChar(xPos))}${yPos + 1}`;
    const oneDownTwoLeft = `${this._previousChar(this._previousChar(xPos))}${yPos - 1}`;
    const oneDownTwoRight = `${this._nextChar(this._nextChar(xPos))}${yPos - 1}`;
    const twoDownOneLeft = `${this._previousChar(xPos)}${yPos - 2}`;
    const twoDownOneRight = `${this._nextChar(xPos)}${yPos - 2}`;

    possibleMoves.push(twoUpOneLeft);
    possibleMoves.push(twoUpOneRight);
    possibleMoves.push(oneUpTwoLeft);
    possibleMoves.push(oneUpTwoRight);
    possibleMoves.push(oneDownTwoLeft);
    possibleMoves.push(oneDownTwoRight);
    possibleMoves.push(twoDownOneLeft);
    possibleMoves.push(twoDownOneRight);
    return possibleMoves;
  }

  _nextChar(c) {
    return String.fromCharCode(c.charCodeAt(0) + 1);
  }

  _previousChar(c) {
    return String.fromCharCode(c.charCodeAt(0) - 1);
  }

  getRenderable() {
    if (this.color === FigureColors.BLACK)
      return (<a>&#9822;</a>);
    else if (this.color === FigureColors.WHITE)
      return (<a>&#9816;</a>);
  }
}


