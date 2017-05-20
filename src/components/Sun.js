import React, { Component } from 'react';
import { Text, View, Sphere, Animated, Image } from 'react-vr';

import { ActivityIndicator } from 'react-native';

export default class Sun extends Component {
  state = {
    sunAnimation: new Animated.Value(0),
    image: "https://facebook.github.io/react/img/logo_og.png",
    ind: 0,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.start !== this.props.start && nextProps.start) {
      Animated.timing(this.state.sunAnimation, { toValue: 1, duration: 30000 }).start();
      this.changeImage();
    }
  }

  changeImage = () => {
    setInterval(() => {
      this.setState({
        image: (this.props.schedule[this.state.ind] &&
        this.props.schedule[this.state.ind].speakers[0] &&
        this.props.schedule[this.state.ind].speakers[0].avatarUrl)
        || "https://facebook.github.io/react/img/logo_og.png",
        ind: this.state.ind + 1, })
    }, 1500);
  };

  render() {
    const { schedule } = this.props;

    return (
      <View>
        <Animated.View
          style={{
            transform: [{
              translateX: this.state.sunAnimation.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [-40, 0, 40]
              }),
            }],
          }}
        >
          <Animated.View
            style={{
            transform: [{
              translateY: this.state.sunAnimation.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [0, 20, 0]
              }),
            }],
          }}
          >
            <Sphere
              radius={2}
              widthSegments={12}
              heightSegments={12}
              texture={this.state.image}
              style={{
              color: 'yellow',
              transform: [{translate: [0, 0, -10]}],
            }}
            />
          </Animated.View>
        </Animated.View>
      </View>
    );
  }
};
