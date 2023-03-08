/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  Alert,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const _onPressButton = () => {
    Alert.alert('You tapped the button!');
  };

  const HomeScreen = ({navigation, route}) => {
    useEffect(() => {
      if (route.params?.post) {
        // Post updated, do something with `route.params.post`
        // For example, send the post to the server
        console.log('hey we got something: ', route.params?.post);
      }
    }, [route.params?.post]);

    return (
      <View style={{flex: 1, backgroundColor: 'red', justifyContent: 'center'}}>
        <Button
          title="Go to Jane's profile"
          onPress={() => navigation.navigate('Profile', {name: 'Jane'})}
        />
      </View>
    );
  };
  const ProfileScreen = ({navigation, route}) => {
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
            // navigation.navigate('Home', {
            //   params: {post: 'new data from profile screen'},
            //   merge: true,
            // });
          }}
        />
      </View>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
        <Stack.Screen name="Profile" component={ProfileScreen}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );

  // return (
  //   <NavigationContainer>
  //     <SafeAreaView style={backgroundStyle}>
  //       <StatusBar
  //         barStyle={isDarkMode ? 'light-content' : 'dark-content'}
  //         backgroundColor={backgroundStyle.backgroundColor}
  //       />
  //       <ScrollView
  //         contentInsetAdjustmentBehavior="automatic"
  //         style={backgroundStyle}>
  //         <Header />
  //         <TouchableNativeFeedback
  //           onPress={_onPressButton}
  //           style={{backgroundColor: 'red', marginHorizontal: 20}}>
  //           <View>
  //             <Text>test button</Text>
  //           </View>
  //         </TouchableNativeFeedback>
  //         <Button title={'test button'} />
  //         <View
  //           style={{
  //             backgroundColor: isDarkMode ? Colors.black : Colors.white,
  //           }}>
  //           <Section title="Step One">
  //             Edit <Text style={styles.highlight}>App.tsx</Text> to change this
  //             screen and then come back to see your edits.
  //           </Section>
  //           <Section title="See Your Changes">
  //             <ReloadInstructions />
  //           </Section>
  //           <Section title="Debug">
  //             <DebugInstructions />
  //           </Section>
  //           <Section title="Learn More">
  //             Read the docs to discover what to do next:
  //           </Section>
  //           <LearnMoreLinks />
  //         </View>
  //       </ScrollView>
  //     </SafeAreaView>
  //   </NavigationContainer>
  // );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
