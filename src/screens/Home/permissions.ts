import {
  Alert,
  Linking,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { AnalyticsService } from '~/services';

const hasPermissionIOS = async () => {
  const openSetting = () => {
    try {
      Linking.openSettings();
    } catch (error) {
      Alert.alert('Unable to open settings');
    }
  };

  const status = await Geolocation.requestAuthorization('whenInUse');

  if (status === 'granted') {
    AnalyticsService.logEvent('permission:location', ['granted']);
    return true;
  }

  if (status === 'denied') {
    AnalyticsService.logEvent('permission:location', ['denied']);
    Alert.alert('Location permission denied');
  }

  if (status === 'disabled') {
    Alert.alert(
      'Turn on Location Services to allow to determine your location.',
      '',
      [
        { text: 'Go to Settings', onPress: openSetting },
        { text: "Don't Use Location", onPress: () => {} },
      ],
    );
  }

  return false;
};

const hasPermissionAndroid = async () => {
  const hasPermission = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (status === PermissionsAndroid.RESULTS.GRANTED) {
    return true;
  }

  if (status === PermissionsAndroid.RESULTS.DENIED) {
    ToastAndroid.show('Location permission denied by user.', ToastAndroid.LONG);
  } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
    ToastAndroid.show(
      'Location permission revoked by user.',
      ToastAndroid.LONG,
    );
  }

  return false;
};

export const hasLocationPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'ios') {
    const hasPermission = await hasPermissionIOS();
    return hasPermission;
  }

  if (Platform.OS === 'android') {
    const hasPermission = await hasPermissionAndroid();
    return hasPermission;
  }

  return false;
};
