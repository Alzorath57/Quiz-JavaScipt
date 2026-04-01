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
  2: "La syntaxe moderne utilise 'let' ou 'const'.",
  3: '"42" est une chaîne de caractères (string).',
  4: "JavaScript s’exécute principalement dans le navigateur.",
  5: "'const' permet de déclarer une constante.",
  6: "console.log() affiche un message dans la console.",
  7: "Un Boolean est true ou false.",
  8: "DOM signifie Document Object Model.",
  9: "getElementById() permet de sélectionner un élément par son id.",
  10: "Sans return, une fonction renvoie undefined.",
};

// 🔹 Afficher une question
function afficherQuestion(numero) {
  // cacher toutes les questions
  document.querySelectorAll("section").forEach((q) => {
    q.style.display = "none";
  });

  // afficher la bonne question
  const question = document.querySelector(`.question${numero}`);
  if (question) question.style.display = "block";

  // mettre à jour compteur
  document.getElementById("num-question").textContent = numero;

  // reset UI
  document.getElementById("btn-suivant").disabled = true;
  document.getElementById("btn-valider").disabled = false;

  // reset explications
  document.querySelectorAll(".explication").forEach((e) => {
    e.textContent = "";
    e.style.color = "";
  });
}

// 🔹 Valider réponse
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

  // éviter double validation
  const inputs = document.querySelectorAll(
    `input[name="reponse${questionActuelle}"]`,
  );

  inputs.forEach((i) => (i.disabled = true));
  document.getElementById("btn-valider").disabled = true;
  document.getElementById("btn-suivant").disabled = false;

  // correction
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
}

// 🔹 Question suivante
function nextQuestion() {
  questionActuelle++;

  if (questionActuelle > 10) {
    afficherResultat();
    return;
  }

  afficherQuestion(questionActuelle);
}

// 🔹 Affichage résultat final
function afficherResultat() {
  document.querySelector(".quiz-container").innerHTML = `
    <h2>🎉 Quiz terminé !</h2>
    <p>Ton score final est : <strong>${score}/10</strong></p>
    <button id="btn-restart">Recommencer</button>
  `;

  document.getElementById("btn-restart").addEventListener("click", restartQuiz);
}

// 🔹 Restart
function restartQuiz() {
  score = 0;
  questionActuelle = 1;

  location.reload(); // solution simple et propre
}

// 🔹 Init
document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("btn-valider")
    .addEventListener("click", validerReponse);

  document
    .getElementById("btn-suivant")
    .addEventListener("click", nextQuestion);

  document.getElementById("btn-restart").addEventListener("click", restartQuiz);

  afficherQuestion(1);
});
