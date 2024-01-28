export const serviceWorkerConfig = {
  /** Toaster component key */
  componentKey: 'swUpdateAvailable',

  /** Service Worker check for update interval in ms */
  checkForUpdateInterval: 5000,

  msgAvailableSummary: 'A new version of the website is available.',
  msgAvailableDetailWarn: 'Update is required.',
  msgAvailableDetailInfo: 'Please update.',
};
