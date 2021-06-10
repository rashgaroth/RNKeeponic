import React, { Component } from 'react';
import { View } from "react-native";
import { connect } from "react-redux";
import UserProfile from "./userProfile";
import UserNotLoggedIn from "./userNotLoggedIn";
import BottomSheetComponent from '../../home/components/BottomSheet';

class Profile extends Component {

  constructor(props) {
    super(props)

    this.state = {
      snap: 0
    }
  }

  render() {
    return (
      this.props.isUserRegistered ? (
      <>
      <UserProfile />
      </>
      ) : (
      <UserNotLoggedIn snap={this.state.snap} />
      )
    );
  }
}

const mapStateToProps = (state) => ({
  isUserRegistered: state.loginReducer.isUserRegistered
})

export default connect(mapStateToProps, null)(Profile);
