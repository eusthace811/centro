import React, { PropTypes, Component } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, FlatList, Image } from 'react-native';
import { GiftedChat, Actions, Bubble } from 'react-native-gifted-chat';
import _ from 'lodash';

const CentroPage = ({ isTyping, messages, onMessage }) => {

  const renderFooter = () => {
    if (isTyping) {
      return (
        <View style={{marginTop: 5, marginLeft: 10, marginRight: 10, marginBottom: 10}}>
          <Text style={{fontSize: 14, color: '#909090'}}>Centro is typing</Text>
        </View>
      );
    }
    return null;
  }
  
  return(
    <View style={{ flex: 1, marginTop: 30 }}>
      <View style={{ backgroundColor: '#fff', paddingLeft: 20 }}>
        <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#808080' }}>Hi, I'm Centro!</Text>
      </View>
      <GiftedChat
        messages={messages}
        onSend={(message) => onMessage(message)}
        user={{
          _id: 1,
        }}
        renderFooter={renderFooter}
      />
    </View>
  )
};

export default CentroPage;
