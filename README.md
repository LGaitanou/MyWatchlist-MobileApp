# MyWatchlist - Financial Tracker App

A React Native mobile application built with Expo for searching, tracking, and favoriting financial instruments. It features real-time price simulations, global state management, and a persistent dark mode.

## 🚀 Key Features

- **Real-time Simulation**: Prices and 20-point histories for all instruments update every 5 seconds.
- **Global State**: Architecture powered by React Context API for consistent data across all screens.
- **Local Persistence**: User watchlists, favorites, and theme settings are saved locally using `@react-native-async-storage/async-storage`.
- **Dynamic Theming**: Full support for Light and Dark modes with a persistent toggle.
- **Interactive Charts**: Visual price history using `react-native-chart-kit`.
- **Navigation**: File-based routing using `expo-router`.

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (LTS version)
- [Android Studio](https://developer.android.com/studio) (for Android Emulator and SDK)
- [Java Development Kit (JDK)](https://adoptium.net/) (Version 17 recommended for modern Expo)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/LGaitanou/MyWatchlist-MobileApp.git
   cd MyWatchlist-MobileApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

## 🏃 Running the App

Since this project uses native modules (like AsyncStorage and SVG), you must run it as a **Development Build**.

### For Android
Ensure your emulator is running or a physical device is connected via USB:
```bash
npx expo run:android
```

### For iOS (macOS only)
```bash
npx expo run:ios
```

## 🏗️ Project Structure

- `src/app/`: Screen components and routing logic (Expo Router).
- `src/context/`: Global state management (`MarketContext`).
- `src/components/`: Reusable UI components (Charts, List Items, Toggles).
- `src/constants/`: Mock data and theme color palettes.
- `src/types/`: TypeScript interfaces and types.

## 🧪 Technical Highlights

- **Custom Hooks**: Implementation of `useMarket` for clean access to global state.
- **Optimized Rendering**: Usage of `useMemo` for efficient list sorting and filtering.
- **Defensive Programming**: Safe-guarding against undefined data and handling empty states.
- **Vector Icons**: Consistent iconography using `@expo/vector-icons` (Ionicons).
