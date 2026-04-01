let score = 0;
let questionActuelle = 1;

const bonnesReponses = {
  1: "2",
  2: "1",
  3: "1",
  4: "0",
  5: "2",
  6: "1",
  7: "2",
  8: "0",
  9: "3",
  10: "2",
};

const explications = {
  1: "JavaScript sert à rendre une page web interactive (animations, clics, etc.).",
  2: "La syntaxe moderne utilise 'let' ou 'const'. Ici la bonne réponse est 'let'.",
  3: '"42" est une chaîne de caractères (string) car il est entre guillemets.',
  4: "Le JavaScript s’exécute principalement dans le navigateur de l’utilisateur.",
  5: "'const' permet de déclarer une constante.",
  6: "console.log() affiche un message dans la console du navigateur.",
  7: "Un Boolean ne peut être que true ou false.",
  8: "DOM signifie Document Object Model.",
  9: "document.getElementById() permet de sélectionner un élément par son id.",
  10: "Sans return, une fonction renvoie undefined.",
};

// 🔹 Affiche une question
function afficherQuestion(numero) {
  // Cache toutes les questions
  document.querySelectorAll("section").forEach((q) => {
    q.style.display = "none";
  });

  // Affiche la bonne
  const question = document.querySelector(`.question${numero}`);
  if (question) question.style.display = "block";

  // Met à jour le numéro
  document.getElementById("num-question").textContent = numero;

  // Désactive bouton suivant
  document.getElementById("btn-suivant").disabled = true;

  // Nettoie les explications
  document.querySelectorAll(".explication").forEach((e) => {
    e.textContent = "";
  });
}

// 🔹 Valide la réponse
function validerReponse() {
  const reponse = document.querySelector(
    `input[name="reponse${questionActuelle}"]:checked`,
  );

  if (!reponse) {
    alert("Choisis une réponse !");
    return;
  }

  const explicationDiv = document.querySelector(
    `.question${questionActuelle} .explication`,
  );

  if (reponse.value === bonnesReponses[questionActuelle]) {
    score++;
    explicationDiv.textContent =
      "✅ Bonne réponse ! " + explications[questionActuelle];
    explicationDiv.style.color = "green";
  } else {
    explicationDiv.textContent =
      "❌ Mauvaise réponse. " + explications[questionActuelle];
    explicationDiv.style.color = "red";
  }

  // Désactive les choix après validation
  document
    .querySelectorAll(`input[name="reponse${questionActuelle}"]`)
    .forEach((r) => (r.disabled = true));

  // Active bouton suivant
  document.getElementById("btn-suivant").disabled = false;
}

// 🔹 Passe à la question suivante
function nextQuestion() {
  questionActuelle++;

  if (questionActuelle > 10) {
    alert(`Score final : ${score}/10`);
    return;
  }

  afficherQuestion(questionActuelle);
}

// 🔹 Démarrage
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("btn-valider")
    .addEventListener("click", validerReponse);

  document
    .getElementById("btn-suivant")
    .addEventListener("click", nextQuestion);

  afficherQuestion(1);
});
