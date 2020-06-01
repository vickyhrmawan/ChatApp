import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList
} from 'react-native';
import io from 'socket.io-client';

const socket = io.connect('http://192.168.0.25:3000');
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const App = () => {
  const [userName, setUserName] = useState('');
  const [chatMessage, setChatMessage] = useState('');
  const [displayMessage, setDisplayMessage] = useState([]);

  useEffect(() => {
    console.log('useEffect');

  }, [displayMessage]);
  const submitUserName = () => {
    // setUserName(userName);
    console.log(userName);
  };

  const submitChatMessage = () => {
    socket.emit('chat', {
      message: chatMessage,
      userName: userName,
    });
    setChatMessage('');
    socket.on('chat', data => {
      console.log('oh');
      setDisplayMessage([...displayMessage, data]);
    });
  };

  //chat display
  // const onDisplayMessage = displayMessage.map(data => (
  //   <View style={{ marginHorizontal: width / 30, marginVertical: 10 }}>
  //     <Text style={{ fontWeight: 'bold' }}>{data.userName}</Text>
  //     <View>
  //       <Text style={{ backgroundColor: 'skyblue', padding: 10, borderRadius: 10 }}>{data.message}</Text>
  //     </View>
  //   </View>
  // ));
  // console.log('ondisplay', displayMessage);

  const onDisplayMessage = ({ item }) => (
    <View style={{ marginHorizontal: width / 30, marginVertical: 10 }}>
      <Text style={{ fontWeight: 'bold' }}>{item.userName}</Text>
      <View>
        <Text style={{ backgroundColor: 'skyblue', padding: 10, borderRadius: 10 }}>{item.message}</Text>
      </View>
    </View>
  );
  console.log('ondisplay', displayMessage);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 0 }}>
        <TextInput
          style={{ height: 40, borderWidth: 2, borderColor: 'red' }}
          value={userName}
          onSubmitEditing={() => submitUserName()}
          onChangeText={userName => {
            setUserName(userName);
          }}
        />
      </View>
      <View style={{ flex: 1 }}>
        {/* {onDisplayMessage} */}
        <FlatList
          data={displayMessage}
          renderItem={onDisplayMessage}

        // ref="flatList"
        // ref={ref => this.flatList = ref}
        // onContentSizeChange={() => flatList.scrollToEnd({ animated: true })}
        // onLayout={() => flatList.scrollToEnd({ animated: true })}
        />
      </View>
      <View style={{ flex: 0, flexDirection: 'row', backgroundColor: 'red', minHeight: width / 50 }} >
        <View style={{ marginHorizontal: width / 20, marginVertical: width / 50, backgroundColor: 'white', borderRadius: 10 }}>
          <TextInput
            style={{ minHeight: width / 20, width: width / 1.3 }}
            value={chatMessage}
            onSubmitEditing={() => submitChatMessage()}
            onChangeText={chatMessage => {
              setChatMessage(chatMessage);
            }}
          />
        </View>
        <View style={{ marginVertical: width / 50, marginRight: width / 10, }}>
          <TouchableOpacity style={{ height: width / 10, width: width / 10, backgroundColor: 'yellow', borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}><Text>X</Text></TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
