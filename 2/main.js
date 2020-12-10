const getResult = () => {
  let getHtmlValue = document.getElementById("data").value;
  let data = getHtmlValue.split(",").map(String);

  let arr = [];

  // -----------А------------/

  let mA = data[0];
  let dA = [data[1], data[3]];
  let pA = [data[2], data[4]];

  // -----------Б------------/

  let mB = data[5];
  let dB = [data[6], data[8]];
  let pB = [data[7], data[9]];

  // -----------В------------/

  let pC = [data[10], data[11], data[12], data[13]];

  // ----------------------- //

  arr.push({
    value: (dA[0] * pA[0] + dA[1] * pA[1]) * 5 - mA,
    max: dA[0] * 5 - mA,
    min: dA[1] * 5 - mA,
  });

  arr.push({
    value: (dB[0] * pB[0] + dB[1] * pB[1]) * 5 - mB,
    max: dB[0] * 5 - mB,
    min: dB[1] * 5 - mB,
  });

  arr.push({
    value: (dA[0] * pC[2] + dA[1] * pC[3]) * 4 - mA,
    max: dA[0] * 4 - mA,
    min: dA[1] * 4 - mA,
  });

  arr.push({
    value: (dB[0] * pC[2] + dB[1] * pC[3]) * 4 - mB,
    max: dB[0] * 4 - mB,
    min: dB[1] * 4 - mB,
  });

  arr.push({
    value: Math.max(arr[2].value, arr[3].value) * pC[0],
    max: Math.max(arr[2].value, arr[3].value),
    min: 0,
  });

  // --------
  let r = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[r].value < arr[i].value) r = i;
  }
  // --------

  document.getElementById(`tableContainer`).innerHTML = html(
    arr,
    pA,
    pB,
    pC,
    r
  );
};

const html = (arr, pA, pB, pC, r) => {
  return `<div class="tf-tree example">
      <ul>
        <li>
          <span class="tf-nc">Рішення</span>
          <ul>
            <li>
              <span class="tf-nc ${
                r == 0 ? "alert-success" : null
              }">Великий завод (${arr[0].value})</span>
              <ul>
                    <li><span class="tf-nc">Високий попит (${pA[0]})</span>
                     <ul>
                    <li><span class="tf-nc">${arr[0].max}</span></li>
                  </ul>
                </li>
                    </li>
                    <li><span class="tf-nc">Низький попит (${pA[1]})</span>
                                         <ul>
                    <li><span class="tf-nc">${arr[0].min}</span></li>
                  </ul>
                    </li>
                  </ul>
                </li>
            </li>
            <li>
              <span class="tf-nc ${
                r == 1 ? "alert-success" : null
              }">Малий завод (${arr[1].value})</span>
              <ul>
                    <li><span class="tf-nc">Високий попит (${pB[0]})</span>
                                         <ul>
                    <li><span class="tf-nc">${arr[1].max}</span></li>
                  </ul>
                    </li>
                    <li><span class="tf-nc">Низький попит (${pB[1]})</span>
                                         <ul>
                    <li><span class="tf-nc">${arr[1].min}</span></li>
                  </ul>
                    </li>
                  </ul>
                </li>
            </li>
            <li>
              <span class="tf-nc">Відкласти (${arr[4].value})</span>
                  <ul>

                    <li><span class="tf-nc  ${
                      r == 2 ? "alert-success" : null
                    }">Великий завод (${arr[2].value})</span>
                                  <ul>
                    <li><span class="tf-nc">Високий попит (${pC[0]})</span>
                                         <ul>
                    <li><span class="tf-nc">${arr[2].max}</span></li>
                  </ul>
                    </li>
                    <li><span class="tf-nc">Низький попит (${pC[1]})</span>
                                         <ul>
                    <li><span class="tf-nc">${arr[2].min}</span></li>
                  </ul>
                    </li>
                  </ul>
                    </li>
                    <li><span class="tf-nc  ${
                      r !== 0 && r !== 1 && r !== 2 ? "alert-success" : null
                    }">Малий завод (${arr[3].value})</span>
                                  <ul>
                    <li><span class="tf-nc">Високий попит (${pC[0]})</span>
                                         <ul>
                    <li><span class="tf-nc">${arr[3].max}</span></li>
                  </ul>
                    </li>
                    <li><span class="tf-nc">Низький попит (${pC[1]})</span>
                                         <ul>
                    <li><span class="tf-nc">${arr[3].min}</span></li>
                  </ul>
                    </li>
                  </ul>
                    </li>
                  </ul>
                    </li>

                    <li>
                        
                    <li><span class="tf-nc">${arr[4].min}</span></li>
                    </li>
            </li>
          </ul>
        </li>
      </ul>
    </div>`;
};
