/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import * as firebase from "firebase";
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';


firebase.initializeApp({
  apiKey: "AIzaSyDYMR5mJnwLg4gDWJh4TLrhjcPP-2ScnyU",
  authDomain: "nauticapp-b4512.firebaseapp.com",
  databaseURL: "https://nauticapp-b4512.firebaseio.com",
  storageBucket: "nauticapp-b4512.appspot.com"
});




const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  LoginManager,
  AccessToken
} = FBSDK;


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};





export default class App extends Component<Props> {

  constructor() {
    super();

    this.state = {
      user: null
    }

    //  this.itemsRef = this.getRef().child('users');
  }





  initUser = async (token) => {
    const response = await fetch('https://graph.facebook.com/v2.5/me?fields=email,name&access_token=' + token)
    const user = await response.json()

    this.setState({ user }, () => {

      this.getData()

    });
  }


  getData = () => {
    var userList = []
    var recentPostsRef = firebase.database().ref('/users');

    recentPostsRef.once('value').then(snapshot => {
      userList = snapshot.val()

      if (userList === null) {
        this.postData()
      } else {
        const exist = Object.keys(userList).filter(user => user.facebookId === this.state.user.facebookId)
        if (exist.length > 0) {
          // ne rien faire
        } else {
          this.postData() // si l'utilisateur n'existe pas en base, on appel la méthode d'insert     
        }
      }
    })
  }



  postData = () => {
    var postData = {
      name: this.state.user.name,
      facebookId: this.state.user.id,
    };
    var newPostKey = firebase.database().ref().child('users').push().key;
    var updates = {};


    updates['/users/' + newPostKey] = postData;
    firebase.database().ref().update(updates);
  }




  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <View>
          <LoginButton
            publishPermissions={["publish_actions"]}

            onLoginFinished={
              (error, result) => {
                if (error) {
                  alert("Login failed with error: " + result.error);
                } else if (result.isCancelled) {
                  alert("Login was cancelled");
                } else {
                  AccessToken.getCurrentAccessToken().then((data) => {
                    const { accessToken } = data
                    this.initUser(accessToken)
                  })
                }
              }
            }
            onLogoutFinished={() => alert("User logged out")} />
        </View>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
