import React, { useContext, useMemo } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { ThemeContext } from '../context/ThemeContext';
import { Colors } from '../data/products';
import Header from '../components/Header';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const Profile = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const theme = isDarkMode ? Colors.dark : Colors.light;

  const focusArea = useSelector(state => state.user.focusArea);
  const gender = useSelector(state => state.user.gender);
  const transactions = useSelector(state => state.history.transactions);

  const { topProducts, totalSpending } = useMemo(() => {
    let spending = 0;
    const productCounts = {};

    transactions.forEach(t => {
      spending += t.total;
      t.items.forEach(item => {
        if (!productCounts[item.id]) {
          productCounts[item.id] = { ...item, sumQuantity: 0 };
        }
        productCounts[item.id].sumQuantity += item.quantity;
      });
    });

    const sortedProducts = Object.values(productCounts).sort((a, b) => b.sumQuantity - a.sumQuantity);
    
    return {
      topProducts: sortedProducts.slice(0, 3), // max 3
      totalSpending: spending,
    };
  }, [transactions]);

  const renderPodiumBlock = (product, rank, height, color) => {
    if (!product) {
      return (
        <View style={[styles.podiumCol, { height }]}>
          <View style={[styles.podiumBase, { backgroundColor: theme.border }]}>
            <Text style={{ color: theme.text }}>-</Text>
          </View>
        </View>
      );
    }
    
    return (
      <View style={[styles.podiumCol, { height, justifyContent: 'flex-end' }]}>
        <View style={styles.podiumProductContainer}>
          <Image source={{ uri: product.image }} style={styles.podiumImage} />
          <Text style={[styles.podiumProductName, { color: theme.text }]} numberOfLines={2}>
            {product.name}
          </Text>
          <Text style={[styles.podiumProductQty, { color: theme.accent }]}>
            {product.sumQuantity}x
          </Text>
        </View>
        <View style={[styles.podiumBase, { backgroundColor: color }]}>
          <Text style={styles.podiumRankText}>{rank}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Header title="Profile" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Profile Card */}
        <View style={[styles.profileCard, { backgroundColor: theme.card, shadowColor: theme.border }]}>
          {focusArea && (
            <View style={[styles.focusLabel, { backgroundColor: theme.primary }]}>
              <Text style={styles.focusLabelText}>I'm a {focusArea}</Text>
            </View>
          )}
          <View style={styles.avatarContainer}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80' }} 
              style={styles.avatar} 
            />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <Text style={[styles.name, { color: theme.text, marginBottom: 0 }]}>Eveline Marvelia</Text>
            {gender && (
              <View style={[styles.genderBadge, { backgroundColor: gender === 'Pria' ? '#3B82F6' : '#EC4899' }]}>
                <Ionicons name={gender === 'Pria' ? "male" : "female"} size={14} color="#FFF" />
              </View>
            )}
          </View>
          <View style={[styles.nimBadge, { backgroundColor: theme.text }]}>
            <Ionicons name="id-card-outline" size={16} color={theme.background} />
            <Text style={[styles.nim, { color: theme.background }]}>00000077234</Text>
          </View>
        </View>

        {/* Top Products Podium */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Best Purchases</Text>
          
          {transactions.length === 0 ? (
            <View style={[styles.emptyPodiumContainer, { borderColor: theme.border }]}>
              <Ionicons name="podium-outline" size={40} color={theme.border} />
              <Text style={[styles.emptyText, { color: theme.text }]}>No transactions yet.</Text>
            </View>
          ) : (
            <View style={[styles.podiumWrapper, { backgroundColor: theme.card }]}>
              {renderPodiumBlock(topProducts[1], '2', 180, '#C0C0C0')}   {/* Silver */}
              {renderPodiumBlock(topProducts[0], '1', 220, '#FFD700')}   {/* Gold */}
              {renderPodiumBlock(topProducts[2], '3', 150, '#CD7F32')}   {/* Bronze */}
            </View>
          )}
        </View>

        {/* Total Spending */}
        <View style={[styles.spendingContainer, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <View style={styles.spendingRow}>
            <View>
              <Text style={[styles.spendingLabel, { color: theme.text }]}>Total Spending</Text>
              <Text style={[styles.spendingSub, { color: '#888' }]}>Accumulated from all orders</Text>
            </View>
            <Text style={[styles.spendingValue, { color: theme.primary }]}>
              Rp {totalSpending.toLocaleString('id-ID')}
            </Text>
          </View>
        </View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 20, paddingBottom: 40 },
  
  // Profile
  profileCard: {
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 5,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    marginBottom: 30,
    marginTop: 10,
    position: 'relative'
  },
  focusLabel: {
    position: 'absolute',
    top: -15,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    elevation: 3,
  },
  focusLabelText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    marginTop: 10,
    borderWidth: 3,
    borderColor: '#10B981',
    overflow: 'hidden',
  },
  avatar: { width: '100%', height: '100%' },
  name: { fontSize: 24, fontWeight: 'bold' },
  genderBadge: {
    padding: 6,
    borderRadius: 20,
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nimBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
  },
  nim: { fontWeight: 'bold', marginLeft: 8, fontSize: 16 },

  // Podium
  sectionContainer: { marginBottom: 30 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  emptyPodiumContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    borderWidth: 1,
    borderRadius: 15,
    borderStyle: 'dashed'
  },
  emptyText: { marginTop: 10, fontSize: 16 },
  podiumWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: 250,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingTop: 20,
    overflow: 'hidden'
  },
  podiumCol: {
    width: (width - 80) / 3,
    alignItems: 'center',
  },
  podiumProductContainer: {
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  podiumImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 5,
    borderWidth: 2,
    borderColor: '#10B981'
  },
  podiumProductName: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    height: 32, // Fixed height for 2 lines
  },
  podiumProductQty: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 2
  },
  podiumBase: {
    width: '100%',
    flex: 1, // fill remaining height
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 10,
  },
  podiumRankText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },

  // Spending
  spendingContainer: {
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
  },
  spendingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  spendingLabel: { fontSize: 18, fontWeight: 'bold' },
  spendingSub: { fontSize: 12, marginTop: 4 },
  spendingValue: { fontSize: 20, fontWeight: 'bold' }
});

export default Profile;
