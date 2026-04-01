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

function afficherQuestion(numero) {
  document
    .querySelectorAll("section")
    .forEach((q) => (q.style.display = "none"));

  const question = document.querySelector(`.question${numero}`);
  if (question) question.style.display = "block";

  document.getElementById("num-question").textContent = numero;

  document.getElementById("btn-suivant").disabled = true;
}

function validerReponse() {
  const reponse = document.querySelector(
    `input[name="reponse${questionActuelle}"]:checked`,
  );

  if (!reponse) {
    alert("Choisis une réponse !");
    return;
  }

  if (reponse.value === bonnesReponses[questionActuelle]) {
    score++;
  }

  // Désactive les radios après validation
  document
    .querySelectorAll(`input[name="reponse${questionActuelle}"]`)
    .forEach((r) => (r.disabled = true));

  document.getElementById("btn-suivant").disabled = false;
}

function nextQuestion() {
  questionActuelle++;

  if (questionActuelle > 10) {
    alert(`Score final : ${score}/10`);
    return;
  }

  afficherQuestion(questionActuelle);
}

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("btn-valider")
    .addEventListener("click", validerReponse);
  document
    .getElementById("btn-suivant")
    .addEventListener("click", nextQuestion);

  afficherQuestion(1);
});
