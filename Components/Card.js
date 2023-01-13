import axios from 'axios';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const Card = ({ item }) => {

    const [data, setData] = useState(null)

    useEffect(() => {
        axios.get(item.url)
            .then(response => {
                setData(response.data.sprites.other.home.front_default)
            }).catch(error => {
                console.log(error)
            })
    }, [])

    return (
        <View style={styles.pokemonContainer}>
            <Text style={styles.pokemonTitle}>
                {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
            </Text>
            <Image
                style={styles.pokemonSprite}
                source={{
                    uri: data,
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 60,
},
title: {
    fontSize: 38,
    alignSelf: "center",
    marginBottom: 20,
},
pokemonContainer: { backgroundColor: "lightgrey", marginTop: 10 },
pokemonTitle: {
    fontSize: 32,
    alignSelf: "center",
    marginTop: 10,
},
pokemonSprite: {
    width: 200,
    height: 200,
    alignSelf: "center",
},
});

export default Card