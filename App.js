import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator, FlatList} from 'react-native';

export default function App() {
  

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const fetchCoronaData = async () => {
    try {
      let response = await fetch(
        'https://corona.lmao.ninja/v2/countries/Poland/'
      );
      let json = await response.json();
      console.log(json)
      setData(json)
      setLoading(false)
      //return json.movies;
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCoronaDataTest = async () => {
    console.log("success")
  };
 

  return (
    <ScrollView style={{backgroundColor: '#e7e7de'}}>
        <TouchableOpacity onPress={fetchCoronaData}>
          <View style={styles.topBar}>
            <Text style={styles.topText}>Fetch data</Text>
          </View>
        </TouchableOpacity>
        <View style={{ flex: 1, padding: 24 }}>
          {isLoading ? <ActivityIndicator/> : (
            <FlatList
              data={data}
              keyExtractor={({ id }, index) => id}
              renderItem={({ item }) => (
                <Text>{item.title}, {item.releaseYear}</Text>
              )}
            />
          )}
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
    marginTop: 40,
    flex: 1,
    backgroundColor: '#0f3057',
  },
  topText: {
    textAlign: "center",
    fontSize: 20,
    color: '#f4f4f2',
  }
});
