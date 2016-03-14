/**
 * Created by BigaMasta on 3/6/16.
 */
export default class AlphabetArrayGenerator {
  /**
   * Generates the array of n letters, starting from A.
   * @param countOfAlphabetLetters count of letter to be in array.
     */
  static generateAlphabetArray(n = 8) {
    return [
      for (i of Array.apply(0, Array(n)).map((x, y) => y))
        String.fromCharCode(65 + i)
    ].join('');
  };
}
