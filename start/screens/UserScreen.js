// screens/UserScreen.js

import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from '../database/firebaseDb';
import Communications from 'react-native-communications';
import { color } from 'react-native-reanimated';
class UserScreen extends Component {

    constructor() {
        super();
        this.firestoreRef = firebase.firestore().collection("users");
        this.state = {
            isLoading: true,
            userArr: []
        };
    }

    componentDidMount() {
        this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    getCollection = (querySnapshot) => {
        const userArr = [];
        querySnapshot.forEach((res) => {
            const { name,pincode, email, mobile } = res.data();
            userArr.push({
                key: res.id,
                res,
                name,
                pincode,
                email,
                mobile,
            });
        });
        this.setState({
            userArr,
            isLoading: false,
        });
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.preloader}>
                    <ActivityIndicator size="large" color="black" />
                </View>
            )
        }
        return (
            <ScrollView style={styles.container}>
                {
                    this.state.userArr.map((item, i) => {
                        return (
                            <ListItem
                                key={i}
                                black
                                bottomDivider
                                title={item.name}
                                subtitle={item.mobile}
                                onPress={() => Communications.phonecall(item.mobile, true)}></ListItem>
                                
                               
                        );
                    })
                }
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 50,
        color:"red"
    },
    preloader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default UserScreen;