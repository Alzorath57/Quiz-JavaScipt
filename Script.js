let score = 0;
let questionActuelle = 0;

function recupererQuestionsHTML() {
  const toutesLesQuestions = [];

  for (let i = 1; i < 10; i++) {
    const questionElement = document.querySelector(`.question${i}`);
    toutesLesQuestions.push(questionElement);
  }
  return toutesLesQuestions;
}

function afficherQuestion(numero) {
  document
    .querySelectorAll(
      ".question1, .question2, .question3, .question4, .question5, .question6, .question7, .question8, .question9, .question10"
    )
    .forEach((q) => (q.style.display = "none"));

  // Affiche seulement la question numero
  document.querySelector(`.question${numero}`).style.display = "block";
}

// Démarre le quiz
afficherQuestion(1);
