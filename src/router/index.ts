import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { List, Card } from '../screens';

const Router = createStackNavigator(
    {
      List: {
        screen: List,
        navigationOptions: {
          title:'Home'
        }
      },
      Card: {
        screen: Card,
      },
    },
    {
      headerMode: 'none',
      initialRouteName: 'List',
    }
  );
  

const App = createAppContainer(Router);
export default App;