const materiasPorCiclo = {
  "Ciclo 1": ["Matemática", "Biología General", "Física Básica", "Química General"],
  "Ciclo 2": ["Botánica I", "Estadística General", "Geografía Física", "Zoología I"],
  "Ciclo 3": ["Métodos de Investigación I", "Botánica II", "Zoología II", "Química Orgánica General"],
  "Ciclo 4": ["Bioquímica", "Anatomía Comparada de Cordados", "Química Analítica Básica", "Anatomía y Morfología Vegetal"],
  "Ciclo 5": ["Fisiología Animal", "Fisiología Vegetal", "Filosofía General", "Biología Celular y Molecular"],
  "Ciclo 6": ["Hidrobiología General", "Genética", "Sociología General", "Inglés Técnico"],
  "Ciclo 7": ["Ecología General", "Acuicultura General", "Historia Económica de El Salvador y Centroamérica", "Optativa 1"],
  "Ciclo 8": ["Manejo de Recursos Naturales", "Microbiología General", "Educación Ambiental", "Evolución"],
  "Ciclo 9": ["Formulación y Evaluación de Proyectos", "Evaluación de Impacto Ambiental", "Optativa 2", "Optativa 3"],
  "Ciclo 10": ["Seminario de Investigación", "Métodos de Investigación II", "Optativa 4"]
};

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

  for (const ciclo in materiasPorCiclo) {
    const bloque = document.createElement("div");
    bloque.className = "ciclo";

    const titulo = document.createElement("h2");
    titulo.textContent = ciclo;
    bloque.appendChild(titulo);

    const materiasDiv = document.createElement("div");
    materiasDiv.className = "materias";

    materiasPorCiclo[ciclo].forEach(materia => {
      const btn = document.createElement("button");
      btn.textContent = materia;
      btn.className = "materia";
      btn.disabled = materias[materia].length > 0;
      btn.id = materia;
      btn.onclick = () => toggleAprobada(materia);
      materiasDiv.appendChild(btn);
    });

    bloque.appendChild(materiasDiv);
    contenedor.appendChild(bloque);
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
