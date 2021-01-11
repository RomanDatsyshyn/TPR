let html = "";
let iteration = 0;

const x1 = [3, 3, 10, 7, 4];
const x2 = [5, 9, 3, 8, 4];
const x3 = [6, 3, 10, 4, 5];
const x4 = [3, 7, 10, 6, 9];
const x5 = [5, 3, 7, 9, 11];
const b = [1, 1, 1, 1, 1];
const b1 = [6, 7, 8, 9, 10];

const matrix = [
  [x1[0], x2[0], x3[0], x4[0], x5[0], 1, 0, 0, 0, 0, b[0]],
  [x1[1], x2[1], x3[1], x4[1], x5[1], 0, 1, 0, 0, 0, b[1]],
  [x1[2], x2[2], x3[2], x4[2], x5[2], 0, 0, 1, 0, 0, b[2]],
  [x1[3], x2[3], x3[3], x4[3], x5[3], 0, 0, 0, 1, 0, b[3]],
  [x1[4], x2[4], x3[4], x4[4], x5[4], 0, 0, 0, 0, 1, b[4]],
  [-1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0],
];

const start = () => {
  html = "";
  iteration = 0;
  let matrix = getDataFromHTML();

  let minA = [];
  let maxB = [];

  for (let i = 0; i < 5; i++) {
    minA.push(
      Math.min(
        matrix[i][0],
        matrix[i][1],
        matrix[i][2],
        matrix[i][3],
        matrix[i][4]
      )
    );

    maxB.push(
      Math.max(
        matrix[0][i],
        matrix[1][i],
        matrix[2][i],
        matrix[3][i],
        matrix[4][i]
      )
    );
  }

  html += '<div class="container">';

  html += `<br/><h4>Min A: ${minA}</h4>`;
  html += `<h4>Max B: ${maxB}</h4>`;
  html += `<h4>Game price: ${Math.max(...minA)} < x < ${Math.min(
    ...maxB
  )}</h4>`;

  html += "<br/><h4>Базова матриця:</h4>";
  outputTable(matrix);
  matrix = simplexMethod(matrix);

  html += "<br/><h5>Результати: </h5><br/>";
  let result1 = 0;

  for (let i = 0; i < 5; i++) {
    html += `<h5>x${i + 1} = ${matrix[5][5 + i]}</h5>`;
    result1 += matrix[5][5 + i];
  }

  html += "<br/>";
  let result2 = 0;

  for (let i = 0; i < matrix.length - 1; i++) {
    if (b1[i] <= 5) {
      html += `<h5>y${b1[i]} = ${matrix[i][10]}</h5>`;
      result2 += matrix[i][10];
    }
  }

  html += `<br/ ><h5>Game price: ${1 / result2}</h5>`;
  html += "</div>";
  document.getElementById(`wow`).innerHTML = html;
};

const getDataFromHTML = () => {
  let x1 = [];
  let x2 = [];
  let x3 = [];
  let x4 = [];
  let x5 = [];
  let b = [1, 1, 1, 1, 1];

  for (let i = 0; i < 5; i++) {
    x1.push(parseFloat(document.getElementById(`${i}${0}input`).value));
    x2.push(parseFloat(document.getElementById(`${i}${1}input`).value));
    x3.push(parseFloat(document.getElementById(`${i}${2}input`).value));
    x4.push(parseFloat(document.getElementById(`${i}${3}input`).value));
    x5.push(parseFloat(document.getElementById(`${i}${4}input`).value));
  }

  let matrix = [
    [x1[0], x2[0], x3[0], x4[0], x5[0], 1, 0, 0, 0, 0, b[0]],
    [x1[1], x2[1], x3[1], x4[1], x5[1], 0, 1, 0, 0, 0, b[1]],
    [x1[2], x2[2], x3[2], x4[2], x5[2], 0, 0, 1, 0, 0, b[2]],
    [x1[3], x2[3], x3[3], x4[3], x5[3], 0, 0, 0, 1, 0, b[3]],
    [x1[4], x2[4], x3[4], x4[4], x5[4], 0, 0, 0, 0, 1, b[4]],
    [-1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0],
  ];

  return matrix;
};

const updateMatrix = (x, minx, matrix) => {
  let k1 = matrix[x[1]][minx] / matrix[x[0]][minx];

  for (let i = 0; i < 11; i++)
    matrix[x[1]][i] = matrix[x[1]][i] - matrix[x[0]][i] * k1;

  let k2 = matrix[x[2]][minx] / matrix[x[0]][minx];

  for (let i = 0; i < 11; i++)
    matrix[x[2]][i] = matrix[x[2]][i] - matrix[x[0]][i] * k2;

  let k3 = matrix[x[3]][minx] / matrix[x[0]][minx];

  for (let i = 0; i < 11; i++)
    matrix[x[3]][i] = matrix[x[3]][i] - matrix[x[0]][i] * k3;

  let k4 = matrix[x[4]][minx] / matrix[x[0]][minx];

  for (let i = 0; i < 11; i++)
    matrix[x[4]][i] = matrix[x[4]][i] - matrix[x[0]][i] * k4;

  let k5 = matrix[x[5]][minx] / matrix[x[0]][minx];

  for (let i = 0; i < 11; i++)
    matrix[x[5]][i] = matrix[x[5]][i] - matrix[x[0]][i] * k5;

  let k6 = matrix[x[0]][minx];

  for (let i = 0; i < 11; i++) matrix[x[0]][i] = matrix[x[0]][i] / k6;

  outputTable(matrix);

  return matrix;
};

