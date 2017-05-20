import React, { Component } from 'react';
import {
  View,
  Sphere,
  Animated,
} from 'react-vr';

export default class Rain extends Component {
  numberDrops = 400;
  xDisplacements = [];
  zDisplacements = [];

  state = {
    yDisplacements: [],
    dropAnimation: new Animated.Value(0),
    disappearAnimation: new Animated.Value(0),
  };

  constructor(props, context) {
    super(props, context);
    for (let i = 0; i < this.numberDrops; i++) {
      this.xDisplacements.push(this.getRandom(-20, 20));
      this.zDisplacements.push(this.getRandom(-20, 20));
      this.state.yDisplacements.push(this.getRandom(6, 20));
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.start !== this.props.start && nextProps.start) {
      setTimeout(() => Animated.timing(this.state.dropAnimation, { toValue: 1, duration: 8000 }).start(
        event => Animated.timing(this.state.disappearAnimation, { toValue: 1, duration: 1000 }).start()
      ), 8000);
    }
  }

  getRandom = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  renderDrop = (ind, x, y, z) => (
    <Animated.View
      key={ind}
      style={{
        transform: [{
          translateY: this.state.dropAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [y, 0]
          }),
        }],
        opacity: this.state.disappearAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0]
        }),
      }}
    >
      <Sphere
        radius={0.1}
        widthSegments={6}
        heightSegments={6}
        style={{
          color: 'blue',
          transform: [{translate: [x, 0, z]}],
        }}
      />
    </Animated.View>
  );

  renderRain = () => {
    const rain = [];
    for (let i = 0; i < this.numberDrops; i++) {
      rain.push(this.renderDrop(i, this.xDisplacements[i], this.state.yDisplacements[i], this.zDisplacements[i]));
    }
    return rain;
  };

  render() {
    return (
      <View>
        {this.renderRain()}
      </View>
    );
  }
};
