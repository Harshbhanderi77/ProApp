import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  CommonActions,
  createNavigationContainerRef,
  NavigationContainer,
  StackActions,
} from '@react-navigation/native';
import { Category, HomeScreen } from "../screen/HomeScreen.tsx";
import {ProductScreen} from '../screen/ProductScreen .tsx';
import {LoginScreen} from '../screen/LoginScreen.tsx';
import {Splashscreen} from '../screen/SplashScreen.tsx';
import {CategoryScreen} from '../screen/CategoryScreen.tsx';

export type StackParamsList = {
  Splashscreen: undefined;
  LoginScreen: undefined;
  HomeScreen: undefined;
  CategoryScreen: {
    item: Category;
  };
  ProductScreen: {
    categoryId: string;
    categoryName: string;
  };
};

const navigationRef = createNavigationContainerRef<StackParamsList>();

const RootStack = createStackNavigator();

export enum Routes {
  Splash = 'Splashscreen',
  Home = 'HomeScreen',
  Login = 'LoginScreen',
  Category = 'CategoryScreen',
  Product = 'ProductScreen',
}

interface NavigationProps {
  screenName: Routes;
  params?: any;
}

export function navigate({screenName, params}: NavigationProps) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(screenName, params);
  }
}

export function replace({screenName, params}: NavigationProps) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch({
      ...StackActions.replace(screenName, params),
    });
  }
}

export function reset({screenName, params}: NavigationProps) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: screenName, params}],
      }),
    );
  }
}

export function goBack() {
  if (navigationRef.isReady()) {
    if (navigationRef.canGoBack()) {
      navigationRef.goBack();
    }
  }
}

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={Routes.Splash}>
        <RootStack.Screen name="Splashscreen" component={Splashscreen} />
        <RootStack.Screen name="LoginScreen" component={LoginScreen} />
        <RootStack.Screen name="HomeScreen" component={HomeScreen} />
        <RootStack.Screen name={Routes.Category} component={CategoryScreen} />
        <RootStack.Screen name="ProductScreen" component={ProductScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});
