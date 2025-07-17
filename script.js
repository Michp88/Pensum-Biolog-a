
const materias = {
  "Matemática": [],
  "Biología General": [],
  "Física Básica": [],
  "Química General": [],

  "Botánica I": ["Biología General"],
  "Estadística General": ["Matemática"],
  "Geografía Física": ["Física Básica", "Química General", "Biología General"],
  "Zoología I": ["Biología General"],

  "Métodos de Investigación I": ["Estadística General"],
  "Botánica II": ["Botánica I", "Geografía Física"],
  "Zoología II": ["Geografía Física", "Zoología I"],
  "Química Orgánica General": ["Química General"],

  "Bioquímica": ["Química Orgánica General"],
  "Anatomía Comparada de Cordados": ["Zoología II"],
  "Química Analítica Básica": ["Química General"],
  "Anatomía y Morfología Vegetal": ["Botánica II"],

  "Fisiología Animal": ["Anatomía Comparada de Cordados", "Bioquímica"],
  "Fisiología Vegetal": ["Anatomía y Morfología Vegetal", "Bioquímica"],
  "Filosofía General": [],
  "Biología Celular y Molecular": ["Bioquímica"],

  "Hidrobiología General": ["Botánica I", "Química Analítica Básica", "Zoología I"],
  "Genética": ["Bioquímica", "Estadística General"],
  "Sociología General": [],
  "Inglés Técnico": [],

  "Ecología General": ["Botánica II", "Geografía Física", "Zoología II"],
  "Acuicultura General": ["Hidrobiología General"],
  "Historia Económica de El Salvador y Centroamérica": ["Filosofía General", "Sociología General"],
  "Optativa 1": [],

  "Manejo de Recursos Naturales": [],
  "Microbiología General": ["Bioquímica", "Botánica I", "Zoología I"],
  "Educación Ambiental": ["Ecología General"],
  "Evolución": ["Ecología General", "Genética"],

  "Formulación y Evaluación de Proyectos": [],
  "Evaluación de Impacto Ambiental": ["Manejo de Recursos Naturales"],
  "Optativa 2": [],
  "Optativa 3": [],

  "Seminario de Investigación": [],
  "Métodos de Investigación II": ["Métodos de Investigación I"],
  "Optativa 4": []
};

const aprobadas = new Set();

function crearMalla() {
  const contenedor = document.getElementById("malla");

  for (const materia in materias) {
    const btn = document.createElement("button");
    btn.textContent = materia;
    btn.className = "materia";
    btn.disabled = materias[materia].length > 0;
    btn.id = materia;
    btn.onclick = () => toggleAprobada(materia);
    contenedor.appendChild(btn);
  }
}

function toggleAprobada(materia) {
  const btn = document.getElementById(materia);
  if (aprobadas.has(materia)) {
    aprobadas.delete(materia);
    btn.classList.remove("aprobada");
  } else {
    aprobadas.add(materia);
    btn.classList.add("aprobada");
  }
  actualizarEstado();
}

function actualizarEstado() {
  for (const materia in materias) {
    const requisitos = materias[materia];
    const btn = document.getElementById(materia);
    if (requisitos.every(req => aprobadas.has(req))) {
      btn.disabled = false;
    } else if (!aprobadas.has(materia)) {
      btn.disabled = true;
    }
  }
}

crearMalla();
