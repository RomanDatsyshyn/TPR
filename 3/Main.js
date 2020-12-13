const showResults = () => {
  let votersNum = [];
  let benefits = [];

  for (let i = 0; i < 5; i++) {
    votersNum.push(parseFloat(document.getElementById(`input1_${i}`).value));
    benefits.push([]);

    for (let j = 0; j < 3; j++) {
      document.getElementById(`input2_${i}${j}`).value.toUpperCase() == "A"
        ? benefits[i].push(0)
        : null;

      document.getElementById(`input2_${i}${j}`).value.toUpperCase() == "B"
        ? benefits[i].push(1)
        : null;

      document.getElementById(`input2_${i}${j}`).value.toUpperCase() == "C"
        ? benefits[i].push(2)
        : null;
    }
  }

  let arr = ["A", "B", "C"];
  let Borda = BordaCount(votersNum, benefits);
  let Сondorcet = CondorcetParadox(votersNum, benefits);

  let html = `
     <div class="container2">
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Кондорсе</th>
              <th scope="col">Борда</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${Сondorcet[0]} > ${Сondorcet[1]} > ${Сondorcet[2]}</td>
              <td>A = ${Borda[0]}, B = ${Borda[1]}, C = ${Borda[2]}</td>
            </tr>
            <tr>
              <td>${Сondorcet[0]}</td>
              <td>${arr[Borda.indexOf(Math.max(...Borda))]}</td>
            </tr>
          </tbody>
        </table>
      </div>
      `;

  document.getElementById(`tableContainer`).innerHTML = html;
};

const BordaCount = (votersNum, benefits) => {
  let arr = [3, 2, 1];
  let result = [0, 0, 0];

  for (let i = 0; i < benefits.length; i++) {
    result[0] += arr[benefits[i].indexOf(0)] * votersNum[i];
    result[1] += arr[benefits[i].indexOf(1)] * votersNum[i];
    result[2] += arr[benefits[i].indexOf(2)] * votersNum[i];
  }

  return result;
};

const CondorcetParadox = (votersNum, benefits) => {
  let AB = 0;
  let AC = 0;
  let BC = 0;

  for (let i = 0; i < benefits.length; i++) {
    benefits[i].indexOf(0) < benefits[i].indexOf(1)
      ? (AB += votersNum[i])
      : (AB -= votersNum[i]);
    benefits[i].indexOf(0) < benefits[i].indexOf(2)
      ? (AC += votersNum[i])
      : (AC -= votersNum[i]);
    benefits[i].indexOf(1) < benefits[i].indexOf(2)
      ? (BC += votersNum[i])
      : (BC -= votersNum[i]);
  }

  if (AB < 0 && AC < 0 && BC < 0) return ["C", "B", "A"];
  if (AB < 0 && AC < 0 && BC > 0) return ["B", "C", "A"];

  if (AB < 0 && AC > 0 && BC > 0) return ["B", "A", "C"];
  if (AB > 0 && AC < 0 && BC < 0) return ["C", "A", "B"];

  if (AB > 0 && AC > 0 && BC < 0) return ["A", "C", "B"];
  if (AB > 0 && AC > 0 && BC > 0) return ["A", "B", "C"];

  if (AB < 0 && AC > 0 && BC < 0) return 0;
  if (AB > 0 && AC < 0 && BC > 0) return 0;

  if (AB == 0 || AC == 0 || BC == 0) return 0;
};
