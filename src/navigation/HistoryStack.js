import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import History from '../screens/History';
import HistoryDetail from '../screens/HistoryDetail';

const Stack = createStackNavigator();

const HistoryStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HistoryMain" component={History} />
      <Stack.Screen name="HistoryDetail" component={HistoryDetail} />
    </Stack.Navigator>
  );
};

export default HistoryStack;
