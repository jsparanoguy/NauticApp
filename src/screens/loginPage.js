import React, { Component } from 'react';
import {  Platform,  StyleSheet,  Text,  View, Button} from 'react-native';
import Login from '../login';
const FBSDK = require('react-native-fbsdk');

const {
  LoginButton,
  LoginManager,
  AccessToken
} = FBSDK;




export default class LoginPage extends React.Component{


  constructor(props) {
    super(props);

    this.state = {
      user: null,
      logged: null
    }

  }


  componentDidMount(){
      console.log(this.state.logged)
  }


render(){

    return(
        <View>
           <Login/>
           <Button
           title='Home' 
           onPress={()=> this.props.navigation.navigate('Home')}/>
            </View>
    )
}

}



