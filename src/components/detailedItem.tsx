import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FinancialInstrument } from '../types/financialInstrument';
import { Ionicons } from '@expo/vector-icons';
import { useMarket } from '../context/marketContext';
import { PriceChart } from './priceChart';

interface Props {
  item: FinancialInstrument;
  isFavorite: boolean;
  isInWatchlist: boolean;
  onToggleFavorite: () => void;
  onToggleWatchlist: () => void;
}

export const DetailedItem = ({
  item,
  isFavorite,
  isInWatchlist,
  onToggleFavorite,
  onToggleWatchlist,
}: Props) => {
  const { colors } = useMarket();
  const isPositive = item.change >= 0;

  const styles = StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: colors.card,
      borderRadius: 15,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
      margin: 16,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 20,
    },
    symbol: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.text,
    },
    name: {
      fontSize: 18,
      color: colors.subText,
    },
    favoriteButton: {
      padding: 5,
    },
    priceContainer: {
      marginBottom: 10,
    },
    price: {
      fontSize: 42,
      fontWeight: 'bold',
      color: colors.text,
    },
    change: {
      fontSize: 20,
      fontWeight: '600',
      marginTop: 4,
    },
    actions: {
      marginTop: 20,
      gap: 12,
    },
    actionButton: {
      paddingVertical: 15,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    addFavorite: {
      backgroundColor: colors.secondary,
      borderWidth: 1,
      borderColor: colors.primary,
    },
    removeFavorite: {
      backgroundColor: colors.accentBg,
      borderWidth: 1,
      borderColor: colors.accent,
    },
    actionText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.text,
    },
    removeWatchlist: {
      paddingVertical: 15,
      alignItems: 'center',
    },
    removeText: {
      color: colors.error,
      fontSize: 16,
      fontWeight: '600',
      textDecorationLine: 'underline',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.symbol}>{item.symbol}/USD</Text>
          <Text style={styles.name}>{item.name}</Text>
        </View>
        <TouchableOpacity onPress={onToggleFavorite} style={styles.favoriteButton}>
          <Ionicons
            name={isFavorite ? 'star' : 'star-outline'}
            size={32}
            color={isFavorite ? colors.favorite : colors.subText}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.priceContainer}>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        <Text style={[styles.change, { color: isPositive ? colors.success : colors.error }]}>
          {isPositive ? '+' : ''}{item.change.toFixed(2)}%
        </Text>
      </View>

      <PriceChart history={item.history} />

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionButton, isFavorite ? styles.removeFavorite : styles.addFavorite]}
          onPress={onToggleFavorite}
        >
          <Text style={styles.actionText}>
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </Text>
        </TouchableOpacity>

        {isInWatchlist && (
          <TouchableOpacity style={styles.removeWatchlist} onPress={onToggleWatchlist}>
            <Text style={styles.removeText}>Remove from Watchlist</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

