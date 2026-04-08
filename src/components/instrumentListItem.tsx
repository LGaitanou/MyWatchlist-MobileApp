import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FinancialInstrument } from '../types/financialInstrument';
import { Ionicons } from '@expo/vector-icons';
import { useMarket } from '../context/marketContext';

type IconType = 'plus' | 'star';

interface Props {
  item: FinancialInstrument;
  isActive?: boolean;
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
  iconType = 'star'
}: Props) => {
  const { colors } = useMarket();
  const isPositive = item.change >= 0;

  const getIconName = (): any => {
    if (iconType === 'plus') {
      return isActive ? "checkmark-circle" : "add-circle-outline";
    }
    if (iconType === 'star') {
      return isActive ? "star" : "star-outline";
    }
    return "help-circle-outline";
  };

  const getIconColor = () => {
    if (iconType === 'plus') {
      return isActive ? colors.success : colors.subText;
    }
    if (iconType === 'star') {
      return isActive ? colors.favorite : colors.subText;
    }
    return colors.subText;
  };

  const styles = StyleSheet.create({
    itemRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
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
    symbol: { fontSize: 18, fontWeight: 'bold', color: colors.text },
    name: { fontSize: 14, color: colors.subText },
    priceContainer: { alignItems: 'flex-end' },
    price: { fontSize: 16, fontWeight: '600', color: colors.text },
    change: { fontSize: 14, fontWeight: '500' },
  });

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
        <Text style={[styles.change, { color: isPositive ? colors.success : colors.error }]}>
          {isPositive ? '+' : ''}{item.change.toFixed(2)}%
        </Text>
      </TouchableOpacity>
    </View>
  );
};
