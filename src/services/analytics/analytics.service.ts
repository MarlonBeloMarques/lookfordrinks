import Firebase from '@react-native-firebase/app';
import '@react-native-firebase/analytics';
import { Env } from '~/utils';

const Analytics = Firebase.analytics();

if (Env.ENV === 'PROD') {
  Analytics.setAnalyticsCollectionEnabled(true);
} else {
  Analytics.setAnalyticsCollectionEnabled(false);
}

export default class AnalyticsService {
  static async logEvent(
    event: string,
    params?: Record<string, any>,
  ): Promise<void> {
    await Analytics.logEvent(event, params);
  }

  static async logScreen(
    screen_name: string,
    screen_class?: string,
  ): Promise<void> {
    await Analytics.logScreenView({ screen_name, screen_class });
  }

  static async logSearch(search_term: string): Promise<void> {
    await Analytics.logSearch({ search_term });
  }

  static async clear(): Promise<void> {
    await Analytics.resetAnalyticsData();
  }
}
