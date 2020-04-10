import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';

import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { Text } from 'react-native';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/SignIn';
import SignUp from './pages/SignUp';
import NavigationService from './services/navigation/NavigationService';

import DeliveryConfirm from '~/pages/DeliveryConfirm';
import ProblemDetails from '~/pages/ProblemDetails';
import Problem from '~/pages/Problem';
import DeliveryDetails from '~/pages/DeliveryDetails';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const tabBarIcon = (props, name) => {
  return <Icon name={name} size={24} color={props.color} />;
};

const tabBarLabel = (props, label) => {
  return <Text style={{ fontSize: 14, color: props.color }}>{label}</Text>;
};

const defaultStackNavigatorOptions = (navigation) => {
  return {
    headerShown: true,
    headerTransparent: true,
    headerTintColor: '#fff',
    headerLeftContainerStyle: {
      marginLeft: 20,
    },
    headerTitleStyle: {
      fontWeight: 'bold',
      color: '#FFFFFF',
    },
    headerLeft: (props) => <HeaderLeft navigation={navigation} {...props} />,
  };
};

const HeaderLeft = ({ navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Icon name="chevron-left" size={24} color="#fff" />
    </TouchableOpacity>
  );
};

const DeliveryStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Delivery"
      screenOptions={({ navigation }) =>
        defaultStackNavigatorOptions(navigation)
      }>
      <Stack.Screen
        name="Delivery"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DeliveryDetails"
        component={DeliveryDetails}
        options={{
          title: 'Detalhes da encomenda',
        }}
      />
      <Stack.Screen
        name="Problem"
        component={Problem}
        options={{
          title: 'Informar problema',
        }}
      />
      <Stack.Screen
        name="ProblemDetails"
        component={ProblemDetails}
        options={{
          title: 'Visualizar problemas',
        }}
      />
      <Stack.Screen
        name="Confirm"
        component={DeliveryConfirm}
        options={{
          title: 'Confirmar entrega',
        }}
      />
    </Stack.Navigator>
  );
};

export default function Routes() {
  const signed = useSelector((state) => state.auth.signed);

  return (
    <NavigationContainer
      ref={(navigatorRef) => NavigationService.setNavigator(navigatorRef)}>
      {signed ? (
        <Tab.Navigator
          initialRouteName="Home"
          tabBarOptions={{
            keyboardHidesTabBar: true,
            activeTintColor: '#7D40E7',
            inactiveTintColor: '#999999',
            style: {
              backgroundColor: '#fff',
              elevation: 1,
              borderTopWidth: 1,
              top: 1,
              shadowOffset: {
                width: 0,
                height: -2,
              },
              shadowOpacity: 0.1,
              shadowRadius: 6,
            },
          }}>
          <Tab.Screen
            name="Home"
            component={DeliveryStack}
            options={{
              tabBarLabel: (props) => tabBarLabel(props, 'Entregas'),
              tabBarIcon: (props) => tabBarIcon(props, 'reorder'),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
              tabBarLabel: (props) => tabBarLabel(props, 'Meu Perfil'),
              tabBarIcon: (props) => tabBarIcon(props, 'account-circle'),
            }}
          />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

tabBarIcon.propTypes = {
  color: PropTypes.string,
};

HeaderLeft.propTypes = {
  navigation: PropTypes.object,
};
