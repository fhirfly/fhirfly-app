import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';

const wp = (number) => widthPercentageToDP(number);

const hp = (number) => heightPercentageToDP(number);

export { wp, hp };
