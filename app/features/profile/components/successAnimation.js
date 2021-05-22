import React, { Component } from "react";
import { View } from "react-native";
import LottieView from 'lottie-react-native';

export default class SuccessAnimation extends Component {

    constructor(props) {
        super(props);
        
    }
    

    render() {
        return (
            <LottieView source={require("../../../assets/anim/success.json")} autoPlay loop style={{ position: 'absolute', top: 0, right: 0, left: 0 }} />
        )
    }
}