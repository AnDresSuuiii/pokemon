// Utilidades de React Navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

// Pantallas de navegación
import PokemonList from '../screens/PokemonList';
import HomeScreen from '../screens/HomeScreen';
import PokemonAxios from '../screens/PokemonAxios';
import GithubSearch from '../screens/GithubSeacrh';

// Navegador Bottom Tabs Navigator
const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <Tab.Navigator>
    <Tab.Screen
  name="HomeScreen"
  component={HomeScreen}
  options={{
    title: 'Inicio',
    tabBarActiveTintColor: '#FFC300',
    headerStyle: {
      backgroundColor: '#FFC300',
    },
    headerTintColor: '#fff',
    tabBarIcon: ({ color }) => (
      <Ionicons name="home" color={color} size={24} />
    ),
  }}
/>
<Tab.Screen
  name="PokemonAxios"
  component={PokemonAxios}
  options={{
    title: 'Pokemon Axios',
    tabBarActiveTintColor: '#cc0000',
    headerStyle: {
      backgroundColor: '#cc0000',
      borderBottomRightRadius: 35,
      borderBottomLeftRadius: 35,
    },
    headerTintColor: '#fff',
    tabBarIcon: ({ color }) => (
      <Ionicons name="list" color={color} size={24} />
    ),
  }}
/>
<Tab.Screen
  name="PokemonList"
  component={PokemonList}
  options={{
    title: 'Pokemon Fetch',
    tabBarActiveTintColor: '#3b4cca',
    headerStyle: {
      backgroundColor: '#3b4cca',
    },
    headerTintColor: '#fff',
    tabBarIcon: ({ color }) => (
      <Ionicons name="list" color={color} size={24} />
    ),
  }}
/>
<Tab.Screen
  name="API GitHub"
  component={GithubSearch}
  options={{
    title: 'GitHubs',
    tabBarActiveTintColor: '#3b4cca',
    headerStyle: {
      backgroundColor: '#3b4cca',
    },
    headerTintColor: '#fff',
    tabBarIcon: ({ color }) => (
      <Ionicons name="search" color={color} size={24} />
    ),
  }}
/>

  </Tab.Navigator>
  
  );
}