const simplexMethod = (matrix) => {
  let mCheck = 0;

  for (let i = 0; i < matrix[5].length; i++) if (matrix[5][i] < 0) mCheck++;

  if (mCheck > 0) {
    iteration++;

    if (iteration > 7) return matrix;

    html += `<center><h3>${iteration} ітерація</h3></center>`;

    let minx = matrix[5].lastIndexOf(Math.min(...matrix[5]));
    let minb = 0;

    for (let i = 0; i < 5; i++) {
      if (matrix[minb][10] / matrix[minb][minx] < 0) minb++;

      if (
        matrix[i][10] / matrix[i][minx] <
          matrix[minb][10] / matrix[minb][minx] &&
        matrix[i][10] / matrix[i][minx] >= 0
      )
        minb = i;

      console.log(matrix[i][10] / matrix[i][minx]);
    }

    html += `<center><h4>min(${minx};${minb})\n</h4></center>`;

    b1[minb] = minx + 1;

    switch (minb) {
      case 0: {
        simplexMethod(updateMatrix([0, 1, 2, 3, 4, 5], minx, matrix));
        return matrix;
      }
      case 1: {
        simplexMethod(updateMatrix([1, 0, 2, 3, 4, 5], minx, matrix));
        return matrix;
      }
      case 2: {
        simplexMethod(updateMatrix([2, 0, 1, 3, 4, 5], minx, matrix));
        return matrix;
      }
      case 3: {
        simplexMethod(updateMatrix([3, 0, 1, 2, 4, 5], minx, matrix));
        return matrix;
      }
      case 4: {
        simplexMethod(updateMatrix([4, 0, 1, 2, 3, 5], minx, matrix));
        return matrix;
      }
    }
  } else {
    return matrix;
  }
};

