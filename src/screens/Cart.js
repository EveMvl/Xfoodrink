import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput, Modal } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';
import { ThemeContext } from '../context/ThemeContext';
import { Colors } from '../data/products';
import Header from '../components/Header';
import { increaseQuantity, decreaseQuantity, updateItemNote, toggleSelectItem, toggleSelectAll, checkoutSelectedItems, setQuantity } from '../store/cartSlice';
import { addTransaction } from '../store/historySlice';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Cart = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const cartItems = useSelector(state => state.cart.items);
  const { isDarkMode } = useContext(ThemeContext);
  const theme = isDarkMode ? Colors.dark : Colors.light;

  const [isCheckoutModalVisible, setCheckoutModalVisible] = useState(false);
  const [orderType, setOrderType] = useState('Dine In');

  const selectedItems = cartItems.filter(item => item.selected);
  const isAllSelected = cartItems.length > 0 && selectedItems.length === cartItems.length;

  const total = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckoutBtnPress = () => {
    if (selectedItems.length === 0) {
      Toast.show({
        type: 'error',
        text1: 'Checkout Failed',
        text2: 'Belum ada produk yang dipilih untuk dicheckout.',
        position: 'bottom'
      });
      return;
    }

    setCheckoutModalVisible(true);
  };

  const confirmCheckout = () => {
    dispatch(addTransaction({ items: selectedItems, total, orderType }));
    dispatch(checkoutSelectedItems());
    setCheckoutModalVisible(false);
    navigation.navigate('History');
  };

  const handleNoteChange = (item, text) => {
    const wordCount = text.trim().split(/\s+/).length;
    if (wordCount <= 80 || text === '') {
      dispatch(updateItemNote({ id: item.id, note: text }));
    }
  };

  const handleQtyChange = (id, text) => {
    if (text === '') {
      dispatch(setQuantity({ id, quantity: 0 }));
      return;
    }
    let val = parseInt(text.replace(/[^0-9]/g, ''), 10);
    if (isNaN(val)) val = 1;
    if (val > 100) val = 100;
    dispatch(setQuantity({ id, quantity: val }));
  };

  const handleQtyBlur = (item) => {
    if (item.quantity < 1) {
      dispatch(setQuantity({ id: item.id, quantity: 1 }));
    }
  };

  const renderItem = ({ item }) => (
    <View style={[styles.cartItemContainer, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <View style={styles.cartItem}>
        <TouchableOpacity onPress={() => dispatch(toggleSelectItem(item.id))} style={styles.checkboxContainer}>
          <Ionicons name={item.selected ? "checkbox" : "square-outline"} size={26} color={item.selected ? theme.primary : theme.border} />
        </TouchableOpacity>
        <Image source={item.image} style={styles.itemImage} />
        <View style={styles.itemInfo}>
          <Text style={[styles.itemName, { color: theme.text }]} numberOfLines={1}>{item.name}</Text>
          <Text style={[styles.itemPrice, { color: theme.accent }]}>Rp {item.price.toLocaleString('id-ID')}</Text>
        </View>
        <View style={styles.qtyContainer}>
          <TouchableOpacity onPress={() => dispatch(decreaseQuantity(item))} style={styles.qtyBtn}>
            <Ionicons name="remove" size={20} color={theme.text} />
          </TouchableOpacity>
          <TextInput
            style={[styles.qtyInput, { color: theme.text }]}
            keyboardType="numeric"
            value={item.quantity === 0 ? '' : String(item.quantity)}
            onChangeText={(text) => handleQtyChange(item.id, text)}
            onBlur={() => handleQtyBlur(item)}
            maxLength={3}
          />
          <TouchableOpacity onPress={() => dispatch(increaseQuantity(item))} style={styles.qtyBtn}>
            <Ionicons name="add" size={20} color={theme.text} />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={[styles.noteContainer, { borderColor: theme.border }]}>
        <TextInput 
          style={[styles.noteInput, { color: theme.text }]}
          placeholder="Add an optional note (max 80 words)..."
          placeholderTextColor="#888"
          value={item.note || ''}
          onChangeText={(text) => handleNoteChange(item, text)}
          multiline
        />
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Header title="Cart" />
      {cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="cart-outline" size={60} color={theme.border} />
          <Text style={[styles.emptyText, { color: theme.text }]}>Your cart is empty.</Text>
        </View>
      ) : (
        <>
          <View style={[styles.topOrderTypeContainer, { backgroundColor: theme.card, borderBottomColor: theme.border }]}>
            <Text style={[styles.orderTypeLabel, { color: theme.text }]}>Tipe Pesanan:</Text>
            <View style={styles.orderTypeButtons}>
              <TouchableOpacity 
                onPress={() => setOrderType('Dine In')}
                style={[
                  styles.typeBtnTop, 
                  { borderColor: theme.primary, backgroundColor: orderType === 'Dine In' ? theme.primary : 'transparent' }
                ]}
              >
                <Ionicons name="restaurant-outline" size={18} color={orderType === 'Dine In' ? '#FFF' : theme.primary} />
                <Text style={[styles.typeBtnTextTop, { color: orderType === 'Dine In' ? '#FFF' : theme.text }]}>Dine In</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                onPress={() => setOrderType('Dine Out')}
                style={[
                  styles.typeBtnTop, 
                  { borderColor: theme.primary, backgroundColor: orderType === 'Dine Out' ? theme.primary : 'transparent' }
                ]}
              >
                <Ionicons name="bag-handle-outline" size={18} color={orderType === 'Dine Out' ? '#FFF' : theme.primary} />
                <Text style={[styles.typeBtnTextTop, { color: orderType === 'Dine Out' ? '#FFF' : theme.text }]}>Dine Out</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.selectAllContainer, { borderBottomColor: theme.border }]}>
            <TouchableOpacity onPress={() => dispatch(toggleSelectAll(!isAllSelected))} style={styles.selectAllBtn}>
              <Ionicons name={isAllSelected ? "checkbox" : "square-outline"} size={26} color={isAllSelected ? theme.primary : theme.text} />
              <Text style={[styles.selectAllText, { color: theme.text }]}>Pilih Semua</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
          />
          <View style={[styles.footer, { backgroundColor: theme.card, borderTopColor: theme.border }]}>
            <View style={styles.breakdownContainer}>
              <View style={styles.breakdownRow}>
                <Text style={[styles.breakdownLabel, { color: theme.text }]}>Subtotal</Text>
                <Text style={[styles.breakdownValue, { color: theme.text }]}>Rp {total.toLocaleString('id-ID')}</Text>
              </View>
              <View style={styles.breakdownRow}>
                <Text style={[styles.breakdownLabel, { color: theme.text }]}>PPN (11%)</Text>
                <Text style={[styles.breakdownValue, { color: theme.text }]}>Rp {Math.round(total * 0.11).toLocaleString('id-ID')}</Text>
              </View>
              <View style={styles.breakdownRow}>
                <Text style={[styles.breakdownLabel, { color: theme.text }]}>Service Fee</Text>
                <Text style={[styles.breakdownValue, { color: theme.text }]}>Rp 2.000</Text>
              </View>
              <View style={[styles.breakdownDivider, { backgroundColor: theme.border }]} />
              <View style={styles.totalRow}>
                <Text style={[styles.totalLabel, { color: theme.text }]}>Total Pembayaran</Text>
                <Text style={[styles.totalValue, { color: theme.primary }]}>
                  Rp {(total + Math.round(total * 0.11) + 2000).toLocaleString('id-ID')}
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={handleCheckoutBtnPress} style={[styles.checkoutBtn, { backgroundColor: theme.primary }]}>
              <Text style={styles.checkoutText}>Checkout Sekarang</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {/* Checkout Confirmation Modal */}
      <Modal visible={isCheckoutModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>Konfirmasi Checkout</Text>
            <Text style={[styles.modalSubtitle, { color: theme.text }]}>
              Yakin mau melakukan checkout pesanan kamu sekarang?
            </Text>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: '#EF4444' }]}
                onPress={() => setCheckoutModalVisible(false)}
              >
                <Text style={[styles.modalBtnText, { color: '#FFF' }]}>Nanti Dulu</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: theme.primary }]}
                onPress={confirmCheckout}
              >
                <Text style={styles.modalBtnText}>Ya, Checkout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  listContent: { padding: 15 },
  selectAllContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  selectAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectAllText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold'
  },
  cartItemContainer: {
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden'
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  checkboxContainer: {
    marginRight: 12,
    justifyContent: 'center',
  },
  itemImage: { width: 60, height: 60, borderRadius: 8, marginRight: 15 },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 16, fontWeight: 'bold' },
  itemPrice: { fontSize: 14, marginTop: 4 },
  qtyContainer: { flexDirection: 'row', alignItems: 'center' },
  qtyBtn: { padding: 5, borderWidth: 1, borderColor: '#ccc', borderRadius: 4, marginHorizontal: 5 },
  qtyInput: { fontSize: 16, fontWeight: 'bold', width: 35, textAlign: 'center', padding: 0 },
  noteContainer: { borderTopWidth: 1, padding: 8 },
  noteInput: { padding: 5, fontSize: 13, minHeight: 40 },
  footer: {
    padding: 20,
    borderTopWidth: 1,
  },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  totalLabel: { fontSize: 18, fontWeight: 'bold' },
  totalValue: { fontSize: 20, fontWeight: 'bold' },
  checkoutBtn: {
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  checkoutText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { marginTop: 15, fontSize: 18 },

  // Breakdown Styles
  breakdownContainer: { marginBottom: 15 },
  breakdownRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  breakdownLabel: { fontSize: 14, opacity: 0.8 },
  breakdownValue: { fontSize: 14, fontWeight: '500' },
  breakdownDivider: { height: 1, marginVertical: 12, opacity: 0.5 },
  
  // Modal Styles
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', 
    justifyContent: 'center', alignItems: 'center', padding: 20
  },
  modalContent: {
    width: '100%', padding: 25, borderRadius: 15, alignItems: 'center',
  },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  modalSubtitle: { fontSize: 16, marginBottom: 25, textAlign: 'center' },
  modalActions: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  modalBtn: {
    flex: 1, padding: 15, borderRadius: 10, alignItems: 'center', marginHorizontal: 5
  },
  modalBtnText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  
  orderTypeContainer: {
    flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 25
  },
  typeBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    padding: 12, borderRadius: 10, borderWidth: 1.5, marginHorizontal: 5,
  },
  typeBtnText: { marginLeft: 8, fontWeight: 'bold', fontSize: 14 },

  topOrderTypeContainer: {
    padding: 15,
    borderBottomWidth: 1,
    marginBottom: 5,
  },
  orderTypeLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    textTransform: 'uppercase',
    opacity: 0.7
  },
  orderTypeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  typeBtnTop: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1.5,
    marginHorizontal: 5,
  },
  typeBtnTextTop: {
    marginLeft: 6,
    fontWeight: 'bold',
    fontSize: 14,
  }
});

export default Cart;
