/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './App.css';
import withContext from '../../decorators/withContext';
import withStyles from '../../decorators/withStyles';
import Chessboard from '../Chessboard/Chessboard';
import AppStore from '../../stores/AppStore';
import AppActions from '../../actions/AppActions';
import uuid from 'uuid';
import alt from '../../alt';

@withContext
@withStyles(styles)
class App extends Component {

  constructor(props) {
    super(props);
  }

  static propTypes = {
    children: PropTypes.element.isRequired,
    error: PropTypes.object,
  };

  componentDidMount() {
    AppStore.listen(this.storeChanged);
  }

  componentWillUnmount() {
    AppStore.unlisten(this.storeChanged);
  }

  storeChanged = (state) => {
    this.setState(state);
  };

  render() {
    return !this.props.error ? (
      <div>
        <div id="mode-select">
          <h1>Unlease Chess Challenge</h1>
          <div>

            <span>Choose mode:</span>
            <button onClick={this.footmanMode} className="mui-btn mui-btn--primary">&#9823; Footman mode (task 1)</button>
            <button onClick={this.knightMode}  className="mui-btn mui-btn--primary">&#9822; Knight mode (task 2)</button>
          </div>
        </div>


        <Chessboard
          key={uuid.v4()}
          playerColorPreference={AppStore.getState().playerColorPreference}
          mode={AppStore.getState().mode}
        />


        <div id="made-with-love">Made with &#10084; by Patrik Prevuznak</div>
      </div>
    ) : this.props.children;
  }

  footmanMode() {
    alt.flush();
    AppActions.footmanMode();
  }

  knightMode() {
    alt.flush();
    AppActions.knightMode();
  }

}

export default App;
