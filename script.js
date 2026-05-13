let solveFor = 'c1';

function setSolve(variable, btn) {
  solveFor = variable;

  document.querySelectorAll('.solve-btn').forEach(button => {
    button.classList.remove('active');
  });

  btn.classList.add('active');

  updateResultUnitOptions();
}

// ----------------------------
// Update Result Unit Dropdown
// ----------------------------
function updateResultUnitOptions() {

  const resultUnit = document.getElementById("resultUnit");

  resultUnit.innerHTML = "";

  let units = [];

  // Concentration Units
  if (solveFor === "c1" || solveFor === "c2") {
    units = [
      { text: "M", value: 1 },
      { text: "mM", value: 0.001 },
      { text: "µM", value: 0.000001 },
      { text: "nM", value: 0.000000001 }
    ];
  }

  // Volume Units
  else {
    units = [
      { text: "L", value: 1 },
      { text: "mL", value: 0.001 },
      { text: "µL", value: 0.000001 },
      { text: "nL", value: 0.000000001 }
    ];
  }

  units.forEach(unit => {
    const option = document.createElement("option");
    option.text = unit.text;
    option.value = unit.value;
    resultUnit.appendChild(option);
  });
}

function calculate() {

  const c1 = parseFloat(document.getElementById('c1').value);
  const v1 = parseFloat(document.getElementById('v1').value);
  const c2 = parseFloat(document.getElementById('c2').value);
  const v2 = parseFloat(document.getElementById('v2').value);

  const c1Unit = parseFloat(document.getElementById('c1Unit').value);
  const v1Unit = parseFloat(document.getElementById('v1Unit').value);
  const c2Unit = parseFloat(document.getElementById('c2Unit').value);
  const v2Unit = parseFloat(document.getElementById('v2Unit').value);

  const resultUnitValue = parseFloat(document.getElementById('resultUnit').value);
  const resultUnitText =
    document.getElementById('resultUnit').selectedOptions[0].text;

  const C1 = c1 * c1Unit;
  const V1 = v1 * v1Unit;
  const C2 = c2 * c2Unit;
  const V2 = v2 * v2Unit;

  let result = 0;

  // Result in base SI unit
  if (solveFor === 'c1') {
    result = (C2 * V2) / V1;
  }

  else if (solveFor === 'v1') {
    result = (C2 * V2) / C1;
  }

  else if (solveFor === 'c2') {
    result = (C1 * V1) / V2;
  }

  else if (solveFor === 'v2') {
    result = (C1 * V1) / C2;
  }

  // Convert to user's chosen output unit
  result = result / resultUnitValue;

  const resultBox = document.getElementById('resultBox');
  const resultText = document.getElementById('resultText');

  resultBox.style.display = 'block';

  resultText.innerHTML =
    solveFor.toUpperCase() +
    ' = ' +
    result.toFixed(6) +
    ' ' +
    resultUnitText;
}

// Initialize Dropdown
updateResultUnitOptions();