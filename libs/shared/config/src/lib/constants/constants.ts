export const DEHUB_DECIMALS = 5;
export const BNB_DECIMALS = 18;
export const BUSD_DECIMALS = 18;

export const BUSD_DISPLAY_DECIMALS = 2;
export const DEHUB_DISPLAY_DECIMALS = 2;

/** Service Worker Config */
export const SwUpdateConfig = {
  /** Toaster component key */
  componentKey: 'swUpdateAvailable',

  /** Service Worker check for update interval in ms */
  checkForUpdateInterval: 5000,

  msgAvailableSummary: 'A new version of the website is available.',
  msgAvailableDetailWarn: 'Update is required.',
  msgAvailableDetailInfo: 'Please update.',
};
