import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions, StatusBar, TouchableOpacity } from 'react-native';
import SearchBar from './SearchBar';
import { haze, rainy, snow, sunny } from '../assets/backgroundImages/index';
 
export default function Weather({ weatherData, fetchWeatherData }) {
    const [backgroundImage, setBackgroundImage] = useState(null);
    const [isCelsius, setIsCelsius] = useState(true); // State to track temperature unit
 
    const {
        weather,
        name,
        main: { temp, humidity },
        wind: { speed }
    } = weatherData;
    const [{ main }] = weather;
 
    useEffect(() => {
        setBackgroundImage(getBackgroundImg(main));
    }, [weatherData]);
 
    function getBackgroundImg(weather) {
        if (weather === 'Snow') return snow;
        if (weather === 'Clear') return sunny;
        if (weather === 'Rain') return rainy;
        if (weather === 'Haze') return haze;
        return haze;
    }
 
    const temperature = isCelsius ? `${((temp - 273.15) * 9/5 + 32).toFixed(1)} °F` : `${(temp - 273.15).toFixed(1)} °C`;
 
 
 
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="lightblue" />
            <ImageBackground source={backgroundImage} style={styles.backgroundImg} resizeMode="cover">
                <SearchBar fetchWeatherData={fetchWeatherData} />
 
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ ...styles.headerText, color: 'black', fontWeight: 'bold', fontSize: 46 }}>{name}</Text>
                    <Text style={{ ...styles.headerText, color: 'black', fontWeight: 'bold' }}>{main}</Text>
                    <Text style={{ ...styles.headerText, color: 'black' }}>{temperature}</Text>
                </View>
 
                <View style={styles.extraInfo}>
                    <View style={styles.info}>
                        <Text style={{ fontSize: 22, color: 'white' }}>Humidity</Text>
                        <Text style={{ fontSize: 22, color: 'white' }}>{humidity} %</Text>
                    </View>
                    <View style={styles.info}>
                        <Text style={{ fontSize: 22, color: 'white' }}>Wind Speed</Text>
                        <Text style={{ fontSize: 22, color: 'white' }}>{speed} m/s</Text>
                    </View>
                </View>
 
                {/* Button to toggle temperature unit */}
                <TouchableOpacity
                    style={styles.unitButton}
                    onPress={() => setIsCelsius(!isCelsius)}>
                    <Text style={{ color: 'white' }}>{isCelsius ? 'Switch to Celsius' : 'Switch to Fahrenheit'}</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    );
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    backgroundImg: {
        flex: 1,
        width: Dimensions.get('screen').width,
    },
    headerText: {
        fontSize: 36,
        marginTop: 10,
    },
    extraInfo: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-between',
        padding: 10,
    },
    info: {
        width: Dimensions.get('screen').width / 2.5,
        backgroundColor: 'rgba(0,0,0, 0.5)',
        padding: 10,
        borderRadius: 15,
        justifyContent: 'center',
    },
    unitButton: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 10,
        borderRadius: 10,
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
    },
});
