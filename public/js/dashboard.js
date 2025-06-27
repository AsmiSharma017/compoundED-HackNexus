
  
// State
let balance = 1000, supplied = 0, borrowed = 0, badges = [];

// Compound.js SDK: Fetch live APY for DAI supply
async function fetchCompoundAPY() {
  try {
    const cDAI = Compound.util.getAddress(Compound.cDAI);
    let supplyRatePerBlock = await Compound.eth.read(
      cDAI,
      'function supplyRatePerBlock() returns (uint)',
      [],
      { network: 'mainnet' }
    );
    const blocksPerYear = 4 * 60 * 24 * 365;
    const apy = (Math.pow((supplyRatePerBlock / 1e18) * blocksPerYear + 1, 1) - 1) * 100;
    document.getElementById('compoundApy').textContent = apy.toFixed(2) + '%';
    document.getElementById('apyInput').value = apy.toFixed(2);
  } catch (e) {
    document.getElementById('compoundApy').textContent = "Unavailable";
  }
}
fetchCompoundAPY();

function updateDashboard() {
  document.getElementById('balance').textContent = balance;
  document.getElementById('supplied').textContent = supplied;
  document.getElementById('borrowed').textContent = borrowed;
  updateRiskGauge();
  updateBadges();
  updateChart();
}
function supplyDAI() {
  const amt = Number(document.getElementById('supplyAmount').value);
  if (amt > 0 && amt <= balance) {
    balance -= amt; supplied += amt;
    closeModal('supplyModal');
    updateDashboard();
    earnBadge('First Lender');
    confetti();
  }
}
function borrowDAI() {
  const amt = Number(document.getElementById('borrowAmount').value);
  if (amt > 0 && amt <= supplied * 0.5) {
    borrowed += amt; balance += amt;
    closeModal('borrowModal');
    updateDashboard();
    earnBadge('First Borrower');
    confetti();
  } else {
    alert('You can only borrow up to 50% of your supplied DAI.');
  }
}
function updateRiskGauge() {
  let ratio = borrowed / (supplied || 1);
  let gauge = '🟢';
  if (ratio > 0.3) gauge = '🟡';
  if (ratio > 0.5) gauge = '🔴';
  document.getElementById('riskGauge').textContent = gauge;
}
function earnBadge(name) {
  if (!badges.includes(name)) {
    badges.push(name);
    updateBadges();
  }
}
function updateBadges() {
  const el = document.getElementById('badges');
  el.innerHTML = badges.map(b => `<span class="badge">${b}</span>`).join('');
}
let chart;
function updateChart() {
  const principal = supplied || 100;
  const apy = Number(document.getElementById('apyInput').value) || 5;
  const years = Number(document.getElementById('yearsInput').value) || 3;
  let data = [], labels = [];
  for (let t = 0; t <= years; t++) {
    let amount = principal * Math.pow(1 + apy/100, t);
    data.push(amount.toFixed(2));
    labels.push('Year ' + t);
  }
  if (!chart) {
    chart = new Chart(document.getElementById('earningsChart').getContext('2d'), {
      type: 'line',
      data: { labels, datasets: [{ label: 'Projected Earnings', data, borderColor: '#6366f1', fill: false }] },
      options: { scales: { y: { beginAtZero: true } }, plugins: { legend: { display: false } } }
    });
  } else {
    chart.data.labels = labels;
    chart.data.datasets[0].data = data;
    chart.update();
  }
}
function planGoal() {
  const goal = Number(document.getElementById('goalAmount').value);
  const years = Number(document.getElementById('goalYears').value);
  const apy = Number(document.getElementById('apyInput').value) || 5;
  let needed = goal / Math.pow(1 + apy/100, years);
  document.getElementById('goalResult').textContent =
    `To reach ${goal} DAI in ${years} years at ${apy}% APY, you need to invest ≈ ${needed.toFixed(2)} DAI today.`;
}
updateDashboard();
