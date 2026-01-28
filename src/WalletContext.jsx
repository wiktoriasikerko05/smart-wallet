import { createContext, useState, useContext } from 'react';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  
  const [transactions, setTransactions] = useState([
    { id: 1, text: 'Wypłata', amount: 5000, type: 'income', date: '2026-01-01' },
    { id: 2, text: 'Zakupy spożywcze', amount: 150, type: 'expense', date: '2026-01-26' },
  ]);

 
  const [goals, setGoals] = useState([
    { id: 1, name: 'Oszczędności', target: 10000, current: 2500, color: '#f59e0b' },
    { id: 2, name: 'Wakacje 🌴', target: 5000, current: 0, color: '#3b82f6' },
  ]);

  const income = transactions.filter(t => t.type === 'income').reduce((acc, i) => acc + (parseFloat(i.amount) || 0), 0);
  const expense = transactions.filter(t => t.type === 'expense').reduce((acc, i) => acc + (parseFloat(i.amount) || 0), 0);
  const mainBalance = income - expense;

  const goalsTotal = goals.reduce((acc, g) => acc + g.current, 0);
  const totalWealth = mainBalance + goalsTotal;

  const addTransaction = (transaction) => {
    if (!transaction.amount || isNaN(transaction.amount) || transaction.amount <= 0) {
      alert("Błąd: Podaj prawidłową kwotę!");
      return;
    }
    setTransactions([transaction, ...transactions]);
  };

  const addToGoal = (id, amount) => {
    const value = parseFloat(amount);
    if (!value || value <= 0) return alert("Podaj poprawną kwotę");
    if (value > mainBalance) return alert("Nie masz tyle środków na koncie głównym!");

    setGoals(goals.map(g => g.id === id ? { ...g, current: g.current + value } : g));

    const goalName = goals.find(g => g.id === id)?.name;
    addTransaction({
      id: Date.now(),
      text: `Przelew na cel: ${goalName}`,
      amount: value,
      type: 'expense',
      date: new Date().toISOString().split('T')[0]
    });
  };

  const updateGoalName = (id, newName) => {
    setGoals(goals.map(g => g.id === id ? { ...g, name: newName } : g));
  };

  return (
    <WalletContext.Provider value={{ 
      transactions, addTransaction, 
      goals, addToGoal, updateGoalName,
      mainBalance, income, expense,
      totalWealth, goalsTotal
    }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);