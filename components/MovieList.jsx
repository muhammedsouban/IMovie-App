import { View, Text, ScrollView, TouchableWithoutFeedback, Image, Dimensions, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { image185 } from '../api/moviedb';
const { width, height } = Dimensions.get('window');

export default function MovieList({ title, hideSeeAll, data }) {
    const navigation = useNavigation();

    return (
        <View style={styles.maincontainer}>

            <View style={styles.container}>
                <Text style={styles.title}>{title}</Text>
                {
                    !hideSeeAll &&
                    <TouchableOpacity>
                        <Text className='text-[#e28aff]' >See All</Text>
                    </TouchableOpacity>
                }
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 15 }}
            >
                {
                    data.map((item, index) => {
                        return (
                            <TouchableWithoutFeedback
                                key={index}
                                onPress={() => navigation.push('Movie', item)}
                            >
                                <View style={styles.itemContainer}>
                                    <Image source={{ uri: image185(item.poster_path) }}
                                        style={styles.image} />
                                    <Text className="text-neutral-300 mt-2 ml-1">
                                        {
                                            item.title.length > 14 ? item.title.slice(0, 14) + '...' : item.title
                                        }
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginBottom: 15
    },
    maincontainer: {
        marginBottom: 40
    },
   
    title: {
        fontSize: 20,
        color: 'white',

    },
    itemContainer: {
        marginRight: 10
    },
    image: {
        width: width * 0.3,
        height: height * 0.2,
        borderRadius: 20
    },
    name: {
        marginTop: 10,
        color: 'white'
    }
})