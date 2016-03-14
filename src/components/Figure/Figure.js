/**
 * Created by BigaMasta on 3/3/16.
 */
import React from 'react';
import FigureStore from '../../stores/FigureStore';
import FigureTypes from '../../constants/FigureTypes';
import FigureColors from '../../constants/FigureColors';
import Knight from '../../model/Figure/Knight';
import Footman from '../../model/Figure/Footman';

export default class Figure extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    id: React.PropTypes.string.isRequired
  };

  render() {
    const figure = FigureStore.getFigureById(this.props.id);
    return figure.getRenderable();
  }
}
