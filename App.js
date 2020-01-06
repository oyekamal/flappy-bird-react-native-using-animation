import React, { Component } from 'react';
import {
  Animated,
  TouchableWithoutFeedback,
  Text,
  View,
  StyleSheet,
  Button,
  Dimensions,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
let s_width = Dimensions.get('screen').width;
let s_height = Dimensions.get('screen').height;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.w_p = 70;
    this.h_p = 300;
    this.starting = [s_width / 4, s_height / 2];
    this.poolStarting = [s_width - this.w_p, s_height - this.h_p];
    this.moveAnimation = new Animated.ValueXY({
      x: this.starting[0],
      y: this.starting[1],
    });
    this.movePool = new Animated.ValueXY({
      x: this.poolStarting[0],
      y: this.poolStarting[1],
    });
    console.log('start')
  }

  _moveBall = () => {
    this.starting[1] = this.starting[1] - 40;
    this.counter = this.starting[1];
    Animated.timing(this.moveAnimation, {
      toValue: { x: this.starting[0], y: this.starting[1] },
      duration: 50,
    }).start();
  };

  componentDidMount() {
    this._moveBallDown();
    //this._poolMove();
  }
  // _poolMove = () => {
  //   console.log(s_height - this.h_p)
  //   this.movePool.setValue({ x: s_width - this.w_p, y: s_height - this.h_p });
  //   Animated.timing(this.movePool, {
  //     toValue: { x: 0, y: s_height - this.h_p },
  //     duration: 2000,
  //   }).start();
  // };
  _moveBallDown = () => {
    if (this.starting[0] == -this.poolStarting[0] && this.poolStarting[1] <= this.starting[1]) {
      alert('BX: ' + this.starting[0] + ' PX: ' + -this.poolStarting[0] + '\n BY: ' + this.poolStarting[1] + '<= PY: ' + this.starting[1])
    }
    else if (this.starting[1] >= 640 || this.starting[1] <= 0) {
      alert('game over ' + this.starting[1]);
    }
    else {
      this.starting[1] = this.starting[1] + 10;
      this.poolStarting[0] = this.poolStarting[0] - 20;
      this.counter = this.starting[1];
      //console.log(this.starting[1]);
      //for touch the bird and the pool xbird=90 and xpool=-90
      //pool stop at -330
      //console.log("bird movement X :" + this.starting[0])
      //pool is at 340 if the bird equall to 340 and less and x axis are equal as 90 == -90 game over because both are collied with on another
      //console.log("bird movement y :" + this.starting[1])

      console.log("pool movement X :" + this.poolStarting[0])
      //console.log("pool movement y :" + this.poolStarting[1])
      console.log('------------')
      if (this.poolStarting[0] == -130) {
        this.poolStarting[0] = s_width - this.w_p;
        this.poolStarting[1] = s_height - this.h_p;
        this.movePool.setValue({ x: this.poolStarting[0], y: this.poolStarting[1] });
        this.h_p = Math.floor(Math.random() * (500 - 200 + 1) + 200);
        // Animated.timing(this.movePool, {
        //   toValue: { x: this.poolStarting[0], y: this.poolStarting[1] },
        //   duration: 10,
        // }).start();
      }
      else {
        Animated.timing(this.movePool, {
          toValue: { x: this.poolStarting[0], y: this.poolStarting[1] },
          duration: 10,
        }).start();

      }



      Animated.timing(this.moveAnimation, {
        toValue: { x: this.starting[0], y: this.starting[1] },
        duration: 90,
      }).start(() => this._moveBallDown());

      // Animated.timing(this.movePool, {
      //   toValue: { x: 0, y: s_height - this.h_p },
      //   duration: 400,
      // }).start();


    }
  };

  render() {
    return (
      <ImageBackground style={styles.container} source={require('../flappy_bird/images/background.jpg')}>
        {/* <Image style={{ width: s_width, height: s_height }} source={require('../flappy_bird/images/background-scene.png')} /> */}
        <TouchableOpacity activeOpacity={1}
          style={{ width: s_width, height: s_height }} onPress={this._moveBall}>
          <Animated.View style={[styles.tennisBall, this.moveAnimation.getLayout()]}>

            {/* <TouchableWithoutFeedback
              style={styles.button}
              onPress={this._moveBall}>

              <Text style={styles.buttonText}>Bird</Text>
            </TouchableWithoutFeedback> */}

            <TouchableOpacity>
              <Image style={{ width: 50, height: 50 }} source={require('../flappy_bird/images/bird.png')}></Image>
            </TouchableOpacity>
          </Animated.View>


          <Animated.View style={this.movePool.getLayout()}>
            {/* <View style={{ width: this.w_p, height: this.h_p, backgroundColor: 'blue' }} /> */}
            <Image style={{ width: this.w_p, height: this.h_p }} source={require('../flappy_bird/images/pipe.png')} />
          </Animated.View>
          {/* <Button title="jump" onPress={this._moveBall} />
        <Text>{this.counter}</Text>
        <Text>{this.starting[1]}</Text> */}
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    //backgroundColor: 'red',
  },
  tennisBall: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    //  backgroundColor: 'greenyellow',
    borderRadius: 25,
    width: 50,
    height: 50,
  },
  button: {
    paddingTop: 24,
    paddingBottom: 24,
  },
  buttonText: {
    fontSize: 10,
    color: '#333',
  },
});
