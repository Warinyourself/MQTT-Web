import * as yup from 'yup'
import { deepmerge } from '@mui/utils';
import { InputType } from '../../form/FormParser';
import { buildColorConfig, buildSelectorIconConfig } from './build';

export const generateSliderOptionsConfig = <T = any>(initialValues: T, change: (value: T) => void): InputType[] => {
  initialValues = deepmerge(initialValues, {
    type: 'slider',
    value: '10',
    width: 6,
    height: 2
  })
  // initialValues.type = 'slider'
  // initialValues.value = '10'
  // initialValues.width = 6
  // initialValues.height = 2

  initialValues.options = {
    min: 0,
    max: 100,
    color: '#30E3CA',
    leftIcon: 'Brightness2',
    rightIcon: 'BrightnessHigh'
  }
  change(initialValues)

  return [
    {
      name: 'options',
      children: [
        {
          name: 'options.min',
          title: 'Минимум',
          validation: yup.number().required().integer(),
          type: 'text',
          fieldOptions: { type: 'number' },
          width: { xs: 3 }
        },
        {
          name: 'options.max',
          title: 'Максимум',
          validation: yup.number().required().integer(),
          type: 'text',
          fieldOptions: { type: 'number' },
          width: { xs: 3 }
        },
        buildSelectorIconConfig({name: 'options.leftIcon', title: 'Иконка слева'}),
        buildSelectorIconConfig({name: 'options.rightIcon', title: 'Иконка справа'}),
        buildColorConfig({ name: 'options.color', title: 'Цвет', width: { xs: 6 } }),
      ]
    }
  ]
}

export const generateButtonOptionsConfig = <T = any>(initialValues: T, change: (value: T) => void): InputType[] => {
  initialValues = deepmerge(initialValues, {
    type: 'button',
    value: '#FF2E63',
    width: 5,
    height: 1,
  })
  // initialValues.type = 'button';
  // initialValues.value = '#FF2E63';
  // initialValues.width = 5;
  // initialValues.height = 1;

  initialValues.options = {
    leftIcon: 'BlurOn',
    color: '#FF2E63',
    title: 'Get properties',
    variant: 'outlined',
    rightIcon: 'AutoFixHigh'
  }
  change(initialValues)

  return [
    {
      name: 'options',
      children: [
        {
          name: 'options.title',
          title: 'Текст кнопки',
          validation: yup.string().required(),
          type: 'text',
          value: 'Get properties',
          width: { xs: 6 }
        },
        buildSelectorIconConfig({name: 'options.leftIcon', title: 'Иконка слева', fieldOptions: { defaultValue: 'BlurOn' }}),
        buildSelectorIconConfig({ name: 'options.rightIcon', title: 'Иконка справа', fieldOptions: { defaultValue: 'AutoFixHigh' }}),
        buildColorConfig({
          name: 'options.color',
          title: 'Цвет',
          width: { xs: 6 },
        }),
        {
          name: 'options.variant',
          title: 'Тип кнопки',
          validation: yup.string(),
          type: 'selector',
          items: ['text', 'outlined', 'contained'].map((type) => ({ value: type })),
          width: { xs: 6 },
          fieldOptions: { defaultValue: 'outlined' }
        }
      ]
    }
  ]
}

export const generateIconOptionsConfig = <T = any>(initialValues: T, change: (value: T) => void): InputType[] => {
  initialValues = deepmerge(initialValues, {
    type: 'icon',
    value: '#08D9D6',
    width: 2,
    height: 2,
  })
  // initialValues.type = 'icon';
  // initialValues.value = '#08D9D6';
  // initialValues.width = 2;
  // initialValues.height = 2;

  initialValues.options = {
    icon: 'BlurOn',
    color: '#08D9D6'
  }
  change(initialValues)

  return [
    {
      name: 'options',
      children: [
        buildSelectorIconConfig({
          name: 'options.icon',
          title: 'Иконка',
          width: { xs: 6 },
          fieldOptions: { defaultValue: 'BlurOn' }
        }),
        buildColorConfig({ name: 'options.color', title: 'Цвет кнопки', width: { xs: 6 } }),
      ]
    }
  ]
}

export const generateTextOptionsConfig = <T = any>(initialValues: T, change: (value: T) => void): InputType[] => {
  initialValues = deepmerge(initialValues, {
    type: 'text',
    value: '400',
    width: 3,
    height: 2,
  })

  initialValues.options = {
    rightIcon: 'Bolt',
    leftIcon: 'HeatPump',
    color: '#30E3CA'
  }
  change(initialValues)

  return [
    {
      name: 'options',
      children: [
        buildSelectorIconConfig({name: 'options.leftIcon', title: 'Иконка слева', fieldOptions: { defaultValue: 'HeatPump' }}),
        buildSelectorIconConfig({name: 'options.rightIcon', title: 'Иконка справа', fieldOptions: { defaultValue: 'Bolt' }}),
        buildColorConfig({ name: 'options.color', title: 'Цвет', width: { xs: 6 } }),
      ]
    }
  ]
}
