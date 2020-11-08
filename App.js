import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

const getMoviesFromApi = async () => {
  try {
    const response = await fetch('https://corona.lmao.ninja/v2/countries/Poland');
    const json = await response.json();
    return json.corona;
  }
  catch (error) {
    console.error(error);
  }
};

export default function App() {
  return (
    <ScrollView style={styles.topBar}>
      <View style={styles.container}>
        <Text></Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#31326f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBar: {
    flex: 1,
    backgroundColor: '#dbf6e9',
  },
});
