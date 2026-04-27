import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import DashboardScreen from './screens/DashboardScreen'
import ReviewsScreen from './screens/ReviewsScreen'
import { View, Text, StyleSheet } from 'react-native'

const Tab = createBottomTabNavigator()

// Placeholder screens for other tabs
const PlaceholderScreen = ({ title }: { title: string }) => (
  <View style={styles.placeholder}>
    <Text style={styles.placeholderText}>{title}</Text>
    <Text style={styles.placeholderSubtext}>Yakında aktif olacak</Text>
  </View>
)

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: string = 'home'

            if (route.name === 'Dashboard') {
              iconName = focused ? 'home' : 'home-outline'
            } else if (route.name === 'Yorumlar') {
              iconName = focused ? 'chatbubbles' : 'chatbubbles-outline'
            } else if (route.name === 'QR Kodlar') {
              iconName = focused ? 'qr-code' : 'qr-code-outline'
            } else if (route.name === 'Analitik') {
              iconName = focused ? 'bar-chart' : 'bar-chart-outline'
            } else if (route.name === 'Ayarlar') {
              iconName = focused ? 'settings' : 'settings-outline'
            }

            return <Ionicons name={iconName as any} size={size} color={color} />
          },
          tabBarActiveTintColor: '#3B82F6',
          tabBarInactiveTintColor: '#6B7280',
          tabBarStyle: {
            backgroundColor: '#fff',
            borderTopWidth: 1,
            borderTopColor: '#E5E7EB',
            height: 85,
            paddingBottom: 20,
            paddingTop: 10,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
          },
          headerShown: false,
        })}
      >
        <Tab.Screen 
          name="Dashboard" 
          component={DashboardScreen}
          options={{
            tabBarLabel: 'Ana Panel',
          }}
        />
        <Tab.Screen 
          name="Yorumlar" 
          component={ReviewsScreen}
          options={{
            tabBarBadge: 5,
          }}
        />
        <Tab.Screen 
          name="QR Kodlar" 
          children={() => <PlaceholderScreen title="QR Kodlar" />}
        />
        <Tab.Screen 
          name="Analitik" 
          children={() => <PlaceholderScreen title="Analitik" />}
        />
        <Tab.Screen 
          name="Ayarlar" 
          children={() => <PlaceholderScreen title="Ayarlar" />}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
  },
  placeholderText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  placeholderSubtext: {
    fontSize: 16,
    color: '#6B7280',
  },
})

export default App
