/* eslint-disable prefer-template */

const roundNumber = (number, decimalPlaces = '2') =>
  Number(
    Math.round(number + 'e' + decimalPlaces) + `e-` + decimalPlaces
  ).toFixed(2);

export default roundNumber;
