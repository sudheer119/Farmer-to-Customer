// components/signup.js

import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert,  } from 'react-native';
import firebase from '../database/firebaseDb';
import FormInput from '../Comp/FormInput';
import FormButton from '../Comp/FormButton';
import SocialButton from '../Comp/SocialButton';


export default class Signup extends Component {
  
  constructor() {
    super();
    this.state = { 
      displayName: '',
      email: '', 
      password: '',
      isLoading: false
    }
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  registerUser = () => {
    if(this.state.email === '' && this.state.password === '') {
      Alert.alert('Enter details to signup!')
    } else {
      this.setState({
        isLoading: true,
      })
      firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        res.user.updateProfile({
          displayName: this.state.displayName
        })
        console.log('User registered successfully!')
        this.setState({
          isLoading: false,
          displayName: '',
          email: '', 
          password: ''
        })
        this.props.navigation.navigate('Login')
      })
      .catch(error => this.setState({ errorMessage: error.message }))      
    }
  }

  render() {   
    return (
      <View style={styles.container}>  
        <FormInput
          
          placeholder="Name"
          value={this.state.displayName}
          onChangeText={(val) => this.updateInputVal(val, 'displayName')}
        />      
        <FormInput
          iconType="user"
          labelValue={this.state.email}
          placeholderText="Email"
          keyboardType="email-address"
          onChangeText={(val) => this.updateInputVal(val, 'email')}
          autoCapitalize="none"
          autoCorrect={false}
        />

        <FormInput
          iconType="lock"
          labelValue={this.state.password}
          placeholderText="Password"
          onChangeText={(val) => this.updateInputVal(val, 'password')}
          secureTextEntry={true}
        />
    
        <FormButton
          buttonTitle="Sign In"
          onPress={this. registerUser}
        />

        <Text 
          style={styles.loginText}
          onPress={() => this.props.navigation.navigate('Login')}>
          Already Registered? Click here to login
        </Text>                          
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 35,
    backgroundColor: '#fff'
  },
  inputStyle: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1
  },
  loginText: {
    color: '#3740FE',
    marginTop: 25,
    textAlign: 'center'
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  }
});