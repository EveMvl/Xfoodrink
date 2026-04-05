import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView, Modal } from 'react-native';
import Swiper from 'react-native-swiper';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { addToCart } from '../store/cartSlice';
import { toggleWishlist } from '../store/wishlistSlice';
import { setFocusArea, setGender } from '../store/userSlice';
import { ThemeContext } from '../context/ThemeContext';
import { Colors, initialProducts } from '../data/products';
import Header from '../components/Header';

const Home = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(state => state.wishlist.items);
  const focusArea = useSelector(state => state.user.focusArea);
  const gender = useSelector(state => state.user.gender);
  
  const { isDarkMode } = useContext(ThemeContext);
  const theme = isDarkMode ? Colors.dark : Colors.light;

  const [activeCategory, setActiveCategory] = useState('All');
  const [tempGender, setTempGender] = useState(null);

  const highlightProducts = initialProducts.slice(0, 5);

  const filteredProducts = activeCategory === 'All' 
    ? initialProducts 
    : initialProducts.filter(item => item.category === activeCategory);

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    Toast.show({
      type: 'success',
      text1: 'Added to Cart',
      text2: `${item.name} has been added to your cart.`,
      position: 'bottom'
    });
  };

  const handleToggleWishlist = (item) => {
    dispatch(toggleWishlist(item));
    const isWished = wishlistItems.some(i => i.id === item.id);
    Toast.show({
      type: 'info',
      text1: isWished ? 'Removed from Wishlist' : 'Added to Wishlist',
      text2: `${item.name} was ${isWished ? 'removed from' : 'added to'} wishlist.`,
      position: 'bottom'
    });
  };

  const renderProductItem = ({ item }) => {
    const isWished = wishlistItems.some(i => i.id === item.id);
    return (
      <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <Image source={{ uri: item.image }} style={styles.cardImage} />
        <View style={styles.cardBody}>
          <Text style={[styles.cardTitle, { color: theme.text }]} numberOfLines={1}>{item.name}</Text>
          <Text style={[styles.cardPrice, { color: theme.accent }]}>Rp {item.price.toLocaleString('id-ID')}</Text>
        </View>
        <View style={styles.cardActions}>
          <TouchableOpacity onPress={() => handleToggleWishlist(item)} style={styles.actionButton}>
            <Ionicons name={isWished ? 'star' : 'star-outline'} size={24} color={isWished ? '#F59E0B' : theme.text} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleAddToCart(item)} style={[styles.actionButton, styles.addButton]}>
            <Ionicons name="add" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Header title="Home" />
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <View style={styles.swiperContainer}>
          <Swiper autoplay showsPagination dotColor={theme.border} activeDotColor={theme.primary} autoplayTimeout={4}>
            {highlightProducts.map((prod) => (
              <View key={prod.id} style={styles.slide}>
                <Image source={{ uri: prod.image }} style={styles.slideImage} />
                <View style={styles.slideOverlay}>
                  <Text style={styles.slideTitle}>{prod.name}</Text>
                  <Text style={styles.slideSubtitle}>Rp {prod.price.toLocaleString('id-ID')}</Text>
                </View>
              </View>
            ))}
          </Swiper>
        </View>

        <View style={styles.listContainer}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Featured Products</Text>
          
          <View style={styles.filterContainer}>
            {['All', 'Drink', 'Food'].map(cat => (
              <TouchableOpacity 
                key={cat} 
                onPress={() => setActiveCategory(cat)}
                style={[
                  styles.filterChip, 
                  { borderColor: theme.primary, backgroundColor: activeCategory === cat ? theme.primary : 'transparent' }
                ]}
              >
                <Text style={[
                  styles.filterText, 
                  { color: activeCategory === cat ? '#FFF' : theme.text }
                ]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <FlatList
            data={filteredProducts}
            renderItem={renderProductItem}
            keyExtractor={item => item.id}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
          />
        </View>
      </ScrollView>

      {/* Onboarding Survey Modal */}
      <Modal visible={!focusArea || !gender} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
            {!tempGender ? (
              <>
                <Text style={[styles.modalTitle, { color: theme.text }]}>Welcome to Xfoodie!</Text>
                <Text style={[styles.modalSubtitle, { color: theme.text }]}>Silakan pilih gender kamu</Text>
                {['Pria', 'Wanita'].map(opt => (
                  <TouchableOpacity
                    key={opt}
                    style={[styles.modalOption, { backgroundColor: theme.primary }]}
                    onPress={() => setTempGender(opt)}
                  >
                    <Text style={styles.modalOptionText}>{opt}</Text>
                  </TouchableOpacity>
                ))}
              </>
            ) : (
              <>
                <Text style={[styles.modalTitle, { color: theme.text }]}>Satu langkah lagi!</Text>
                <Text style={[styles.modalSubtitle, { color: theme.text }]}>Apa tujuan utama kamu?</Text>
                {['Weight Loss', 'Healthy Food Lover', 'Body Builder', 'Regular User'].map(opt => (
                  <TouchableOpacity
                    key={opt}
                    style={[styles.modalOption, { backgroundColor: theme.primary }]}
                    onPress={() => {
                      dispatch(setGender(tempGender));
                      dispatch(setFocusArea(opt));
                    }}
                  >
                    <Text style={styles.modalOptionText}>{opt}</Text>
                  </TouchableOpacity>
                ))}
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  swiperContainer: { height: 220, marginBottom: 15 },
  slide: { flex: 1, justifyContent: 'flex-end' },
  slideImage: { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%', borderRadius: 10 },
  slideOverlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 15,
  },
  slideTitle: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
  slideSubtitle: { color: '#FCD34D', fontSize: 16, marginTop: 4 },
  listContainer: { paddingHorizontal: 15 },
  sectionTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  filterContainer: { flexDirection: 'row', marginBottom: 15 },
  filterChip: { 
    paddingHorizontal: 15, 
    paddingVertical: 8, 
    borderRadius: 20, 
    borderWidth: 1, 
    marginRight: 10 
  },
  filterText: { fontWeight: 'bold' },
  card: {
    width: '48%',
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
  },
  cardImage: { width: '100%', height: 120, resizeMode: 'cover' },
  cardBody: { padding: 10 },
  cardTitle: { fontSize: 16, fontWeight: '600' },
  cardPrice: { fontSize: 14, fontWeight: 'bold', marginTop: 5 },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 10,
    alignItems: 'center',
  },
  actionButton: { padding: 5 },
  addButton: { backgroundColor: '#10B981', borderRadius: 20 },
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', 
    justifyContent: 'center', alignItems: 'center', padding: 20
  },
  modalContent: {
    width: '100%', padding: 30, borderRadius: 20, alignItems: 'center',
  },
  modalTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  modalSubtitle: { fontSize: 16, marginBottom: 25, textAlign: 'center' },
  modalOption: {
    width: '100%', padding: 15, borderRadius: 10, alignItems: 'center', marginBottom: 15
  },
  modalOptionText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' }
});

export default Home;
