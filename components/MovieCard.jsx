import { Dimensions, Image, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { image500 } from '../api/moviedb';

var { width, height } = Dimensions.get('window');

const MovieCard = ({ item, handleClick }) => {
    return (
        <TouchableWithoutFeedback onPress={() => handleClick(item)} >
            <Image source={{uri: image500(item.poster_path)}}
                style={[styles.image, { width: width * 0.6, height: height * 0.4 }]}
            />

        </TouchableWithoutFeedback>
    )
}


const styles = StyleSheet.create({
    image: {
        borderRadius: 36,
        marginBottom: 0,
        paddingBottom: 0,
    }
})
export default MovieCard