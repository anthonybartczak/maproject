import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator, FlatList} from 'react-native';
import { PieChart } from 'react-minimal-pie-chart';

export default function App() {
  

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const fetchCoronaData = async () => {
    try {
      let response = await fetch(
        'https://corona.lmao.ninja/v2/countries/Poland/'
      );
      let json = await response.json();
      delete json['countryInfo']
      console.log(json)
      setData(json)
      setLoading(false)
    } catch (error) {
      console.error(error);
    }
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
            <View>
              <Text>Cases today: {data.todayCases}</Text>
              <Text>Cases total: {data.cases}</Text>
              <Text>Deaths today: {data.todayDeaths}</Text>
              <Text>Deaths total: {data.deaths}</Text>
              <PieChart
                label={({ dataEntry }) => dataEntry.value}
                labelStyle={(index) => ({
                  fontSize: '5px',
                  fontFamily: 'sans-serif',
                })}
                labelPosition={60}
                animate
                radius={30}
                lineWidth={15}
                paddingAngle={5}
                data={[
                  { title: 'One', value: data.todayCases, color: '#E38627' },
                  { title: 'Two', value: data.todayRecovered, color: '#C13C37' },
                ]}
              />
            </View>
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
