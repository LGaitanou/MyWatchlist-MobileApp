import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Link } from 'expo-router'; // Use Link for safer navigation
import { Ionicons } from '@expo/vector-icons';

export const NavigationMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <View style={styles.container}>
      {isOpen && (
        <View style={styles.menuItems}>
          {/* Favorites Screen */}
          <Link href="/favorites" asChild>
            <TouchableOpacity style={styles.menuItem} onPress={() => setIsOpen(false)}>
              <Ionicons name="star" size={24} color="#F44336" />
              <Text style={styles.menuText}>Favorites</Text>
            </TouchableOpacity>
          </Link>

          {/* Search Screen */}
          <Link href="/search" asChild>
            <TouchableOpacity style={styles.menuItem} onPress={() => setIsOpen(false)}>
              <Ionicons name="search" size={24} color="#2196F3" />
              <Text style={styles.menuText}>Search</Text>
            </TouchableOpacity>
          </Link>

          {/* Watchlist Screen (Home) */}
          <Link href="/" asChild>
            <TouchableOpacity style={styles.menuItem} onPress={() => setIsOpen(false)}>
              <Ionicons name="list" size={24} color="#4CAF50" />
              <Text style={styles.menuText}>Watchlist</Text>
            </TouchableOpacity>
          </Link>
        </View>
      )}

      {/* Main Toggle Button */}
      <TouchableOpacity style={styles.fab} onPress={toggleMenu}>
        <Ionicons name={isOpen ? "close" : "apps"} size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 40,
    right: 30,
    alignItems: 'flex-end',
    zIndex: 1000, // Higher zIndex to ensure it's on top
  },
  fab: {
    backgroundColor: '#333',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  menuItems: {
    marginBottom: 15,
    alignItems: 'flex-end',
  },
  menuItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 12,
    paddingHorizontal: 16,
    borderRadius: 30,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  menuText: {
    marginLeft: 12,
    fontWeight: '700',
    color: '#333',
  },
});