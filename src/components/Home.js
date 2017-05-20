import React, { Component } from 'react';
import {
  asset,
  Pano,
  Text,
  View,
  PointLight,
  SpotLight,
  AmbientLight,
} from 'react-vr';

import Rain from './Rain';
import Sun from './Sun';

export default class Home extends Component {
  state = {
    textColor: 'blue',
    tintColor: 'purple',
  };

  renderPano = () => (
    <Pano
      source={asset('outdoors.jpg')}
      style={{ tintColor: this.state.tintColor }}
    />
  );

  renderLight = () => (
    <AmbientLight intensity={0} />
// <PointLight intensity={20} distance={40} style={{ color: 'red' }} />
  );

  renderMenu = () => {
    const { data } = this.props;

    return (
      <View>
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
      </View>
    );
  };

  render() {
    return (
      <View>
        {this.renderPano()}
        {this.renderMenu()}
        <Rain start={this.state.speed} />
        <Sun data={this.props.data} />
      </View>
    );
  }
};
