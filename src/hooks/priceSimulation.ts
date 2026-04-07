import { useState, useEffect } from 'react';
import { FinancialInstrument } from '../types/financialInstrument';
import { INITIAL_INSTRUMENTS } from '../constants/mockData';

// Helper to generate initial random history
const generateInitialHistory = (basePrice: number): number[] => {
  const history = [];
  let current = basePrice;
  for (let i = 0; i < 20; i++) {
    current = current * (1 + (Math.random() * 0.04 - 0.02));
    history.push(current);
  }
  return history;
};

const INITIAL_WITH_HISTORY = INITIAL_INSTRUMENTS.map(item => ({
  ...item,
  history: generateInitialHistory(item.price)
}));

export const usePriceSimulation = () => {
  const [instruments, setInstruments] = useState<FinancialInstrument[]>(INITIAL_WITH_HISTORY);

  useEffect(() => {
    const interval = setInterval(() => {
      setInstruments((currentInstruments) =>
        currentInstruments.map((item) => {
          const fluctuation = (Math.random() * 0.01 - 0.005);
          const newPrice = item.price * (1 + fluctuation);

          // Update history: remove oldest, add newest
          const newHistory = [...item.history.slice(1), newPrice];

          return {
            ...item,
            price: newPrice,
            change: item.change + (Math.random() * 0.1 - 0.05),
            history: newHistory
          };
        })
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return { instruments };
};
