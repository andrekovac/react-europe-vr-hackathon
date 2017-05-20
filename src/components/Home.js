import React from 'react';
import {
  asset,
  Pano,
  Text,
  View,
} from 'react-vr';

import ScheduleData from './ScheduleData';

export default class Home extends React.Component {
  state = {
    textColor: 'blue',
    tintColor: 'purple',
  };

  render() {
    return (
      <View>
        <Pano
          source={asset('chess-world.jpg')}
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
            this.props.data.refetch();
          }}
          onExit={() => this.setState({ textColor: 'white', tintColor: 'green' })}>
        >
          React Europe
        </Text>

        <ScheduleData data={this.props.data} />
      </View>
    );
  }
};
