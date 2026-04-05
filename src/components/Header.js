import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { ThemeContext } from '../context/ThemeContext';
import { Colors } from '../data/products';

const Header = ({ title }) => {
  const navigation = useNavigation();
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.length;

  const { isDarkMode } = useContext(ThemeContext);
  const theme = isDarkMode ? Colors.dark : Colors.light;

  return (
    <View style={[styles.headerContainer, { backgroundColor: theme.card, borderBottomColor: theme.border }]}>
      <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.iconButton}>
        <Ionicons name="menu" size={28} color={theme.text} />
      </TouchableOpacity>
      
      {title === 'Home' ? (
        <Text style={styles.title}>
          <Text style={{ color: isDarkMode ? '#FFF' : '#222', fontWeight: '400' }}>X</Text>
          <Text style={{ color: theme.primary, fontWeight: 'bold' }}>foodie</Text>
        </Text>
      ) : (
        <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
      )}

      <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={styles.iconButton}>
        <Ionicons name="cart-outline" size={28} color={theme.text} />
        {cartCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{cartCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  iconButton: {
    position: 'relative',
    padding: 5,
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#EF4444',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default Header;
