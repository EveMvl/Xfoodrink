import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../context/ThemeContext';
import { Colors } from '../data/products';
import { Ionicons } from '@expo/vector-icons';

const HistoryDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { transaction } = route.params;

  const { isDarkMode } = useContext(ThemeContext);
  const theme = isDarkMode ? Colors.dark : Colors.light;

  const renderItem = ({ item, index }) => {
    const itemTotal = item.price * item.quantity;
    return (
      <View style={styles.productRowContainer}>
        <View style={styles.productRow}>
          <Text style={[styles.productText, { color: theme.text }]}>
            {index + 1}. {item.name} ({item.quantity}x)
          </Text>
          <Text style={[styles.productPrice, { color: theme.text }]}>
            = Rp {itemTotal.toLocaleString('id-ID')}
          </Text>
        </View>
        {item.note && item.note.length > 0 && (
          <Text style={[styles.noteText, { color: theme.primary }]}>
            Note: {item.note}
          </Text>
        )}
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { backgroundColor: theme.card, borderBottomColor: theme.border }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={theme.primary} />
          <Text style={[styles.backText, { color: theme.primary }]}>Back</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.text }]}>Order Detail</Text>
        <View style={{ width: 60 }} />
      </View>

      <View style={styles.content}>
        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={[styles.codeTitle, { color: theme.text }]}>Code: {transaction.id}</Text>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Products:</Text>
          
          <FlatList
            data={transaction.items}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            style={styles.list}
            scrollEnabled={false}
          />
          
          <View style={[styles.divider, { backgroundColor: theme.text }]} />
          
          <Text style={[styles.finalTotal, { color: theme.text }]}>
            Total : Rp {transaction.total.toLocaleString('id-ID')}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
  },
  backBtn: { flexDirection: 'row', alignItems: 'center' },
  backText: { fontSize: 16, marginLeft: 5 },
  title: { fontSize: 18, fontWeight: 'bold' },
  content: { padding: 20 },
  card: {
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  codeTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 20 },
  sectionTitle: { fontSize: 16, marginBottom: 10 },
  list: { marginBottom: 15 },
  productRowContainer: { marginBottom: 10 },
  productRow: { flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 10 },
  productText: { fontSize: 14, flex: 1 },
  productPrice: { fontSize: 14, fontWeight: '500' },
  noteText: { fontSize: 12, paddingLeft: 25, marginTop: 4, fontStyle: 'italic' },
  divider: { height: 1, marginVertical: 15 },
  finalTotal: { fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
});

export default HistoryDetail;
