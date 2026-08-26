// Settles net balances with the minimum number of payments, rather than listing every pairwise IOU.
export function computeSettlements(participants, expenses) {
  const balances = {};
  participants.forEach((p) => (balances[p.id] = 0));

  expenses.forEach((exp) => {
    if (!exp.splitAmong.length) return;
    const share = exp.amount / exp.splitAmong.length;
    exp.splitAmong.forEach((pid) => {
      balances[pid] = (balances[pid] ?? 0) - share;
    });
    balances[exp.paidBy] = (balances[exp.paidBy] ?? 0) + exp.amount;
  });

  const creditors = Object.entries(balances)
    .filter(([, v]) => v > 0.01)
    .map(([id, v]) => ({ id, amount: v }))
    .sort((a, b) => b.amount - a.amount);

  const debtors = Object.entries(balances)
    .filter(([, v]) => v < -0.01)
    .map(([id, v]) => ({ id, amount: -v }))
    .sort((a, b) => b.amount - a.amount);

  const settlements = [];
  let i = 0;
  let j = 0;
  while (i < creditors.length && j < debtors.length) {
    const amount = Math.min(creditors[i].amount, debtors[j].amount);
    settlements.push({
      from: debtors[j].id,
      to: creditors[i].id,
      amount: Math.round(amount * 100) / 100,
    });
    creditors[i].amount -= amount;
    debtors[j].amount -= amount;
    if (creditors[i].amount < 0.01) i++;
    if (debtors[j].amount < 0.01) j++;
  }

  return { balances, settlements };
}
