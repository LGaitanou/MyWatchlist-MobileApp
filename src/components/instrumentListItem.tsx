import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FinancialInstrument } from '../types/financialInstrument';
import { Ionicons } from '@expo/vector-icons';

type IconType = 'plus' | 'heart';

interface Props {
  item: FinancialInstrument;
  isActive?: boolean; // is in watchlist (for plus) or is favorite (for heart)
  onToggle?: (id: string) => void;
  showToggle?: boolean;
  iconType?: IconType;
}

export const AssetListItem = ({
  item,
  isActive,
  onToggle,
  showToggle = true,
  iconType = 'heart'
}: Props) => {
  const isPositive = item.change >= 0;

  const getIconName = () => {
    if (iconType === 'plus') {
      return isActive ? "checkmark-circle" : "add-circle-outline";
    }
    return isActive ? "heart" : "heart-outline";
  };

  const getIconColor = () => {
    if (iconType === 'plus') {
      return isActive ? "#4CAF50" : "#BBB";
    }
    return isActive ? "#F44336" : "#BBB";
  };

  return (
    <View style={styles.itemRow}>
      <View style={styles.leftContainer}>
        {showToggle && onToggle && (
          <TouchableOpacity
            onPress={() => onToggle(item.id)}
            style={styles.actionButton}
          >
            <Ionicons
              name={getIconName()}
              size={24}
              color={getIconColor()}
            />
          </TouchableOpacity>
        )}
        <View>
          <Text style={styles.symbol}>{item.symbol}</Text>
          <Text style={styles.name}>{item.name}</Text>
        </View>
      </View>

      <View style={styles.priceContainer}>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        <Text style={[styles.change, { color: isPositive ? '#4CAF50' : '#F44336' }]}>
          {isPositive ? '+' : ''}{item.change.toFixed(2)}%
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    paddingRight: 15,
  },
  symbol: { fontSize: 18, fontWeight: 'bold' },
  name: { fontSize: 14, color: '#666' },
  priceContainer: { alignItems: 'flex-end' },
  price: { fontSize: 16, fontWeight: '600' },
  change: { fontSize: 14, fontWeight: '500' },
});
