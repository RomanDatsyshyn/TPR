const start = (matrix) => {
  let Wald = WaldCriteria(parseMatrix(matrix));
  let Laplace = LaplaceCriteria(parseMatrix(matrix));
  let Hurwitz = HurwitzCriteria(parseMatrix(matrix));
  let BayesLaplace = BayesLaplaceCriteria(parseMatrix(matrix));

  let outMatrix = parseMatrix(matrix);

  // console.log(Wald);
  // console.log(Laplace);
  // console.log(Hurwitz);
  // console.log(BayesLaplace);

  let html = `<div class="container">
        <table  class="table">
          <thead>
            <tr>
              <th rowspan="2">Можливі альтернативні рішення</th>
              <th colspan="3">Можливі стани зовнішнього середовища</th>
              <th colspan="4">Критерії</th>
            </tr>
            <tr>
              <td>Конкуренція на тому ж рівні</td>
              <td>Конкуренція трішки посилилась</td>
              <td>Конкуренція різко посилилась</td>
              <td>Лапласа</td>
              <td>Вальда</td>
              <td>Гурвіца</td>
              <td>Бейеса</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Продовжити роботу в звичному режимі</td>
              <td>${outMatrix[0][0]}</td>
              <td>${outMatrix[0][1]}</td>
              <td>${outMatrix[0][2]}</td>
              <td id="l0">${
                Wald.Option == 1
                  ? '<h2><span class="badge badge-success">+</span></h2>'
                  : ""
              }</td>
              <td id="v0">${
                Laplace.Option == 1
                  ? '<h2><span class="badge badge-success">+</span></h2>'
                  : ""
              }</td>
              <td id="g0">${
                Hurwitz.Option == 1
                  ? '<h2><span class="badge badge-success">+</span></h2>'
                  : ""
              }</td>
              <td id="b0">${
                BayesLaplace.Option == 1
                  ? '<h2><span class="badge badge-success">+</span></h2>'
                  : ""
              }</td>
            </tr>
            <tr>
              <td>Активувати рекламну діяльність</td>
              <td>${outMatrix[1][0]}</td>
              <td>${outMatrix[1][1]}</td>
              <td>${outMatrix[1][2]}</td>
              <td id="l1">${
                Wald.Option == 2
                  ? '<h2><span class="badge badge-success">+</span></h2>'
                  : ""
              }</td>
              <td id="v1">${
                Laplace.Option == 2
                  ? '<h2><span class="badge badge-success">+</span></h2>'
                  : ""
              }</td>
              <td id="g1">${
                Hurwitz.Option == 2
                  ? '<h2><span class="badge badge-success">+</span></h2>'
                  : ""
              }</td>
              <td id="b1">${
                BayesLaplace.Option == 2
                  ? '<h2><span class="badge badge-success">+</span></h2>'
                  : ""
              }</td>
            </tr>
            <tr>
              <td>Активувати рекламу і знизити ціну</td>
              <td>${outMatrix[2][0]}</td>
              <td>${outMatrix[2][1]}</td>
              <td>${outMatrix[2][2]}</td>
              <td id="l2">${
                Wald.Option == 3
                  ? '<h2><span class="badge badge-success">+</span></h2>'
                  : ""
              }</td>
              <td id="v2">${
                Laplace.Option == 3
                  ? '<h2><span class="badge badge-success">+</span></h2>'
                  : ""
              }</td>
              <td id="g2">${
                Hurwitz.Option == 3
                  ? '<h2><span class="badge badge-success">+</span></h2>'
                  : ""
              }</td>
              <td id="b2">
              ${
                BayesLaplace.Option == 3
                  ? '<h2><span class="badge badge-success">+</span></h2>'
                  : ""
              }</td>
            </tr>
          </tbody>
        </table>
      </div>`;

  document.getElementById("tableContainer").innerHTML = html;
};

