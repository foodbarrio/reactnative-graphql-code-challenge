/**
 * Login screen
 */

import React, {useState, createRef} from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
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
      <View style={styles.input}>
        <Input
          ref={input}
          value={value}
          placeholder="Your name"
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
            name: "ios-arrow-dropright-circle",
            size: 15,
            color: "white",
            type: "ionicon"
          }}
          onPress={onButtonPress}
        />
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
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  disabledInput: {
    backgroundColor: Const.colors.lightGrey,
  },
  loginButton: {
    backgroundColor: Const.colors.primary,
  }
});

Login.propTypes = {
  navigation: PropTypes.shape({}),
}

export default Login;
