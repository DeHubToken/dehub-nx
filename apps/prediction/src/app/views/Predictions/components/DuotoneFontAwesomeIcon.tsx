import React from 'react';
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';

interface DuotoneFontAwesomeIconProps extends FontAwesomeIconProps {
  primaryColor?: string;
  primaryOpacity?: string;
  secondaryColor?: string;
  secondaryOpacity?: string;
  style?: React.CSSProperties & TFontAwesomeProperties;
}

type TFontAwesomeProperties = {
  '--fa-primary-color'?: string;
  '--fa-primary-opacity'?: string;
  '--fa-secondary-color'?: string;
  '--fa-secondary-opacity'?: string;
};

const DuotoneFontAwesomeIcon: React.FC<DuotoneFontAwesomeIconProps> = ({
  primaryColor,
  primaryOpacity,
  secondaryColor,
  secondaryOpacity,
  style = {},
  ...props
}) => {
  style['--fa-primary-color'] = primaryColor;
  style['--fa-secondary-color'] = secondaryColor;
  style['--fa-primary-opacity'] = primaryOpacity;
  style['--fa-secondary-opacity'] = secondaryOpacity;

  return <FontAwesomeIcon {...props} style={style} />;
};

export default DuotoneFontAwesomeIcon;
