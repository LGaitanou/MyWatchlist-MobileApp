import { useState, useEffect } from 'react';
import { FinancialInstrument } from '../types/financialInstrument';
import { INITIAL_INSTRUMENTS } from '../constants/mockData';

export const usePriceSimulation = () => {
  // We initialize our state with the 15 instruments you just created
  const [instruments, setInstruments] = useState<FinancialInstrument[]>(INITIAL_INSTRUMENTS);

  useEffect(() => {
    // Set up an interval to update prices every 5 seconds (5000ms)
    const interval = setInterval(() => {
      setInstruments((currentInstruments) =>
        currentInstruments.map((item) => {
          // Calculate a random price fluctuation between -0.5% and +0.5%
          const fluctuation = (Math.random() * 0.01 - 0.005);
          const newPrice = item.price * (1 + fluctuation);

          // Update the price and jitter the change percentage slightly
          return {
            ...item,
            price: newPrice,
            change: item.change + (Math.random() * 0.1 - 0.05),
          };
        })
      );
    }, 5000);

    // This "cleanup function" stops the timer if the user leaves the screen
    return () => clearInterval(interval);
  }, []);

  return { instruments };
};