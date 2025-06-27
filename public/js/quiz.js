let quizIndex = 0, quizScore = 0;
const quizQuestions = [
  {
    q: "What does 'APY' stand for?",
    a: ["Annual Percentage Yield", "Average Payment Year", "Annual Payment Yield"],
    c: 0
  },
  {
    q: "What is collateral in DeFi lending?",
    a: ["Money you borrow", "Assets you supply to secure a loan", "Interest earned"],
    c: 1
  },
  {
    q: "What happens if you borrow too much and your health factor drops?",
    a: ["Nothing", "You earn more interest", "You risk liquidation (losing your collateral)"],
    c: 2
  }
];
function startQuiz() {
  quizIndex = 0; quizScore = 0;
  showQuizQuestion();
  document.getElementById('quizResult').textContent = '';
}
function showQuizQuestion() {
  if (quizIndex >= quizQuestions.length) {
    document.getElementById('quizContent').innerHTML = '';
    document.getElementById('quizResult').textContent = `Quiz complete! Score: ${quizScore}/${quizQuestions.length}`;
    if (quizScore === quizQuestions.length) { confetti(); }
    return;
  }
  const q = quizQuestions[quizIndex];
  let html = `<div class="mb-4 font-semibold">${q.q}</div>`;
  q.a.forEach((a, i) => {
    html += `<button onclick="answerQuiz(${i})" class="block w-full mb-2">${a}</button>`;
  });
  document.getElementById('quizContent').innerHTML = html;
}
function answerQuiz(idx) {
  if (quizQuestions[quizIndex].c === idx) quizScore++;
  quizIndex++;
  showQuizQuestion();
}
startQuiz();
