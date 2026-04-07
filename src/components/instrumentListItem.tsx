import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FinancialInstrument } from '../types/financialInstrument';
import { Ionicons } from '@expo/vector-icons';

type IconType = 'plus' | 'star' | 'heart';

interface Props {
  item: FinancialInstrument;
  isActive?: boolean; // is in watchlist (for plus) or is favorite (for star/heart)
  onToggle?: (id: string) => void;
  onPress?: (id: string) => void;
  showToggle?: boolean;
  iconType?: IconType;
}

export const AssetListItem = ({
  item,
  isActive,
  onToggle,
  onPress,
  showToggle = true,
  iconType = 'heart'
}: Props) => {
  const isPositive = item.change >= 0;

  const getIconName = () => {
    if (iconType === 'plus') {
      return isActive ? "checkmark-circle" : "add-circle-outline";
    }
    if (iconType === 'star') {
      return isActive ? "star" : "star-outline";
    }
    return isActive ? "heart" : "heart-outline";
  };

  const getIconColor = () => {
    if (iconType === 'plus') {
      return isActive ? "#4CAF50" : "#BBB";
    }
    if (iconType === 'star') {
      return isActive ? "#FFD700" : "#BBB";
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
        <TouchableOpacity
          style={styles.infoContainer}
          onPress={() => onPress?.(item.id)}
          disabled={!onPress}
        >
          <Text style={styles.symbol}>{item.symbol}</Text>
          <Text style={styles.name}>{item.name}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.priceContainer}
        onPress={() => onPress?.(item.id)}
        disabled={!onPress}
      >
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        <Text style={[styles.change, { color: isPositive ? '#4CAF50' : '#F44336' }]}>
          {isPositive ? '+' : ''}{item.change.toFixed(2)}%
        </Text>
      </TouchableOpacity>
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
    flex: 1,
  },
  infoContainer: {
    flex: 1,
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
