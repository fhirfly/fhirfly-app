import React, { Component } from "react";
import AppLoading from "expo-app-loading";
import { Container } from "native-base";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { Provider } from "react-redux";
import configureStore from "./src/redux/index";
import "react-native-url-polyfill/auto";
import AppNavigator from "./src/navigation/AppNavigator";

const store = configureStore();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <Provider store={store}>
        <Container>
          <AppNavigator />
        </Container>
      </Provider>
    );
  }
}

export default App;