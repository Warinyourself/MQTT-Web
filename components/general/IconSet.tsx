import React from 'react';
import { iconMap, IconNames } from '../../constant/icons';

const IconSet: React.FunctionComponent<{ name: IconNames }> = ({ name }) => {
  const Icon = iconMap[name];

  return (<Icon sx={{ fontSize: 'inherit' }} />)
};

export default IconSet;

