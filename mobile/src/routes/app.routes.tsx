import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PlusCircle, SoccerBall } from 'phosphor-react-native';
import { useTheme } from 'native-base';

import { NewPoll } from '../screens/New';
import { Polls } from '../screens/Polls';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Platform } from 'react-native';
import { Find } from '../screens/Find';

const {Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  const {colors, sizes } = useTheme();

  const size = sizes[6];

  return(
    <Navigator
    screenOptions={{
        headerShown: false,
        tabBarLabelPosition: 'beside-icon',
        tabBarActiveTintColor: colors.yellow[500],
        tabBarInactiveTintColor: colors.gray[300],
        tabBarStyle: {
          position: 'absolute',
          height: sizes[24],
          borderTopWidth: 0,
          backgroundColor: colors.gray[900]
        },
        tabBarItemStyle: {
          position: 'relative',
          top: Platform.OS === 'android' ? -10 : 0

        }
    }}>
      <Screen 
        name="new"
        component={NewPoll}
        options={{
          tabBarIcon: ({ color }) => <PlusCircle color={color} size={size}/>,
          tabBarLabel: 'Novo Bolão'
        }}
      />
      <Screen 
        name="polls"
        component={Polls}
        options={{
          tabBarIcon: ({color}) => <SoccerBall color={color} size={size}/>,
          tabBarLabel: 'Meus Bolões'
        }}
      />
      
      <Screen 
        name="find"
        component={Find}
        options={{tabBarButton: () => null }}
      />
      
    </Navigator>
  );
}