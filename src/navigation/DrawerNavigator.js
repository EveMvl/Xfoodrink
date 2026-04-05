import React, { useContext } from 'react';
import { View, Text, Switch, StyleSheet, Image } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Home from '../screens/Home';
import Wishlist from '../screens/Wishlist';
import Cart from '../screens/Cart';
import HistoryStack from './HistoryStack';
import Profile from '../screens/Profile';
import { ThemeContext } from '../context/ThemeContext';
import { Colors } from '../data/products';
import { Ionicons } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const theme = isDarkMode ? Colors.dark : Colors.light;

  return (
    <DrawerContentScrollView {...props} style={{ backgroundColor: theme.card }}>
      <View style={[styles.drawerHeader, { borderBottomColor: theme.border }]}>
        <Text style={styles.drawerTitle}>
          <Text style={{ color: isDarkMode ? '#FFF' : '#222', fontWeight: '400' }}>X</Text>
          <Text style={{ color: theme.primary, fontWeight: 'bold' }}>foodie</Text>
        </Text>
      </View>
      <DrawerItemList {...props} />
      <View style={[styles.themeToggleContainer, { borderTopColor: theme.border }]}>
        <View style={styles.themeToggleRow}>
          <Ionicons name={isDarkMode ? 'moon' : 'sunny'} size={24} color={theme.text} />
          <Text style={[styles.themeLabel, { color: theme.text }]}>Dark Theme</Text>
        </View>
        <Switch
          value={isDarkMode}
          onValueChange={toggleTheme}
          trackColor={{ false: '#767577', true: theme.primary }}
          thumbColor={isDarkMode ? '#ffffff' : '#f4f3f4'}
        />
      </View>
    </DrawerContentScrollView>
  );
};

const DrawerNavigator = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const theme = isDarkMode ? Colors.dark : Colors.light;

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: theme.primary,
        drawerInactiveTintColor: theme.text,
        drawerStyle: {
          backgroundColor: theme.card,
        },
      }}
    >
      <Drawer.Screen name="Home" component={Home} options={{ drawerIcon: ({ color }) => <Ionicons name="home-outline" size={22} color={color} /> }} />
      <Drawer.Screen name="Wishlist" component={Wishlist} options={{ drawerIcon: ({ color }) => <Ionicons name="star-outline" size={22} color={color} /> }} />
      <Drawer.Screen name="History" component={HistoryStack} options={{ drawerIcon: ({ color }) => <Ionicons name="time-outline" size={22} color={color} /> }} />
      <Drawer.Screen name="Profile" component={Profile} options={{ drawerIcon: ({ color }) => <Ionicons name="person-outline" size={22} color={color} /> }} />
      <Drawer.Screen name="Cart" component={Cart} options={{ drawerItemStyle: { display: 'none' } }} />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerHeader: {
    padding: 20,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  drawerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  themeToggleContainer: {
    borderTopWidth: 1,
    marginTop: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  themeToggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  themeLabel: {
    marginLeft: 15,
    fontSize: 16,
  },
});

export default DrawerNavigator;
