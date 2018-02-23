
import React from 'react';
import {  Platform,  StyleSheet,  Text,  View, Button, TouchableHighlight} from 'react-native';
import MapView from 'react-native-maps';
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});


export default class HomeScreen extends React.Component {
  render() {
    const{ navigate } = this.props.navigation
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
        title='login'
        onPress={() => this.props.navigation.navigate('Login')}
        />

<View style ={styles.container}>
       
        <MapView
          style={styles.map}
          region={{
            latitude: 44.856911, 
            longitude: -0.570162,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
        </MapView>
        
    </View>

      </View>
    );
  }
}

