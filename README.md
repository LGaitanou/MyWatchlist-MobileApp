# MyWatchlist - Financial Instrument Tracker

A React Native mobile application built with Expo, developed to help the developer practice, test, and learn React Native. This app fetures a very basic and rundemental way of searching and sorting financial instruments, like stocks, crypto and forex. All of the instruments present in the app have mock values and properties. It aslo has a favorites page, that can only be accessed by completing a mock Sign-Up. A light and dark mode toggle was also implemented. Finally, a detailed view of an instrument can be displayed by pressing it.

AI was used for the development of this App.

## Prerequisites

If you want to build the app, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (LTS version)
- [Android Studio](https://developer.android.com/studio) (for Android Emulator and SDK)
- [Java Development Kit (JDK)](https://www.oracle.com/java/technologies/downloads/) (Version 17 recommended for modern Expo)

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/LGaitanou/MyWatchlist-MobileApp.git
   cd MyWatchlist-MobileApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

## Running the App

This app uses native modules like SVG and AsyncStorage, so it must be run on a **Development Built**.

### For Android
Ensure an android emulator is running or a physical device is connected via USB:
```bash
npx expo run:android
```

### For iOS (macOS only)
```bash
npx expo run:ios
```
