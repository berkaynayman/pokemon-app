import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableHighlight } from 'react-native';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import List from './Screen/List';

export default function App() {
  const [data, setData] = useState(null)
  const [search, setSearch] = useState('')
  const [filteredDataSource, setFilteredDataSource] = useState([])
  const [favorites, setFavorites] = useState([])
  const [showFavorites, setShowFavorites] = useState(false)

  const Stack = createNativeStackNavigator()

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon')
        .then(response => {
            const results = response.data.results.map(item => ({...item, isFav: false}))
            setData(results)
            setFilteredDataSource(results)
        }).catch(error => {
            console.log(error)
        })
  }, [])

  const favoritesAction = (item) => {
    if(item.isFav){
      item.isFav = false
      const filtered = favorites.filter(i => i.name !== item.name)
      setFavorites(filtered)
    }else{
      item.isFav = true
      setFavorites([...favorites, {...item}])
    }
  }

  const searchFilter = (text) => {
    // check f searched text is not blank
    if (text){
      const newData = data.filter(item => {
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase()
        const textData = text.toUpperCase()
        return itemData.indexOf(textData) > -1
      })
      setFilteredDataSource(newData)
      setSearch(text)
    }else{
      setFilteredDataSource(data)
      setSearch(text)
    }
  }

  const Home = ({ navigation }) => {
    return(
      <View style={styles.container}>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => searchFilter(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder='Search Here'
        />
        <TouchableHighlight
            style={styles.detailBtn}
            underlayColor={'#68a9cf'}
            onPress={() => navigation.navigate('Favorites')}
        >
            <Text style={styles.btnText}>
            👀 Show Favorites
            </Text>
        </TouchableHighlight> 
        <List
          filteredDataSource={filteredDataSource}
          favoritesAction={favoritesAction}
          navigation={navigation}
        />
      </View>
    )
  }

  const DetailsScreen = ({ route, navigation }) => {
    const { itemId, otherParam } = route.params;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Text>itemId: {JSON.stringify(itemId)}</Text>
        <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      </View>
    );
  }

  const Favorites = () => {

    return (
      <View style={styles.container}>
        <List
          filteredDataSource={favorites}
          favoritesAction={favoritesAction}
        />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{ title: 'Pokemons' }}/>
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Favorites" component={Favorites} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16
  },
  textInputStyle: {
    fontSize:20,
    height: 60,
    borderWidth: 4,
    paddingLeft: 20,
    marginTop: 20,
    marginBottom: 10,
    borderColor: '#68a0cf',
    borderRadius: 8,
    color: '#333',
    backgroundColor: '#f5f5f5',
  },
  title: {
      fontSize: 38,
      alignSelf: "center",
      marginBottom: 20,
  },
  detailBtn:{
    backgroundColor: '#68a0cf',
    borderRadius: 8,
    paddingVertical: 12,
    marginBottom: 12,
  }, 
  btnText: {
    fontSize: 20,
    color: '#f5f5f5',
    textAlign: 'center',
    fontWeight: 'bold'
},
});
