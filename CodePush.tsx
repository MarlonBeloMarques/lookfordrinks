import React, { useEffect } from 'react';
import codePush from 'react-native-code-push';
import { CrashlyticsService } from '~/services';
import { useAlerts } from '~/utils';

const CodePush: React.FC = () => {
  const { showInfo } = useAlerts();
  const checkStatus = (status: any): void => {
    try {
      switch (status) {
        case codePush.SyncStatus.DOWNLOADING_PACKAGE: // 7
        case codePush.SyncStatus.INSTALLING_UPDATE: // 8
          showInfo('Downloading update');
          break;
        case codePush.SyncStatus.CHECKING_FOR_UPDATE: // 5
        case codePush.SyncStatus.UPDATE_IGNORED: // 2
        case codePush.SyncStatus.UNKNOWN_ERROR: // 3
        default:
          break;
      }
    } catch (error) {
      console.log('Error: ' + error);
      CrashlyticsService.recordError(error as Error);
    }
  };

  const syncCodeFromCodePush = () => {
    try {
      codePush.sync(
        {
          installMode: codePush.InstallMode.IMMEDIATE,
        }, // options
        (status) => checkStatus(status), // syncStatusChangedCallback
        ({ receivedBytes, totalBytes }) => {
          const percent = `${(receivedBytes / totalBytes) * 100}%`;
          console.log('LOG: : percent', percent);
        }, // downloadProgressCallback
        () => console.warn('Outdated app.'), // HandleBinaryVersionMismatchCallback
      );
    } catch (error) {
      console.log('Error: ' + error);
      CrashlyticsService.recordError(error as Error);
    }
  };
  useEffect(() => {
    syncCodeFromCodePush();
  }, []);

  return <></>;
};

export default CodePush;
