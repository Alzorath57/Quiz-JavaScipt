let score = 0;
let questionActuelle = 1;
const TOTAL = 10;

const bonnesReponses = {
  1: "2", 2: "1", 3: "1", 4: "0", 5: "2",
  6: "1", 7: "2", 8: "0", 9: "3", 10: "2",
};

const explications = {
  1:  "JavaScript rend les pages web interactives (animations, clics, etc.).",
  2:  "La syntaxe moderne utilise 'let' pour une variable ou 'const' pour une constante.",
  3:  '"42" entre guillemets est une chaîne de caractères (String), pas un nombre.',
  4:  "JavaScript s'exécute dans le navigateur côté client.",
  5:  "'const' déclare une constante : sa valeur ne peut pas être réassignée.",
  6:  "console.log() affiche un message dans la console du navigateur (F12).",
  7:  "Un Boolean vaut true ou false — c'est un type primitif en JavaScript.",
  8:  "DOM = Document Object Model, la représentation de la page en arbre d'objets.",
  9:  "getElementById() sélectionne un élément unique via son attribut id.",
  10: "Sans return, une fonction renvoie automatiquement undefined.",
};

// ─── Utilitaires UI ───────────────────────────────────────────────────────────

function updateProgressBar() {
  const pct = ((questionActuelle - 1) / TOTAL) * 100;
  document.getElementById("progress-fill").style.width = pct + "%";
  document.getElementById("num-question").textContent = questionActuelle;
}

function updateScoreLive() {
  document.getElementById("score-live").textContent = score;
}

// ─── Afficher une question ────────────────────────────────────────────────────

function afficherQuestion(numero) {
  document.querySelectorAll(".question").forEach(q => q.style.display = "none");

  const q = document.querySelector(`.question${numero}`);
  if (q) q.style.display = "block";

  updateProgressBar();

  document.getElementById("btn-valider").disabled = false;
  document.getElementById("btn-suivant").disabled = true;

  // reset explication
  const exp = q && q.querySelector(".explication");
  if (exp) {
    exp.textContent = "";
    exp.className = "explication";
  }

  // reset labels
  if (q) {
    q.querySelectorAll("label").forEach(l => {
      l.classList.remove("correct", "wrong");
    });
  }
}

// ─── Valider réponse ─────────────────────────────────────────────────────────

function validerReponse() {
  const reponse = document.querySelector(
    `input[name="reponse${questionActuelle}"]:checked`
  );

  if (!reponse) {
    // Petit shake visuel sur les choix
    const choices = document.querySelector(`.question${questionActuelle} .choices`);
    choices.style.animation = "none";
    choices.offsetHeight; // reflow
    choices.style.animation = "shake 0.3s ease";
    return;
  }

  // Désactiver les inputs
  document.querySelectorAll(`input[name="reponse${questionActuelle}"]`)
    .forEach(i => i.disabled = true);
  document.getElementById("btn-valider").disabled = true;
  document.getElementById("btn-suivant").disabled = false;

  const estCorrect = reponse.value === bonnesReponses[questionActuelle];
  const explicationDiv = document.querySelector(`.question${questionActuelle} .explication`);

  // Colorier les labels
  document.querySelectorAll(`input[name="reponse${questionActuelle}"]`).forEach(input => {
    const label = input.closest("label");
    if (input.value === bonnesReponses[questionActuelle]) {
      label.classList.add("correct");
    } else if (input.checked && !estCorrect) {
      label.classList.add("wrong");
    }
  });

  // Explication
  if (estCorrect) {
    score++;
    updateScoreLive();
    explicationDiv.textContent = "✅ Bonne réponse ! " + explications[questionActuelle];
    explicationDiv.className = "explication show success";
  } else {
    explicationDiv.textContent = "❌ Mauvaise réponse. " + explications[questionActuelle];
    explicationDiv.className = "explication show error";
  }
}

// ─── Question suivante ────────────────────────────────────────────────────────

function nextQuestion() {
  questionActuelle++;
  if (questionActuelle > TOTAL) {
    afficherResultat();
  } else {
    afficherQuestion(questionActuelle);
  }
}

// ─── Résultat final ───────────────────────────────────────────────────────────

function afficherResultat() {
  // Barre à 100%
  document.getElementById("progress-fill").style.width = "100%";

  let emoji, msg;
  if (score === 10)      { emoji = "🏆"; msg = "Score parfait, bravo !"; }
  else if (score >= 8)   { emoji = "🎉"; msg = "Excellent travail !"; }
  else if (score >= 6)   { emoji = "👍"; msg = "Pas mal, continue comme ça !"; }
  else if (score >= 4)   { emoji = "📚"; msg = "Encore un peu de révision !"; }
  else                   { emoji = "💪"; msg = "Retente ta chance, tu peux faire mieux !"; }

  document.querySelector(".quiz-container").innerHTML = `
    <div class="result-screen">
      <div class="result-emoji">${emoji}</div>
      <h2>Quiz terminé !</h2>
      <div class="result-score">${score}<span style="font-size:1.5rem;color:var(--muted)">/${TOTAL}</span></div>
      <p class="result-msg">${msg}</p>
      <button class="btn-restart-final" id="btn-restart-final">↺ Recommencer</button>
    </div>
  `;

  document.getElementById("btn-restart-final").addEventListener("click", restartQuiz);
}

// ─── Restart ──────────────────────────────────────────────────────────────────

function restartQuiz() {
  score = 0;
  questionActuelle = 1;
  updateScoreLive();
  location.reload();
}

// ─── Init ─────────────────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btn-valider").addEventListener("click", validerReponse);
  document.getElementById("btn-suivant").addEventListener("click", nextQuestion);
  document.getElementById("btn-restart").addEventListener("click", restartQuiz);

  // Animation shake CSS dynamique
  const style = document.createElement("style");
  style.textContent = `@keyframes shake {
    0%,100%{transform:translateX(0)}
    25%{transform:translateX(-6px)}
    75%{transform:translateX(6px)}
  }`;
  document.head.appendChild(style);

  afficherQuestion(1);
});
