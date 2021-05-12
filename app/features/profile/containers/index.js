import React, { Component } from 'react';
import { View } from "react-native";
import { connect } from "react-redux";
import UserProfile from "./userProfile";
import UserNotLoggedIn from "./userNotLoggedIn";

class Profile extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      this.props.isUserRegistered ? <UserProfile /> : <UserNotLoggedIn />
    );
  }
}

const mapStateToProps = (state) => ({
  isUserRegistered: state.loginReducer.isUserRegistered
})

export default connect(mapStateToProps, null)(Profile);
