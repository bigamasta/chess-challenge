/**
 * Created by BigaMasta on 3/4/16.
 */
import uuid from 'node-uuid';
import alt from '../alt';
import FigureActions from '../actions/FigureActions';
import Figure from '../model/Figure/Figure';
/**
 * Store for figures.
 */
class FigureStore {
  constructor() {
    this.bindActions(FigureActions);
    this.figures = [];
    this.exportPublicMethods({
      getFigureById: this.getFigureById.bind(this),
      getFiguresMap: this.getFiguresMap.bind(this)
    });
  }

  /**
   * Note: the figure id shall be already set.
   * @param figure
     */
  create(figure) {
    if (!(figure instanceof Figure)) {
       throw new TypeError("The parameter figure is not of type Figure");
    }

    const figures = this.figures;

    this.setState({
      figures: figures.concat(figure)
    });
  }

  /**
   * Updates a figure.
   * @param updatedFigure updated figure to be stored.
     */
  update(updatedFigure) {
    if (!(updatedFigure instanceof Figure)) {
      throw new TypeError("The parameter figure is not of type Figure");
    }

    const figures = this.figures.map(figure => {
      if(figure.id === updatedFigure.id) {
        return Object.assign(figure, updatedFigure);
      }
      return figure;
    });

    this.setState({figures});
  }

  /**
   * Removes a figure from the store.
   * @param id the id of figure to delete.
   */
  delete(id) {
    this.setState({
      figures: this.figures.filter(figure => figure.id !== id)
    });
  }

  /**
   * @param id the id of a figure.
   * @returns {T|*} figure with specified id.
     */
  getFigureById(id) {
    return this.figures.filter(figure => {
      if (figure.id === id) {
        return figure;
      }
    })[0];

  }

  /**
   * Returns a map of figure positions and figures.
   * Fast access to figure, when the position is given.
   * @returns {Map}
     */
  getFiguresMap() {
    let figuresMap = new Map();
    this.figures.map(figure => {
      figuresMap.set(figure.pos, figure);
      return figure;
    });
    return figuresMap;
  }
}

export default alt.createStore(FigureStore, 'FigureStore');
