import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../context/ThemeContext';
import { Colors } from '../data/products';
import Header from '../components/Header';
import { Ionicons } from '@expo/vector-icons';

const History = () => {
  const transactions = useSelector(state => state.history.transactions);
  const [search, setSearch] = useState('');
  const navigation = useNavigation();
  const { isDarkMode } = useContext(ThemeContext);
  const theme = isDarkMode ? Colors.dark : Colors.light;

  const filteredData = transactions.filter(t => t.id.toLowerCase().includes(search.toLowerCase()));

  const renderItem = ({ item }) => (
    <View style={[styles.historyCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <View style={styles.cardHeader}>
        <Text style={[styles.transactionId, { color: theme.text }]}>Code: {item.id}</Text>
        <Text style={[styles.date, { color: '#888' }]}>{new Date(item.date).toLocaleDateString()}</Text>
      </View>
      <Text style={[styles.totalText, { color: theme.accent }]}>Total: Rp {item.total.toLocaleString('id-ID')}</Text>
      
      <TouchableOpacity 
        style={[styles.detailBtn, { backgroundColor: theme.primary }]}
        onPress={() => navigation.navigate('HistoryDetail', { transaction: item })}
      >
        <Text style={styles.detailBtnText}>Detail</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Header title="History" />
      
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={theme.text} style={styles.searchIcon} />
        <TextInput
          style={[styles.searchInput, { color: theme.text, backgroundColor: theme.card, borderColor: theme.border }]}
          placeholder="Filter by Transaction ID..."
          placeholderTextColor="#888"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {filteredData.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: theme.text }]}>No transactions found.</Text>
        </View>
      ) : (
        <FlatList
          data={filteredData}
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  searchIcon: { position: 'absolute', left: 30, zIndex: 1 },
  searchInput: {
    flex: 1,
    height: 45,
    borderWidth: 1,
    borderRadius: 25,
    paddingLeft: 40,
    paddingRight: 15,
  },
  listContent: { paddingHorizontal: 15, paddingBottom: 20 },
  historyCard: {
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 15,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  transactionId: { fontSize: 16, fontWeight: 'bold' },
  date: { fontSize: 14 },
  totalText: { fontSize: 16, fontWeight: 'bold', marginBottom: 15 },
  detailBtn: {
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    width: 100,
    alignSelf: 'flex-start',
  },
  detailBtnText: { color: '#FFF', fontWeight: 'bold' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 16 },
});

export default History;
