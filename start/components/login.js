import React, {useContext, useState} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Platform,
    StyleSheet,
    StatusBar
  } from 'react-native';
import Firebase from '../database/firebaseDb';

import FormInput from '../Comp/FormInput';
import FormButton from '../Comp/FormButton';
import SocialButton from '../Comp/SocialButton';

class LoginScreen extends React.Component {
  state = {
      email: '',
      password: ''
  }
  handleLogin = () => {
      const { email, password } = this.state

      Firebase.auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => this.props.navigation.navigate('Dashboard'))
          .catch(error => console.log(error))
  }
  render() {
      return (
        <View style={styles.container}>
        <Image
          source={require('../assets/icon.png')}
          style={styles.logo}
        />

        <Text style={styles.text}>University App</Text>
        
        <FormInput
          iconType="user"
          labelValue={this.state.email}
          placeholderText="Email"
          keyboardType="email-address"
          onChangeText={email => this.setState({ email })}
          autoCapitalize="none"
          autoCorrect={false}
        />

        <FormInput
          iconType="lock"
          labelValue={this.state.password}
          placeholderText="Password"
          onChangeText={password => this.setState({ password })}
          secureTextEntry={true}
        />
    
        <FormButton
          buttonTitle="Sign In"
          onPress={this.handleLogin}
        />

        <TouchableOpacity style={styles.forgotButton} onPress={() => {}}>
          <Text style={styles.navButtonText}>Forgot Password?</Text>
        </TouchableOpacity>

        {Platform.OS === 'android' ? (
          <View>
            <SocialButton
              buttonTitle="Sign In with Facebook"
              btnType="facebook"
              color="#4867aa"
              backgroundColor="#e6eaf4"
            />

            <SocialButton
              buttonTitle="Sign In with Google"
              btnType="google"
              color="#de4d41"
              backgroundColor="#f5e7ea"
            />
          </View>
        ) : null}

        <TouchableOpacity
          style={styles.forgotButton}
          onPress={() => this.props.navigation.navigate('Signup')}>
          <Text style={styles.navButtonText}>
            Don't have an acount? Create here
          </Text>
        </TouchableOpacity>

        <StatusBar hidden/>
        
    </View>
      )
  }
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f9fafd',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      },
      logo: {
        height: 150,
        width: 150,
        resizeMode: 'cover',
      },
      text: {
        fontSize: 28,
        marginBottom: 10,
        color: '#051d5f',
      },
      navButton: {
        marginTop: 15,
      },
      forgotButton: {
        marginVertical: 35,
      },
      navButtonText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#2e64e5',
      },
})