const outputTable = (matrix) => {
  html += `<div class="container">
    <table class="table table-bordered border-primary">
  <tbody>
    <tr>
      <td>${Math.round((matrix[0][0] + Number.EPSILON) * 1000) / 1000}</td>
      <td>${Math.round((matrix[0][1] + Number.EPSILON) * 1000) / 1000}</td>
      <td>${Math.round((matrix[0][2] + Number.EPSILON) * 1000) / 1000}</td>
      <td>${Math.round((matrix[0][3] + Number.EPSILON) * 1000) / 1000}</td>
      <td>${Math.round((matrix[0][4] + Number.EPSILON) * 1000) / 1000}</td>
      <td>${Math.round((matrix[0][5] + Number.EPSILON) * 1000) / 1000}</td>
      <td>${Math.round((matrix[0][6] + Number.EPSILON) * 1000) / 1000}</td>
      <td>${Math.round((matrix[0][7] + Number.EPSILON) * 1000) / 1000}</td>
      <td>${Math.round((matrix[0][8] + Number.EPSILON) * 1000) / 1000}</td>
      <td>${Math.round((matrix[0][9] + Number.EPSILON) * 1000) / 1000}</td>
      <td>${Math.round((matrix[0][10] + Number.EPSILON) * 1000) / 1000}</td>
    </tr>
    <tr>
      <td>${Math.round((matrix[1][0] + Number.EPSILON) * 1000) / 1000}</td>
      <td>${Math.round((matrix[1][1] + Number.EPSILON) * 1000) / 1000}</td>
      <td>${Math.round((matrix[1][2] + Number.EPSILON) * 1000) / 1000}</td>
      <td>${Math.round((matrix[1][3] + Number.EPSILON) * 1000) / 1000}</td>
      <td>${Math.round((matrix[1][4] + Number.EPSILON) * 1000) / 1000}</td>
      <td>${Math.round((matrix[1][5] + Number.EPSILON) * 1000) / 1000}</td>
      <td>${Math.round((matrix[1][6] + Number.EPSILON) * 1000) / 1000}</td>
      <td>${Math.round((matrix[1][7] + Number.EPSILON) * 1000) / 1000}</td>
      <td>${Math.round((matrix[1][8] + Number.EPSILON) * 1000) / 1000}</td>
      <td>${Math.round((matrix[1][9] + Number.EPSILON) * 1000) / 1000}</td>
      <td>${Math.round((matrix[1][10] + Number.EPSILON) * 1000) / 1000}</td>
    </tr>
        <tr>
      <td>${Math.round((matrix[2][0] + Number.EPSILON) * 1000) / 1000}</td>
      <td>${Math.round((matrix[2][1] + Number.EPSILON) * 1000) / 1000}</td>
      <td>${Math.round((matrix[2][2] + Number.EPSILON) * 1000) / 1000}</td>
      <td>${Math.round((matrix[2][3] + Number.EPSILON) * 1000) / 1000}</td>
      <td>${Math.round((matrix[2][4] + Number.EPSILON) * 1000) / 1000}</td>
      <td>${Math.round((matrix[2][5] + Number.EPSILON) * 1000) / 1000}</td>
      <td>${Math.round((matrix[2][6] + Number.EPSILON) * 1000) / 1000}</td>
      <td>${Math.round((matrix[2][7] + Number.EPSILON) * 1000) / 1000}</td>
      <td>${Math.round((matrix[2][8] + Number.EPSILON) * 1000) / 1000}</td>
      <td>${Math.round((matrix[2][9] + Number.EPSILON) * 1000) / 1000}</td>
      <td>${Math.round((matrix[2][10] + Number.EPSILON) * 1000) / 1000}</td>
    </tr>
        <tr>
      <td>${Math.round((matrix[3][0] + Number.EPSILON) * 1000) / 1000}</td>
      <td>${Math.round((matrix[3][1] + Number.EPSILON) * 1000) / 1000}</td>
      <td>${Math.round((matrix[3][2] + Number.EPSILON) * 1000) / 1000}</td>
      <td>${Math.round((matrix[3][3] + Number.EPSILON) * 1000) / 1000}</td>
      <td>${Math.round((matrix[3][4] + Number.EPSILON) * 1000) / 1000}</td>
      <td>${Math.round((matrix[3][5] + Number.EPSILON) * 1000) / 1000}</td>
      <td>${Math.round((matrix[3][6] + Number.EPSILON) * 1000) / 1000}</td>
      <td>${Math.round((matrix[3][7] + Number.EPSILON) * 1000) / 1000}</td>
      <td>${Math.round((matrix[3][8] + Number.EPSILON) * 1000) / 1000}</td>
      <td>${Math.round((matrix[3][9] + Number.EPSILON) * 1000) / 1000}</td>
      <td>${Math.round((matrix[3][10] + Number.EPSILON) * 1000) / 1000}</td>
    </tr>
        <tr>
      <td>${Math.round((matrix[4][0] + Number.EPSILON) * 1000) / 1000}</td>
      <td>${Math.round((matrix[4][1] + Number.EPSILON) * 1000) / 1000}</td>
      <td>${Math.round((matrix[4][2] + Number.EPSILON) * 1000) / 1000}</td>
      <td>${Math.round((matrix[4][3] + Number.EPSILON) * 1000) / 1000}</td>
      <td>${Math.round((matrix[4][4] + Number.EPSILON) * 1000) / 1000}</td>
      <td>${Math.round((matrix[4][5] + Number.EPSILON) * 1000) / 1000}</td>
      <td>${Math.round((matrix[4][6] + Number.EPSILON) * 1000) / 1000}</td>
      <td>${Math.round((matrix[4][7] + Number.EPSILON) * 1000) / 1000}</td>
      <td>${Math.round((matrix[4][8] + Number.EPSILON) * 1000) / 1000}</td>
      <td>${Math.round((matrix[4][9] + Number.EPSILON) * 1000) / 1000}</td>
      <td>${Math.round((matrix[4][10] + Number.EPSILON) * 1000) / 1000}</td>
    </tr>
        <tr>
      <td>${Math.round((matrix[5][0] + Number.EPSILON) * 1000) / 1000}</td>
      <td>${Math.round((matrix[5][1] + Number.EPSILON) * 1000) / 1000}</td>
      <td>${Math.round((matrix[5][2] + Number.EPSILON) * 1000) / 1000}</td>
      <td>${Math.round((matrix[5][3] + Number.EPSILON) * 1000) / 1000}</td>
      <td>${Math.round((matrix[5][4] + Number.EPSILON) * 1000) / 1000}</td>
      <td>${Math.round((matrix[5][5] + Number.EPSILON) * 1000) / 1000}</td>
      <td>${Math.round((matrix[5][6] + Number.EPSILON) * 1000) / 1000}</td>
      <td>${Math.round((matrix[5][7] + Number.EPSILON) * 1000) / 1000}</td>
      <td>${Math.round((matrix[5][8] + Number.EPSILON) * 1000) / 1000}</td>
      <td>${Math.round((matrix[5][9] + Number.EPSILON) * 1000) / 1000}</td>
      <td>${Math.round((matrix[5][10] + Number.EPSILON) * 1000) / 1000}</td>
    </tr>
  </tbody>
</table></div>
    `;
};
