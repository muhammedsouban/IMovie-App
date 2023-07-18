import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/Home";
import Movie from "../screens/Movie";
import PersonScreen from "../screens/person";
import SearchScreen from "../screens/search";


const Stack = createNativeStackNavigator();


export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
                <Stack.Screen name="Movie" options={{ headerShown: false }} component={Movie} />
                <Stack.Screen name="person" options={{ headerShown: false }} component={PersonScreen} />
                <Stack.Screen name="search" options={{ headerShown: false }} component={SearchScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}