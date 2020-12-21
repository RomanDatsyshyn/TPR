let weights = [];
let data = [];

let maxValues = [];
let sumValues = [];
let maxOfSumValues = 0;

const showResults = () => {
  parseData();
  convertToDecimalMarkSystem();
  findMaxValues();
  sumObjectValues();
  findMaxOfSumValues();
  pasteTableToTHML();
};

const parseData = () => {
  for (let i = 1; i < 6; i++) {
    weights.push(parseFloat(document.getElementById(`weight_${i}`).value));

    data.push({
      price: parseFloat(document.getElementById(`input${i}_1`).value),
      squareMeters: parseFloat(document.getElementById(`input${i}_2`).value),
      acresOfLand: parseFloat(document.getElementById(`input${i}_3`).value),
      kmToTheСenter: parseFloat(document.getElementById(`input${i}_4`).value),
      bedrooms: parseFloat(document.getElementById(`input${i}_5`).value),
    });
  }
};

const convertToDecimalMarkSystem = () => {
  for (let i = 0; i < data.length; i++) {
    data[i].price = (convertPrice(data[i].price) * weights[0]).toFixed(2);
    data[i].squareMeters = (
      convertMeters(data[i].squareMeters) * weights[1]
    ).toFixed(2);
    data[i].acresOfLand = (
      convertAcres(data[i].acresOfLand) * weights[2]
    ).toFixed(2);
    data[i].kmToTheСenter = (
      convertKm(data[i].kmToTheСenter) * weights[3]
    ).toFixed(2);
    data[i].bedrooms = (convertbedrooms(data[i].bedrooms) * weights[4]).toFixed(
      2
    );
  }
};

const convertPrice = (price) => {
  if (price < 100) return 10;
  if (price >= 100 && price < 150) return 8;
  if (price >= 150 && price < 200) return 6;
  if (price >= 200 && price < 250) return 4;
  if (price >= 300 && price < 350) return 2;
  if (price >= 400) return 1;
};

const convertMeters = (meters) => {
  if (meters < 100) return 1;
  if (meters >= 100 && meters < 120) return 2;
  if (meters >= 120 && meters < 150) return 3;
  if (meters >= 150 && meters < 170) return 4;
  if (meters >= 170 && meters < 200) return 5;
  if (meters >= 200 && meters < 220) return 6;
  if (meters >= 220 && meters < 250) return 7;
  if (meters >= 250 && meters < 270) return 8;
  if (meters >= 300 && meters < 350) return 9;
  if (meters >= 350) return 10;
};

const convertAcres = (acres) => {
  if (acres < 3) return 2;
  if (acres >= 3 && acres < 5) return 3;
  if (acres >= 5 && acres < 8) return 4;
  if (acres >= 8 && acres < 10) return 5;
  if (acres >= 10 && acres < 12) return 6;
  if (acres >= 12 && acres < 15) return 7;
  if (acres >= 15 && acres < 17) return 8;
  if (acres >= 17 && acres < 20) return 9;
  if (acres >= 20) return 10;
};

const convertKm = (km) => {
  if (km < 8) return 10;
  if (km >= 8 && km < 10) return 9;
  if (km >= 10 && km < 12) return 8;
  if (km >= 12 && km < 15) return 7;
  if (km >= 15 && km < 17) return 6;
  if (km >= 17 && km < 20) return 5;
  if (km >= 20 && km < 25) return 4;
  if (km >= 25 && km < 30) return 3;
  if (km >= 30) return 2;
};

const convertbedrooms = (bedrooms) => {
  if (bedrooms == 1) return 2;
  if (bedrooms == 2) return 4;
  if (bedrooms == 3) return 6;
  if (bedrooms == 4) return 8;
  if (bedrooms > 4) return 10;
};

const findMaxValues = () => {
  let maxPrice = -1;
  let maxMeters = -1;
  let maxAcres = -1;
  let maxkm = -1;
  let maxBedrooms = -1;

  for (let i = 0; i < data.length; i++) {
    if (data[i].price > maxPrice) maxPrice = data[i].price;
    if (data[i].squareMeters > maxMeters) maxMeters = data[i].squareMeters;
    if (data[i].acresOfLand > maxAcres) maxAcres = data[i].acresOfLand;
    if (data[i].kmToTheСenter > maxkm) maxkm = data[i].kmToTheСenter;
    if (data[i].bedrooms > maxBedrooms) maxBedrooms = data[i].bedrooms;
  }

  maxValues.push(maxPrice);
  maxValues.push(maxMeters);
  maxValues.push(maxAcres);
  maxValues.push(maxkm);
  maxValues.push(maxBedrooms);
};

const sumObjectValues = () => {
  for (let i = 0; i < data.length; i++) {
    let sum = 0;

    sum +=
      Number(data[i].price) +
      Number(data[i].squareMeters) +
      Number(data[i].acresOfLand) +
      Number(data[i].kmToTheСenter) +
      Number(data[i].bedrooms);

    sumValues.push(sum.toFixed(2));
  }
};

const findMaxOfSumValues = () => {
  let max = 0;

  for (let i = 0; i < sumValues.length; i++) {
    if (sumValues[i] > max) max = sumValues[i];
  }

  maxOfSumValues = max;
};

