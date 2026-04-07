// Using 'export' allows other files to 'import' this blueprint
export type InstrumentType = 'stock' | 'crypto' | 'forex';

export interface FinancialInstrument {
    id: string;        // Crucial for lists and favorites
    symbol: string;    // e.g., "BTC" or "AAPL"
    name: string;
    price: number;
    change: number;    // Percentage change
    type: InstrumentType; // Categorization

    // Added for the 'detailed' update
    logo?: string;     // URL for the logo
    history: number[]; // Array of historical prices for the chart
}