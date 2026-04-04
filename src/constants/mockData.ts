import { FinancialInstrument, InstrumentType } from '../types/financialInstrument';

export const INITIAL_INSTRUMENTS: FinancialInstrument[] = [
  { id: '1', symbol: 'BTC', name: 'Bitcoin', price: 65000, change: 2.5, type: 'crypto' },
  { id: '2', symbol: 'ETH', name: 'Ethereum', price: 3500, change: -1.2, type: 'crypto' },
  { id: '3', symbol: 'AAPL', name: 'Apple Inc.', price: 175.50, change: 0.45, type: 'stock' },
  { id: '4', symbol: 'TSLA', name: 'Tesla', price: 160.20, change: -3.1, type: 'stock' },
  { id: '5', symbol: 'EURUSD', name: 'Euro / US Dollar', price: 1.08, change: 0.05, type: 'forex' },
  { id: '6', symbol: 'SOL', name: 'Solana', price: 80, change: 1.52, type: 'crypto' },
  { id: '7', symbol: 'XLM', name: 'Stellar', price: 3, change: -0.2, type: 'crypto' },
  { id: '8', symbol: 'META', name: 'Meta Platforms Inc.', price: 574, change: -0.05, type: 'stock' },
  { id: '9', symbol: 'GOOG', name: 'Alphabet', price: 294.20, change: -0.01, type: 'stock' },
  { id: '10', symbol: 'EURCHF', name: 'Euro / CHF', price: 0.07, change: 0.01, type: 'forex' },
  { id: '11', symbol: 'UNI', name: 'Unicorn', price: 3.17, change: 1.34, type: 'crypto' },
  { id: '12', symbol: 'BNB', name: 'Build and Build', price: 588.53, change: 4.33, type: 'crypto' },
  { id: '13', symbol: 'INO', name: 'Inovio Pharmaceuticals Inc.', price: 1.13, change: 0.61, type: 'stock' },
  { id: '14', symbol: 'ANNX', name: 'Annexon Inc.', price: 5.50, change: -0.14, type: 'stock' },
  { id: '15', symbol: 'EURHUF', name: 'Euro / HUF', price: -1.989, change: -0.52, type: 'forex' },
];