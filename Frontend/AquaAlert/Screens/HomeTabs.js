import React,{useRef,useEffect} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from './HomePage'; // Ensure this is the correct path
import Wallet from './Stock';
import Transaction_History from './Transaction_History'
import Account from './Account';
import { Image, StyleSheet,Animated } from 'react-native';
const Tab = createBottomTabNavigator();
const AnimatedIcon = ({ source, focused }) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(scaleValue, {
      toValue: focused ? 1.2 : 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  }, [focused]);

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
      <Image
        resizeMode="cover"
        source={source}
        style={styles.icon}
      />
    </Animated.View>
  );
};

const HomeTabs = () => {
  return (
    <Tab.Navigator initialRouteName='Home'>
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{

          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <AnimatedIcon
              // resizeMode='cover'
              source={require('../Image_Used/home.png')}
              focused={focused}
            //
            style={[
              styles.icon,
              {tintColor:focused?'red':'#8e8e93'}
            ]}
            />
          )
        }}
      />
      <Tab.Screen
        name="Transaction History"
        component={Transaction_History}
        options={{

          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <AnimatedIcon
              // resizeMode='cover'
              source={require('../Image_Used/transaction_history.png')}
              focused={focused}
            //
            style={[
              styles.icon,
              {tintColor:focused?'red':'#8e8e93'},
              styles.stock
            ]}
            />
          )
        }}
      />
        <Tab.Screen
        name="Stock"
        component={Wallet}
        options={{

          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <AnimatedIcon
              // resizeMode='cover'
              source={require('../Image_Used/stock.png')}
              focused={focused}
            //
            style={[
              styles.icon,
              {tintColor:focused?'red':'#8e8e93'},
              styles.stock
            ]}
            />
          )
        }}
      />
      <Tab.Screen
        name="Account Information"
        component={Account}
        options={{

          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <AnimatedIcon
              // resizeMode='cover'
              source={require('../Image_Used/account_information.png')}
              focused={focused}
            //
            style={[
              styles.icon,
              {tintColor:focused?'red':'#8e8e93'},
              styles.stock
            ]}
            />
          )
        }}
      />

    </Tab.Navigator>
  );
};
export default HomeTabs;
const styles = StyleSheet.create({
  icon: {
    width:32,
    height:32,

  },
});