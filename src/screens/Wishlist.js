import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Swipeable } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { ThemeContext } from '../context/ThemeContext';
import { Colors } from '../data/products';
import Header from '../components/Header';
import { removeFromWishlist } from '../store/wishlistSlice';
import { addToCart } from '../store/cartSlice';
import { Ionicons } from '@expo/vector-icons';

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(state => state.wishlist.items);
  const { isDarkMode } = useContext(ThemeContext);
  const theme = isDarkMode ? Colors.dark : Colors.light;

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    dispatch(removeFromWishlist(item));
    Toast.show({
      type: 'success',
      text1: 'Added to Cart',
      text2: `${item.name} moved to your cart.`,
      position: 'bottom'
    });
  };

  const handleDelete = (item) => {
    dispatch(removeFromWishlist(item));
    Toast.show({
      type: 'error',
      text1: 'Removed',
      text2: `${item.name} removed from wishlist.`,
      position: 'bottom'
    });
  };

  const renderRightActions = (item) => (
    <View style={styles.rightActionContainer}>
      <TouchableOpacity 
        style={[styles.actionBtn, styles.cartAction]} 
        onPress={() => handleAddToCart(item)}
      >
        <Ionicons name="cart-outline" size={28} color="#FFF" />
      </TouchableOpacity>
    </View>
  );

  const renderLeftActions = (item) => (
    <View style={styles.leftActionContainer}>
      <TouchableOpacity 
        style={[styles.actionBtn, styles.deleteAction]} 
        onPress={() => handleDelete(item)}
      >
        <Ionicons name="trash-outline" size={28} color="#FFF" />
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({ item }) => (
    <Swipeable 
      renderRightActions={() => renderRightActions(item)}
      renderLeftActions={() => renderLeftActions(item)}
    >
      <View style={[styles.wishlistItem, { backgroundColor: theme.card, borderBottomColor: theme.border }]}>
        <Image source={{ uri: item.image }} style={styles.itemImage} />
        <View style={styles.itemInfo}>
          <Text style={[styles.itemName, { color: theme.text }]} numberOfLines={1}>{item.name}</Text>
          <Text style={[styles.itemPrice, { color: theme.accent }]}>Rp {item.price.toLocaleString('id-ID')}</Text>
        </View>
      </View>
    </Swipeable>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Header title="Wishlist" />
      {wishlistItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="star-outline" size={60} color={theme.border} />
          <Text style={[styles.emptyText, { color: theme.text }]}>No items in wishlist.</Text>
        </View>
      ) : (
        <FlatList
          data={wishlistItems}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  listContent: { padding: 15 },
  wishlistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 2,
  },
  itemImage: { width: 60, height: 60, borderRadius: 8, marginRight: 15 },
  itemInfo: { flex: 1, justifyContent: 'center' },
  itemName: { fontSize: 16, fontWeight: 'bold' },
  itemPrice: { fontSize: 14, marginTop: 4 },
  rightActionContainer: {
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
  },
  leftActionContainer: {
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
  },
  actionBtn: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartAction: { backgroundColor: '#10B981' },
  deleteAction: { backgroundColor: '#EF4444' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { marginTop: 15, fontSize: 18 },
});

export default Wishlist;
