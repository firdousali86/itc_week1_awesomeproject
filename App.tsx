/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {Text, useColorScheme, View, Button, Alert, LogBox} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SubCom from './SubCom';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const HomeScreen = ({navigation, route, greeting}) => {
    const [data, setData] = useState([]);

    useEffect(() => {
      if (route.params?.post) {
        // Post updated, do something with `route.params.post`
        // For example, send the post to the server
        console.log('hey we got something: ', route.params?.post);
      }
    }, [route.params?.post]);

    useEffect(() => {
      // LogBox.ignoreAllLogs();

      fetch('https://jsonplaceholder.typicode.com/todos')
        .then(x => x.json())
        .then(y => {
          console.log(y);
          if (y && y?.length > 0) {
            setData(y);
          }
        });
    }, []);

    console.log(greeting);

    return (
      <View style={{flex: 1, backgroundColor: 'red', justifyContent: 'center'}}>
        <Button
          title="Go to Jane's profile"
          onPress={() => navigation.navigate('Profile', {name: 'Jane'})}
        />
        <Button
          title="Go to Tab Sample"
          onPress={() => navigation.navigate('TabSample')}
        />

        <HOC>
          <Text>THIS IS MY HOC</Text>
          <Button
            title={'Goto Messages'}
            onPress={() => {
              navigation.navigate('TabSample', {
                screen: 'Messages',
                params: {user: 'jane'},
              });
            }}
          />
        </HOC>
        <SubCom data={data}></SubCom>
      </View>
    );
  };

  const HOC = ({children}) => {
    return <View style={{backgroundColor: 'yellow'}}>{children}</View>;
  };

  const ProfileScreen = ({navigation, route}) => {
    const [count, setCount] = React.useState(0);

    useEffect(() => {
      // Use `setOptions` to update the button that we previously specified
      // Now the button includes an `onPress` handler to update the count
      navigation.setOptions({
        headerRight: () => (
          <Button
            onPress={() => {
              console.log('ssdfsfs');
            }}
            title="Update count2"
          />
        ),
      });
    }, [navigation]);

    return (
      <View>
        <Text>This is {route.params?.name}'s profile</Text>
        <Button
          title="Go back"
          onPress={() => {
            navigation.navigate({
              name: 'Home',
              params: {post: 'new data from profile screen'},
              merge: true,
            });
          }}
        />
      </View>
    );
  };

  const TabSample = () => {
    const commonBoxStyle = {
      flexBasis: 70,
      height: 80,
    };

    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Feed"
          component={() => {
            return (
              <View
                style={{
                  backgroundColor: 'orange',
                  flex: 1,
                  flexDirection: 'row',
                  // flexWrap: 'wrap',
                  // alignContent: 'space-around',
                }}>
                <View
                  style={[commonBoxStyle, {backgroundColor: 'blue'}]}></View>
                <View style={[commonBoxStyle, {backgroundColor: 'red'}]}></View>
                <View
                  style={[commonBoxStyle, {backgroundColor: 'pink'}]}></View>
                <View
                  style={[commonBoxStyle, {backgroundColor: 'black'}]}></View>
                <View
                  style={[commonBoxStyle, {backgroundColor: 'white'}]}></View>
                <View
                  style={[commonBoxStyle, {backgroundColor: 'cyan'}]}></View>
                <View
                  style={[commonBoxStyle, {backgroundColor: 'brown'}]}></View>
              </View>
            );
          }}
        />
        <Tab.Screen name="Messages" component={() => {}} />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={{
            title: 'My home',
            headerRight: () => (
              <Button
                onPress={() => alert('This is a button!')}
                title="Info"
                // color="#fff"
              />
            ),
          }}>
          {props => (
            <HomeScreen
              {...props}
              greeting={'Hello'}
              extraData={{abc: 'def'}}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={({navigation, route}) => ({
            // Add a placeholder button without the `onPress` to avoid flicker
            // headerRight: () => <Button title="Update count" />,
          })}></Stack.Screen>
        <Stack.Screen name="TabSample" component={TabSample}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
