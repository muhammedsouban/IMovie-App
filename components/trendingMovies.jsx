import { View, Text, StyleSheet, Dimensions } from 'react-native'
import Carousel from 'react-native-snap-carousel';
import MovieCard from './MovieCard';
import React from 'react'
import { useNavigation } from '@react-navigation/native';

var { width, height } = Dimensions.get('window');

export default TrendingMovies = ({ data }) => {
    const navigation = useNavigation()

    const handleClick = item => {
        navigation.push('Movie', item)
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Trending</Text>
            
            <Carousel
                data={data}
                renderItem={({ item }) => <MovieCard item={item} handleClick={handleClick} />}
                firstItem={1}
                inactiveSlideOpacity={0.60}
                sliderWidth={width}
                itemWidth={width * 0.62}
                slideStyle={{ display: 'flex', alignItems: 'center' }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        marginBottom: 20,
    },
    title: {
        color: 'white',
        marginHorizontal: 20,
        marginBottom: 20,
        fontSize: 25,
    }
})