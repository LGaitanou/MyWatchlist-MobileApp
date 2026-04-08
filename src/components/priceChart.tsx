import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useMarket } from '../context/marketContext';

interface Props {
  history: number[];
}

export const PriceChart = ({ history }: Props) => {
  const { colors, theme } = useMarket();
  const screenWidth = Dimensions.get('window').width;

  // Calculate if the trend is positive or negative
  const firstPrice = history[0];
  const lastPrice = history[history.length - 1];
  const isPositive = lastPrice >= firstPrice;
  const chartColor = isPositive ? colors.success : colors.error;

  const chartData = {
    labels: [], // No labels for a clean look
    datasets: [
      {
        data: history,
        color: (opacity = 1) => chartColor, // Line color based on trend
        strokeWidth: 3,
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: colors.card,
    backgroundGradientTo: colors.card,
    decimalPlaces: 2,
    color: (opacity = 1) => chartColor,
    labelColor: (opacity = 1) => colors.subText,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "0", // Hide dots
    },
    propsForBackgroundLines: {
      strokeDasharray: "", // solid lines
      stroke: colors.border,
      strokeWidth: 0.5,
    }
  };

  return (
    <View style={styles.container}>
      <LineChart
        data={chartData}
        width={screenWidth - 64} // Accounting for padding/margin
        height={200}
        chartConfig={chartConfig}
        bezier // Smooth curve
        style={styles.chart}
        withDots={false}
        withInnerLines={false}
        withOuterLines={false}
        withVerticalLines={false}
        withHorizontalLines={false}
        withVerticalLabels={false}
        withHorizontalLabels={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  chart: {
    borderRadius: 16,
  },
});