const pasteTableToTHML = () => {
  let html = `
     <div class="container-fluid">
     <div style="margin: 0 auto">
            <div class="input-group input-group-lg">
              <p class="form-control col-1 text-center alert-secondary">№</p>
              <p class="form-control col-4 text-center alert-secondary">Параметр</p>
              <p class="form-control col-1 text-center alert-secondary">Вага</p>
              <p class="form-control col-1 text-center alert-secondary">А</p>
              <p class="form-control col-1 text-center alert-secondary">Б</p>
              <p class="form-control col-1 text-center alert-secondary">В</p>
              <p class="form-control col-1 text-center alert-secondary">Г</p>
              <p class="form-control col-1 text-center alert-secondary">Д</p>
              <p class="form-control col-1 text-center alert-secondary">E</p>
            </div>

            <div class="input-group input-group-lg">
              <p class="form-control col-1 text-center alert-secondary">1</p>
              <p class="form-control col-4 text-center">Ціна (тисяч $)</p>
              <p class="form-control col-1 text-center alert-secondary">${
                weights[0]
              }</p>
              <p class="form-control col-1 text-center">${data[0].price}</p>
              <p class="form-control col-1 text-center">${data[1].price}</p>
              <p class="form-control col-1 text-center">${data[2].price}</p>
              <p class="form-control col-1 text-center">${data[3].price}</p>
              <p class="form-control col-1 text-center">${data[4].price}</p>
              <p class="form-control col-1 text-center">${maxValues[0]}</p>
            </div>

            <div class="input-group input-group-lg">
              <p class="form-control col-1 text-center alert-secondary">2</p>
              <p class="form-control col-4 text-center">К-ть метрів квадратних</p>
              <p class="form-control col-1 text-center alert-secondary">${
                weights[1]
              }</p>
              <p class="form-control col-1 text-center">${
                data[0].squareMeters
              }</p>
              <p class="form-control col-1 text-center">${
                data[1].squareMeters
              }</p>
              <p class="form-control col-1 text-center">${
                data[2].squareMeters
              }</p>
              <p class="form-control col-1 text-center">${
                data[3].squareMeters
              }</p>
              <p class="form-control col-1 text-center">${
                data[4].squareMeters
              }</p>
              <p class="form-control col-1 text-center">${maxValues[1]}</p>
            </div>

            <div class="input-group input-group-lg">
              <p class="form-control col-1 text-center alert-secondary">3</p>
              <p class="form-control col-4 text-center">К-ть соток ділянки</p>
              <p class="form-control col-1 text-center alert-secondary">${
                weights[2]
              }</p>
              <p class="form-control col-1 text-center">${
                data[0].acresOfLand
              }</p>
              <p class="form-control col-1 text-center">${
                data[1].acresOfLand
              }</p>
              <p class="form-control col-1 text-center">${
                data[2].acresOfLand
              }</p>
              <p class="form-control col-1 text-center">${
                data[3].acresOfLand
              }</p>
              <p class="form-control col-1 text-center">${
                data[4].acresOfLand
              }</p>
              <p class="form-control col-1 text-center">${maxValues[2]}</p>
            </div>

            <div class="input-group input-group-lg">
              <p class="form-control col-1 text-center alert-secondary">4</p>
              <p class="form-control col-4 text-center">К-ть км до центра міста</p>
              <p class="form-control col-1 text-center alert-secondary">${
                weights[3]
              }</p>
              <p class="form-control col-1 text-center">${
                data[0].kmToTheСenter
              }</p>
              <p class="form-control col-1 text-center">${
                data[1].kmToTheСenter
              }</p>
              <p class="form-control col-1 text-center">${
                data[2].kmToTheСenter
              }</p>
              <p class="form-control col-1 text-center">${
                data[3].kmToTheСenter
              }</p>
              <p class="form-control col-1 text-center">${
                data[4].kmToTheСenter
              }</p>
              <p class="form-control col-1 text-center">${maxValues[3]}</p>
            </div>

            <div class="input-group input-group-lg">
              <p class="form-control col-1 text-center alert-secondary">5</p>
              <p class="form-control col-4 text-center">Кількість спалень</p>
              <p class="form-control col-1 text-center alert-secondary">${
                weights[4]
              }</p>
              <p class="form-control col-1 text-center">${data[0].bedrooms}</p>
              <p class="form-control col-1 text-center">${data[1].bedrooms}</p>
              <p class="form-control col-1 text-center">${data[2].bedrooms}</p>
              <p class="form-control col-1 text-center">${data[3].bedrooms}</p>
              <p class="form-control col-1 text-center">${data[4].bedrooms}</p>
              <p class="form-control col-1 text-center">${maxValues[4]}</p>
            </div>

            <div class="input-group input-group-lg">
              <p class="form-control col-1 text-center alert-secondary">Сума</p>
              <p class="form-control col-4 text-center"></p>
              <p class="form-control col-1 text-center alert-secondary">1</p>
              <p class="form-control col-1 text-center ${
                maxOfSumValues == sumValues[0] ? "alert-success" : ""
              }">${sumValues[0]}</p>
              <p class="form-control col-1 text-center  ${
                maxOfSumValues == sumValues[1] ? "alert-success" : ""
              }">${sumValues[1]}</p>
              <p class="form-control col-1 text-center  ${
                maxOfSumValues == sumValues[2] ? "alert-success" : ""
              }">${sumValues[2]}</p>
              <p class="form-control col-1 text-center  ${
                maxOfSumValues == sumValues[3] ? "alert-success" : ""
              }">${sumValues[3]}</p>
              <p class="form-control col-1 text-center  ${
                maxOfSumValues == sumValues[4] ? "alert-success" : ""
              }">${sumValues[4]}</p>
              <p class="form-control col-1 text-center"></p>
            </div>
            </div>
      </div>
      `;

  document.getElementById(`tableContainer`).innerHTML = html;
};
