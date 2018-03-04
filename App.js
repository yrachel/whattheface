'use strict';
import React, { Component } from 'react';
import {  Platform, StyleSheet, Text,  View, Button,TouchableOpacity, Dimensions,  AppRegistry, Image  } from 'react-native';
import { RNCamera } from 'react-native-camera';
import RNFetchBlob from 'react-native-fetch-blob'
const xhr = new XMLHttpRequest();

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
      super(props);
      this.state = {
        picData: '',
        uris: ''
      };
      this.takePicture = this.takePicture.bind(this);
  }
  onPressLearnMore = () =>{
  this.setState({
    uris: '',
    picData: ''
  })

  }

  render() {
    if(this.state.uris === ''){
    return (
      <View style={styles.container}>
          <RNCamera
              ref={input => {
                this.camera = input;
              }}
              style = {styles.preview}
              type={RNCamera.Constants.Type.back}
              permissionDialogTitle={'Permission to use camera'}
              permissionDialogMessage={'We need your permission to use your camera phone'}
          />
          <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>
          <TouchableOpacity
              onPress={this.takePicture.bind(this)}
              style = {styles.capture}>
              <Text style={{fontSize: 14}}> SNAP </Text>
          </TouchableOpacity>
          </View>
        </View>
    );
  }
  else if(this.state.uris === 'hi'){
    return(
      <View>
        {this.renderImage()}
        <Button
         onPress = {this.onPressLearnMore}
  title="Press to retake picture"
  color= "blue"
  accessibilityLabel="Press to Reset"
  />
  <Button
   onPress = {this.storePicture}
title="Press to Upload to Python"
color= "red"

/>

      </View>
    )
  }
  }
  takePicture = async function() {
      if (this.camera) {
        const options = { quality: .5, base64: true, width: .1 };
        const data = await this.camera.takePictureAsync(options)
        this.setState({
          picData:  data,
          uris: 'hi'
        })
        console.log(data);
      }
    };

  renderImage =() => {
      return (
        <Image
            style={{width: 400, height: 400}}
            source={{uri: this.state.picData.uri}}
          />

  )
  }
  storePicture = async () => {



    var url = 'http://192.168.1.40:5000/image'
        return fetch(url,
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
                  'pictureData':{
                    'pictureData': `data:image/jpeg;base64,${this.state.picData.uri}`
                  }
                })

        })
         .then((responseData) =>{

           console.log(responseData)
            console.log(JSON.stringify(responseData.data))

         })
         .catch(err => {
           console.log(err);
         })


    //   if (this.state.picData.uri) {
    //     var url = "192.168.1.40:5000"
    //     console.log("sent")
    //     fetch(url,
    //     {
    //       method: 'POST',
    //       headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify({
    //         'equipment_image':{
    //           'image_encoded': `data:image/jpeg;base64,${this.state.picData.uri}`
    //         }
    //       })
    //     })
    //      .then((responseData) => {
    //          console.log(responseData);
    //      })
    //      .catch(err => {
    //        console.log(err);
    //      })
    // }
  }
}//end of main


const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: '#F5FCFF',
  // },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  }
});
