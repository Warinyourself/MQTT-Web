import * as yup from 'yup'
import { InputForm, InputType } from '../../form/FormParser';
import React from 'react';
import { iconMap, IconNames } from '../../../../constant/icons';
import { Box } from '@mui/material';

type BuilderSelectorOptions = Pick<InputForm, 'name' | 'title'> & Partial<InputType>

export const buildSelectorIconConfig = ({ name, title, ...options }: BuilderSelectorOptions): InputForm => {
  return {
    name,
    title,
    validation: yup.string(),
    type: 'selector',
    items: Object.keys(iconMap).map((icon) => ({ value: icon })),
    buildItemCallback: (value: string) => {
      const Icon = iconMap[value as IconNames];

      return <Box sx={{display: 'flex', alignItems: 'center'}}>
        <Icon sx={{mr: 1}}/> {value}
      </Box>
    },
    width: { xs: 3 },
    ...options
  }
}

export const buildColorConfig = ({ name, title, ...options }: BuilderSelectorOptions): InputForm => {
  return {
    name,
    title,
    validation: yup.string(),
    type: 'color',
    width: { xs: 3 },
    ...options
  }
}
