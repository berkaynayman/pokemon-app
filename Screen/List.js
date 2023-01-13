import axios from 'axios';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, Image, TouchableHighlight } from 'react-native';

export default function List({filteredDataSource, favoritesAction, navigation}) {
    const ItemSeparatorView = () => {
        return (
            // Flat List Item Separator
            <View
                style={{
                    height: 0.5,
                    width: '100%',
                    backgroundColor: '#C8C8C8',
                }}
            />
        );
    };

    const Card = ({ item }) => {

        const [url, setUrl] = useState(null)
    
        useEffect(() => {
            axios.get(item.url)
                .then(response => {
                    setUrl(response.data.sprites.other.home.front_default)
                }).catch(error => {
                    console.log(error)
                })
        }, [])
    
        return (
            <View style={styles.pokemonContainer}>
                <Image
                    style={styles.pokemonSprite}
                    source={{
                        uri: url,
                    }}
                />
                <Text style={styles.pokemonTitle}>
                    {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                </Text>
                <TouchableHighlight
                    style={styles.favBtn}
                    underlayColor={'#c0cf68'}
                    onPress={() => favoritesAction(item)}
                >
                    <Text style={styles.btnText}>
                        { item.isFav ? '💔 Remove at Favorites' : '❤️ Add to Favorites'}
                    </Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.detailBtn}
                    underlayColor={'#68a9cf'}
                    onPress={() => navigation.navigate('Details',
                        {
                            itemId: 86,
                            otherParam: 'anything you want here' 
                        }
                    )}
                >
                    <Text style={styles.btnText}>
                    👀 Detail
                    </Text>
                </TouchableHighlight> 
            </View>
        );
    }

    return (
        <SafeAreaView>
            <View>
                    
                    {
                        filteredDataSource.length > 0
                            ? (
                                <></>
                            )
                            : (
                                <Text style={styles.noResult}>No results found.</Text>
                            )
                    }
                    <FlatList
                        contentContainerStyle={{ paddingBottom: 240 }}
                        data={filteredDataSource}
                        keyExtractor={(item, index) => index.toString()}
                        ItemSeparatorComponent={ItemSeparatorView}
                        renderItem={({item, index}) => <Card item={item} key={index} />}
                    />
            </View>
        </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({
    textInputStyle: {
        fontSize:20,
        height: 60,
        borderWidth: 4,
        paddingLeft: 20,
        marginTop: 50,
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
    pokemonContainer: {
        backgroundColor: "#fff",
        borderRadius: 8,
        width: "100%",
        marginBottom: 10,
        marginTop: 10,
    },
    pokemonTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: '#333',
        alignSelf: "center",
        marginVertical: 20
    },
    pokemonSprite: {
        width: "100%",
        height: 400,
    },
    favBtn:{
        backgroundColor: '#abcf68',
        borderRadius: 8,
        borderWidth: 2,
        paddingVertical: 12,
        marginBottom: 4,
        marginHorizontal: 4,
        borderColor: '#fff',
    },
    detailBtn:{
        backgroundColor: '#68a0cf',
        borderRadius: 8,
        borderWidth: 2,
        paddingVertical: 12,
        marginBottom: 4,
        marginHorizontal: 4,
        borderColor: '#fff',
    },
    btnText: {
        fontSize: 20,
        color: '#f5f5f5',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    noResult: {
        fontSize: 20,
        color: '#333',
        backgroundColor: '#f5f5f5',
        padding: 10,
        borderRadius: 8,
        textAlign: 'center',
        fontWeight: 'bold'
    }
  });