const parseMatrix = (matrix) => {
  matrix = matrix.replace(/(\r\n|\n|\r)/gm, " ");
  matrix += " ";

  let arr = [];
  let num = "";

  for (let i = 0; i < matrix.length; i++) {
    if (matrix[i] !== " ") {
      num += matrix[i];
    } else {
      arr.push(parseInt(num));
      num = "";
    }
  }

  let m = [];
  for (let i = 0; i < 3; i++) {
    m[i] = new Array(3);
  }

  let j = 0;
  let k = 0;

  for (let i = 0; i < arr.length; i++) {
    if (j < Math.sqrt(arr.length)) {
      m[k][j] = arr[i];
      j++;
    } else {
      j = 0;
      k++;
      m[k][j] = arr[i];
      j++;
    }
  }

  return m;
};

// Wald

//  * Finds the lowest values in each row
//  * The row which the highest lower value is the best option

const WaldCriteria = (matrix) => {
  let lowestValues = [];

  for (let i = 0; i < matrix.length; i++) {
    let compareWith = 999;

    for (let j = 0; j < matrix.length; j++) {
      if (matrix[i][j] < compareWith) {
        compareWith = matrix[i][j];
      }
    }

    lowestValues.push(compareWith);
  }

  let highestNumber = { Option: 1, Value: lowestValues[0] };

  for (let i = 0; i < lowestValues.length; i++) {
    if (lowestValues[i] > highestNumber.Value) {
      highestNumber = { Option: i + 1, Value: lowestValues[i] };
    }
  }

  return highestNumber;
};

// Laplace

//  * Sums all values in each row
//  * Divides them by the amount of elements in the row
//  * The row which the highest sum value is the best option

const LaplaceCriteria = (matrix) => {
  let sums = [];

  for (let i = 0; i < matrix.length; i++) {
    let sum = 0;

    for (let j = 0; j < matrix.length; j++) sum += matrix[i][j];

    sums.push(sum / matrix.length);
  }

  let highestNumber = { Option: 1, Value: sums[0] };

  for (let i = 0; i < sums.length; i++) {
    if (sums[i] > highestNumber.Value) {
      highestNumber = { Option: i + 1, Value: sums[i] };
    }
  }

  return highestNumber;
};

// Hurwitz

//  * Finds the lowest and the highest values in each row
//  * Uses the special formula: coefficient * min + (1 - coefficient) * max
//  * The row which has the highest value, calculated with formula is the best option

const HurwitzCriteria = (matrix) => {
  let lowestValues = [];

  for (let i = 0; i < matrix.length; i++) {
    let compareWith = 999;

    for (let j = 0; j < matrix.length; j++) {
      if (matrix[i][j] < compareWith) {
        compareWith = matrix[i][j];
      }
    }

    lowestValues.push(compareWith);
  }

  let highestValues = [];

  for (let i = 0; i < matrix.length; i++) {
    let compareWith = -999;

    for (let j = 0; j < matrix.length; j++) {
      if (matrix[i][j] > compareWith) {
        compareWith = matrix[i][j];
      }
    }

    highestValues.push(compareWith);
  }

  let values = [];

  for (let i = 0; i < matrix.length; i++) {
    values.push(0.5 * lowestValues[i] + (1 - 0.5) * highestValues[i]);
  }

  let highestNumber = { Option: 1, Value: values[0] };

  for (let i = 0; i < values.length; i++) {
    if (values[i] > highestNumber.Value) {
      highestNumber = { Option: i + 1, Value: values[i] };
    }
  }

  return highestNumber;
};

// BayesLaplace

//  * Using special formula, multiplies coefficients of cols by col values
//  * in each row and then adds them: A11*Q1 + A12*Q2 + ... + Anm*Qm
//  * The row which has the highest value, calculated with formula is the best option

const BayesLaplaceCriteria = (matrix) => {
  let p = [0.5, 0.35, 0.15];

  let values = [];

  for (let i = 0; i < matrix.length; i++) {
    values.push(
      matrix[i][0] * p[0] + matrix[i][1] * p[1] + matrix[i][2] * p[2]
    );
  }

  let highestNumber = { Option: 1, Value: values[0] };

  for (let i = 0; i < values.length; i++) {
    if (values[i] > highestNumber.Value) {
      highestNumber = { Option: i + 1, Value: values[i] };
    }
  }

  return highestNumber;
};
