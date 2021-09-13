import Firebase from '@react-native-firebase/app';
import '@react-native-firebase/crashlytics';
import { Env } from '~/utils';

const Crashlytics = Firebase.crashlytics();

if (Env.ENV === 'PROD') {
  Crashlytics.setCrashlyticsCollectionEnabled(true);
} else {
  Crashlytics.setCrashlyticsCollectionEnabled(false);
}

export default class CrashlyticsService {
  static log(message: string): void {
    Crashlytics.log(message);
  }
  static recordError(error: Error): void {
    Crashlytics.recordError(error);
  }

  static async test(): Promise<void> {
    await Crashlytics.setCrashlyticsCollectionEnabled(true);
    Crashlytics.crash();
  }

  static async crash(): Promise<void> {
    await Crashlytics.setCrashlyticsCollectionEnabled(true);
    Crashlytics.crash();
  }
}
