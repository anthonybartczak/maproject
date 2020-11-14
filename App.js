import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator, Dimensions} from 'react-native';
import { PieChart } from "react-native-chart-kit";


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

  const screenWidth = Dimensions.get("window").width;

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    propsForLabels: {
      fontFamily: 'sans-serif',
      fontWeight: 'bold',
    },
  };

  const PCdata = [
    {
      name: "cases",
      population: data.todayCases,
      color: "#E64D3E",
      legendFontColor: "#040c16",
      legendFontSize: 15
    },
    {
      name: "recovered",
      population: data.todayRecovered,
      color: "#C1E610",
      legendFontColor: "#040c16",
      legendFontSize: 15
    },
    {
      name: "deaths",
      population: data.todayDeaths,
      color: "#277DE6",
      legendFontColor: "#040c16",
      legendFontSize: 15
    },
  ];

  return (
    <ScrollView style={{backgroundColor: '#e7e7de'}}>

        <TouchableOpacity onPress={fetchCoronaData}>
          <View style={styles.topBar}>
            <Text style={styles.topText}>Fetch data</Text>
          </View>
        </TouchableOpacity>

        <View>
          {isLoading ? <ActivityIndicator/> : (
            <View>
              <View style={styles.dataDesign}>
                <Text style={styles.dataStyles}>{data.todayCases}</Text>
                <Text style={styles.labelStyles}>cases today</Text>

                <Text style={styles.dataStyles}>{data.cases}</Text>
                <Text style={styles.labelStyles}>total cases</Text>

                <Text style={styles.dataStyles}>{data.todayDeaths}</Text>
                <Text style={styles.labelStyles}>deaths today</Text>

                <Text style={styles.dataStyles}>{data.deaths}</Text>
                <Text style={styles.labelStyles}>total deaths</Text>
              </View>
              <PieChart
                data={PCdata}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
                hideLegend='true'
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
  dataDesign: {
    marginBottom: 70,
  },
  topBar: {
    flex: 1,
    backgroundColor: '#0f3057',
    marginBottom: 40,
    marginRight:20,
    marginLeft:20,
    marginTop:10,
    paddingTop:20,
    paddingBottom:20,
    borderRadius:10,
    borderWidth: 1,
  },
  topText: {
    textAlign: "center",
    fontSize: 30,
    color: '#f4f4f2',
  },
  dataStyles: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    color: '#0f3057',
  },
  labelStyles: {
    textAlign: "center",
    fontSize: 19,
    fontFamily: 'sans-serif',
    marginBottom: 15,
  },
  circleOrange: {
    width: 25,
    height: 25,
    borderRadius: 100/2,
    backgroundColor: '#E38627'
  },
  circleRed: {
    width: 25,
    height: 25,
    borderRadius: 100/2,
    backgroundColor: '#C13C37'
}
});
