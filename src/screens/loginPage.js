import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, Image, ImageBackground } from 'react-native';
import Login from '../login';
import { StackNavigator, NavigationAction } from 'react-navigation';
const FBSDK = require('react-native-fbsdk');

const {
  LoginButton,
  LoginManager,
  AccessToken
} = FBSDK;



export default class LoginPage extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
      user: null,
      logged: null
    }

  }


  componentDidMount() {

    //console.log(this.props)
  }


  render() {

    return (
      <View>
      
        <ImageBackground
          source={require('../pics/home.jpg')}
          style={{ width: '100%', height: '100%' }}
        >
        <View style={styles.logButton}>
       <Login nav={this.props.navigation}  />
       </View>
</ImageBackground>
       
      </View>
    )
  }

}


const styles = StyleSheet.create({


  logButton: {
    marginTop: '60%',
    marginLeft: '25%',
    
  }
});
