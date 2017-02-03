import React, { Component } from 'react';

import {
  Animated,
  Easing,
  StyleSheet,
  View,
} from 'react-native';

// One day in milliseconds
const FOREVER = 1000 * 60 * 60 * 24;

function subtract(a, b) {
  return Animated.add(a, Animated.multiply(b, new Animated.Value(-1)));
}

function flip(a) {
  return subtract(new Animated.Value(1), a);
}

export default class MyAnimation extends Component {
  constructor(props) {
    super(props);

    // Counts up in seconds
    this.timer = new Animated.Value(0);
    Animated.timing(this.timer, {
      toValue: FOREVER / 1000,
      duration: FOREVER,
      easing: Easing.linear,
    }).start();

    // Goes from 0 up to 1 every second
    this.sawtooth = Animated.modulo(this.timer, 1);

    // Is 0 for a second, then 1 for a second, then back
    this.ticktock = subtract(
      Animated.modulo(this.timer, 2),
      this.sawtooth);

    // Goes from 0 to 1 one second, 1 to 0 the next, repeats
    this.hills = Animated.add(
      Animated.multiply(this.sawtooth, flip(this.ticktock)),
      Animated.multiply(flip(this.sawtooth), this.ticktock)
    );

    // Goes from 0 to 1 back to 0, every second
    this.pendulum = Animated.multiply(
      Animated.multiply(
        this.sawtooth,
        Animated.add(
          new Animated.Value(1),
          Animated.multiply(
            new Animated.Value(-1),
            this.sawtooth
          ),
        )
      ),
      new Animated.Value(4)
    );

    this.left = Animated.multiply(this.hills, new Animated.Value(260));
    this.top = Animated.multiply(
      flip(this.pendulum),
      new Animated.Value(260));
  }

  render() {
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.widget, {
          left: this.left,
          top: this.top,
        }]} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#DDDDDD',
    height: 300,
    width: 300,
  },
  widget: {
    backgroundColor: '#B22E20',
    height: 40,
    width: 40,
    top: 10,
  },
});
