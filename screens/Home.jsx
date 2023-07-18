import { View, Text, StyleSheet, SafeAreaView, StatusBar, ScrollView } from "react-native";
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import React, { useEffect, useState } from "react";
import TrendingMovies from "../components/trendingMovies";
import MovieList from "../components/MovieList";
import { useNavigation } from "@react-navigation/native";
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from "../api/moviedb";

export default function HomeScreen() {

    const [trending, setTrending] = useState([])
    const [upcoming, setUpcoming] = useState([])
    const [top_rated, setTop_rated] = useState([])
    const navigation = useNavigation()

    useEffect(() => {
        getTrendingMovies()
        getUpcomingMovies()
        getTopRatedMovies()
    }, [])

    const getTrendingMovies = async () => {
        const data = await fetchTrendingMovies();
        if (data && data.results) {
            setTrending(data.results)
        }
    }
    const getUpcomingMovies = async () => {
        const data = await fetchUpcomingMovies();
        if (data && data.results) {
            setUpcoming(data.results)
        }
    }
    const getTopRatedMovies = async () => {
        const data = await fetchTopRatedMovies();
        if (data && data.results) {
            setTop_rated(data.results)
        }
    }
    return (
        <View style={styles.container}>
            <SafeAreaView >
                <StatusBar style="auto" />
                <View style={styles.innerView}>
                    <Bars3CenterLeftIcon size='30' strokeWidth={2} color='white' />
                    <Text style={styles.logo} > <Text className='text-[#ca2dff]' >I</Text>movies</Text>
                    <MagnifyingGlassIcon onPress={() => navigation.navigate('search')} size='30' strokeWidth={2} color='white' />
                </View>
            </SafeAreaView>

            <ScrollView
                showsVerticalScrollIndicator={false} >
                {trending.length > 0 && <TrendingMovies data={trending} />}
                {upcoming.length > 0 && <MovieList title={'Upcoming'} data={upcoming} />}
               {top_rated.length>0 && <MovieList title={'Top Rated'} data={top_rated} />}
            </ScrollView>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2D033B',
        flex: 1,
    },

    innerView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
        marginBottom: 10
    },
    logo: {
        color: 'white',
        fontSize: 25,
        fontWeight: '700'

    }
});