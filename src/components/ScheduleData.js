import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-vr';
import { ActivityIndicator } from 'react-native';

export default class ScheduleData extends Component {
  state = {
    text: 'No data yet',
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.data.networkStatus === 1) {
      this.setState({ text: 'Nothing!' });
    } else if (nextProps.data.error) {
      this.setState({ text: 'Error!' });
    } else {
      this.setState({ text: 'Found something!' });
    }
  }

  render() {
    const { data } = this.props;

    return (
      <View>
        <Text
          style={{
            backgroundColor: 'white',
            fontSize: 0.1,
            color: 'black',
            fontWeight: '300',
            layoutOrigin: [0.5, 0.5],
            paddingLeft: 0.3,
            paddingRight: 0.3,
            textAlign: 'center',
            textAlignVertical: 'center',
            transform: [{translate: [0, -0.2, -2]}],
          }}
        >
          { this.state.text }
          Login:
          { data.feed && data.feed[0] && data.feed[0].repository.owner.login }
        </Text>
      </View>
    );
  }
};
