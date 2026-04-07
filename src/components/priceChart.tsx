import React, { useState } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { LineChart } from "react-native-chart-kit";

interface Props {
  data: number[];
  isPositive: boolean;
}

export const PriceChart = ({ data, isPositive }: Props) => {
  const [width, setWidth] = useState(Dimensions.get('window').width - 64);

  if (!data || data.length === 0) return null;

  return (
    <View
      style={styles.container}
      onLayout={(event) => setWidth(event.nativeEvent.layout.width)}
    >
      <LineChart
        data={{
          labels: [], // No labels for a clean look
          datasets: [{ data: data }]
        }}
        width={width}
        height={180}
        withDots={false}
        withInnerLines={false}
        withOuterLines={false}
        withVerticalLabels={false}
        withHorizontalLabels={false}
        chartConfig={{
          backgroundColor: "#fff",
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          color: (opacity = 1) => isPositive ? `rgba(76, 175, 80, ${opacity})` : `rgba(244, 67, 54, ${opacity})`,
          strokeWidth: 3,
          propsForBackgroundLines: {
            strokeDasharray: "" // solid background lines
          }
        }}
        bezier // Makes the line curvy/smooth
        style={styles.chart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
    backgroundColor: '#fff',
    borderRadius: 16,
  },
  chart: {
    paddingRight: 0,
    paddingLeft: 0,
  }
});