/**
 * Login screen
 */

import React, {useState, createRef} from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../gql/mutations';
import Const from '../const';


const Login = ({navigation}) => {
  const input = createRef();
  const [value, setValue] = useState('John Doe');

  const [login, { loading, error }] = useMutation(LOGIN_USER, {
    onCompleted: ({ login: user }) => {
      navigation.navigate('Posts', { user });
    }
  });

  // Blur input field on button press and execute mutation
  const onButtonPress = () => {
    input.current.blur();
    login({ variables: { name: value } });
  }

  if (error) {
    return <Error />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>
        Foodbarrio
        {'\n'}
        Test App 
      </Text>
      <View style={styles.bgHeader}>
      </View>
      <View style={styles.input}>
        <Input
          ref={input}
          value={value}
          placeholder="Your login name"
          errorStyle={{ color: Const.colors.red }}
          errorMessage={ value === '' ? "Name cannot be empty" : undefined }
          onChangeText={(value) => setValue(value.trim())}
          leftIcon={
            <Icon
              name='ios-person'
              size={24}
              color={Const.colors.grey}
              type="ionicon"
            />
          }
        />
        <Button
          disabled={!value || loading}
          disabledStyle={styles.disabledInput}
          buttonStyle={styles.loginButton}
          icon={{
            name: 'ios-arrow-dropright-circle',
            size: 15,
            color: "white",
            type: "ionicon"
          }}
          onPress={onButtonPress}
        />
      </View>
      <View style={styles.bgFooter}>
        <Text style={styles.footerText}>
          Made by apgsn @ github.com
        </Text>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    margin: 50,
    marginTop: 150,
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  disabledInput: {
    backgroundColor: Const.colors.lightGrey,
  },
  loginButton: {
    backgroundColor: Const.colors.primary,
  },
  titleText: {
    position: 'absolute',
    top: 150,
    color: Const.colors.primaryLight,
    fontSize: 36,
    zIndex: 2,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footerText: {
    color: Const.colors.primaryLight,
    fontSize: 16,
  },
  bgHeader: {
    position: 'absolute',
    width: '200%',
    height: 1000,
    backgroundColor: Const.colors.primary,
    transform: [{ rotate: "-12deg" }],
    top: -700,
  },
  bgFooter: {
    position: 'absolute',
    width: '100%',
    height: 130,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Const.colors.primary,
    bottom: 0,
  }
});

Login.propTypes = {
  navigation: PropTypes.shape({}),
}

export default Login;
