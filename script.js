// CALCULADORA DE PROMEDIO
const gradesDiv = document.getElementById("grades");
const avgSpan = document.getElementById("average");

function addGrade() {
  const row = document.createElement("div");
  row.innerHTML = `
    <input type="number" placeholder="Nota (ej: 8.5)">
    <input type="number" placeholder="Peso (%)">
  `;
  row.querySelectorAll("input").forEach(i => i.oninput = calculateAverage);
  gradesDiv.appendChild(row);
}

function calculateAverage() {
  let total = 0;
  let weightSum = 0;

  gradesDiv.querySelectorAll("div").forEach(row => {
    const inputs = row.querySelectorAll("input");
    const grade = parseFloat(inputs[0].value);
    const weight = parseFloat(inputs[1].value);

    if (!isNaN(grade) && !isNaN(weight)) {
      total += grade * weight;
      weightSum += weight;
    }
  });

  avgSpan.textContent = weightSum ? (total / weightSum).toFixed(2) : "0.00";
}

addGrade();

// CALCULADORA DE NOTA NECESARIA
function calculateNeeded() {
  const currentAvg = parseFloat(document.getElementById("currentAvg").value);
  const currentWeight = parseFloat(document.getElementById("currentWeight").value);
  const targetAvg = parseFloat(document.getElementById("targetAvg").value);
  const finalWeight = parseFloat(document.getElementById("finalWeight").value);

  if (currentWeight + finalWeight !== 100) {
    alert("La suma de los pesos debe ser 100%");
    return;
  }

  const needed =
    (targetAvg - (currentAvg * currentWeight / 100)) / (finalWeight / 100);

  document.getElementById("neededGrade").textContent =
    needed > 0 ? needed.toFixed(2) : "Ya alcanzado";
}

// PLANIFICADOR SEMANAL (LOCALSTORAGE)
function savePlanner() {
  const inputs = document.querySelectorAll("table input");
  const data = Array.from(inputs).map(i => i.value);
  localStorage.setItem("planner", JSON.stringify(data));
  alert("Horario guardado correctamente");
}

function resetPlanner() {
  if (!confirm("¿Borrar todo el horario?")) return;
  localStorage.removeItem("planner");
  document.querySelectorAll("table input").forEach(i => i.value = "");
}

(function loadPlanner() {
  const data = JSON.parse(localStorage.getItem("planner") || "[]");
  document.querySelectorAll("table input").forEach((i, idx) => {
    i.value = data[idx] || "";
  });
})();
