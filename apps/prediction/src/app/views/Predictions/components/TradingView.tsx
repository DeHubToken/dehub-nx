import React, { useEffect } from 'react';
import { Box } from '@dehub/react/pcsuikit';
import { DefaultTheme, useTheme } from 'styled-components';
import { useTranslation } from '../../../contexts/Localization';

declare global {
  interface Window {
    TradingView: any; // eslint-disable-line
  }
}

/**
 * When the script tag is injected the TradingView object is not immediately
 * available on the window. So we listen for when it gets set
 */
const tradingViewListener = async () =>
  new Promise<void>(resolve =>
    Object.defineProperty(window, 'TradingView', {
      configurable: true,
      set(value) {
        this.tv = value;
        resolve(value);
      },
    })
  );

const initializeTradingView = (
  TradingViewObj: any, // eslint-disable-line
  theme: DefaultTheme,
  localeCode: string
) => {
  new TradingViewObj.widget({
    autosize: true,
    height: '100%',
    symbol: 'BINANCE:BNBUSDT',
    interval: '5',
    timezone: 'Etc/UTC',
    theme: 'dark',
    style: '1',
    locale: localeCode,
    toolbar_bg: '#f1f3f6',
    enable_publishing: false,
    allow_symbol_change: true,
    container_id: 'tradingview_b239c',
  });
};

const TradingView = () => {
  const { currentLanguage } = useTranslation();
  const theme = useTheme();

  useEffect(() => {
    if (window.TradingView) {
      initializeTradingView(window.TradingView, theme, currentLanguage.code);
    } else {
      tradingViewListener().then(tv => {
        initializeTradingView(tv, theme, currentLanguage.code);
      });
    }
  }, [theme, currentLanguage]);

  return (
    <Box overflow="hidden" className="tradingview_container">
      <div id="tradingview_b239c" />
    </Box>
  );
};

export default TradingView;
