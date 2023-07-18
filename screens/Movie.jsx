import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ScrollView } from 'react-native'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { HeartIcon } from 'react-native-heroicons/solid'
import { Image } from 'react-native'
import Cast from '../components/cast'
import MovieList from '../components/MovieList'
import { fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, image342, image500 } from '../api/moviedb'

var { width, height } = Dimensions.get('window')
const Movie = () => {
    const { params: item } = useRoute();
    const navigation = useNavigation();
    const [movie, setMovie] = useState({});
    const [cast, setCast] = useState([])
    const [similarMovies, setSimilarMovies] = useState([])
    const [isFavourite, toggleFavourite] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getMovieDetials(item.id);
        getMovieCredits(item.id);
        getSimilarMovies(item.id);
    }, [item]);

    const getMovieDetials = async id => {
        const data = await fetchMovieDetails(id);
        setLoading(false);
        if (data) {
            setMovie({ ...movie, ...data });
        }
    }
    const getMovieCredits = async id => {
        const data = await fetchMovieCredits(id);
        if (data && data.cast) {
            setCast(data.cast);
        }

    }
    const getSimilarMovies = async id => {
        const data = await fetchSimilarMovies(id);
        if (data && data.results) {
            setSimilarMovies(data.results);
        }

    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} className='bg-[#2D033B] rounded-lg p-1'>
                    <ChevronLeftIcon size='28'  strokeWidth={2.5} color='white' />
                </TouchableOpacity>
                <TouchableOpacity className='shadow-md shadow-[#2D033B]'  onPress={() => toggleFavourite(!isFavourite)}>
                    <HeartIcon size='28' color={isFavourite ? 'red' : 'white'} />
                </TouchableOpacity>
            </View>
            <View style={styles.imageContainer}>
                <Image source={{ uri: image500(movie.poster_path) }} style={styles.image} />
            </View>
            <View style={{ marginTop: 20 }} >
                <Text className="text-white text-center text-3xl font-bold tracking-widest">
                    {
                        movie?.title
                    }
                </Text>
                {
                    movie?.id ? (
                        <Text className="text-neutral-400 font-semibold text-base text-center">
                            {movie?.status} • {movie?.release_date?.split('-')[0] || 'N/A'} • {movie?.runtime} min
                        </Text>
                    ) : null
                }

            </View>
            <View className="flex-row justify-center mx-5  space-x-1">
                {
                    movie?.genres?.map((genre, index) => {
                        let showDot = index + 1 != movie.genres.length;
                        return (
                            <Text key={index} className="text-neutral-400 font-semibold text-xs text-center">
                                {genre?.name} {showDot ? "•" : null}
                            </Text>
                        )
                    })
                }

            </View>
            <Text className="text-neutral-400 mx-4 tracking-wide my-5">
                {
                    movie?.overview
                }
            </Text>
            {
                movie?.id && cast.length > 0 && <Cast navigation={navigation} cast={cast} />
            }
            {
                movie?.id && similarMovies.length > 0 && <MovieList title={'Similar Movies'} hideSeeAll={true} data={similarMovies} />
            }
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2D033B',
    },

    header: {
        position: 'absolute',
        zIndex: 2,
        paddingTop: 50,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    imageContainer: {
        flex: 1,
        width: width,
        height: height * 0.4,
        overflow: 'hidden',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    description: {
        paddingHorizontal: 20,
        marginVertical: 20,
        color: 'rgba(255, 255, 255, 0.6)',
    }
});



export default Movie
