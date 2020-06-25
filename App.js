import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NavigationContainer, useLinkProps } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';




export default App = () => {
  const Stack = createStackNavigator(); 
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://api.penncoursereview.com/depts/?token=public')
      .then((response) => response.json())
      .then((d) => setData(d.result.values))
      .then(console.log(data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);
  console.log("Hello World")
  console.log(data)

  function segue(navigation, e){
    console.log(this)
    navigation.navigate("Major", {"name": e})
    console.log(e)
  }

  function HomeScreen(props){
    return(
      <View style={styles.container}> 
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={data}
          renderItem={({ item }) => {
            return (
            <TouchableHighlight onPress={() => segue(props.navigation, item.id)}> 
            <Text style={styles.item}>{item.id} hello</Text>
            </TouchableHighlight>
          )}
        }
        />
      )}
      </View> 
    )
  }

  function Major(props){
    const name = props.route.params.name
    return (
      <Text> {name} </Text>
    )
  }

  return (
    <NavigationContainer >
      <Stack.Navigator>
        <Stack.Screen name="Majors" component={HomeScreen} />
        <Stack.Screen name="Major" component={Major} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    borderColor: 'black',
    borderBottomLeftRadius: 2, 
    borderWidth: .5
  },
})