import React, { Component } from 'react';
import {
  asset,
  Pano,
  Text,
  View,
} from 'react-vr';

import ScheduleData from './ScheduleData';
import Rain from './Rain';

export default class Home extends Component {
  state = {
    textColor: 'blue',
    tintColor: 'purple',
  };

  componentDidMount() {

  };

  render() {
    const { data } = this.props;

    return (
      <View>
        <View>
          <Pano
            source={asset('outdoors.jpg')}
            style={{ tintColor: this.state.tintColor }}
          />
          <Text
            style={{
            backgroundColor: 'yellow',
            fontSize: 0.7,
            color: this.state.textColor,
            fontWeight: '400',
            layoutOrigin: [0.5, 0.5],
            paddingLeft: 0.2,
            paddingRight: 0.2,
            textAlign: 'center',
            textAlignVertical: 'center',
            transform: [{translate: [0, 0, -3]}],
          }}
            onEnter={() => {
            this.setState({ textColor: 'red', tintColor: 'yellow' });
            data && data.refetch();
          }}
            onExit={() => this.setState({ textColor: 'white', tintColor: 'white' })}>
            >
              React Europe
          </Text>
          <ScheduleData data={this.props.data} />
        </View>
        <View>
          <Rain
            start={this.state.speed}
          />
        </View>
      </View>
    );
  }
};
