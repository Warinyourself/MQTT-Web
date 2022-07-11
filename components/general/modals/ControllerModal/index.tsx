import React, { useEffect, useMemo, useState } from 'react';

import { Box, Button, Grid } from '@mui/material'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

import * as yup from 'yup'
import { useFormik } from 'formik'
import { toast } from 'react-toastify';
import { fieldsType, FieldType } from '../../../../store/reducers/connection/types';
import WrapperController from '../../../controllers/WrapperController';
import FieldForm from '../../form/FieldForm';
import { InputType } from '../../form/FormParser';
import { generateButtonOptionsConfig, generateIconOptionsConfig, generateSliderOptionsConfig, generateTextOptionsConfig } from './configs';

// let schema = object({
//   isBig: boolean(),
//   count: number().when('isBig', {
//     is: true,
//     then: (schema) => schema.min(5),
//     otherwise: (schema) => schema.min(0),
//   }),
// });

// schema.describe({ value: { isBig: true } });
// oneOf([Yup.ref('password')], 'Passwords does not match'),

let validationSchema = yup.object({
  name: yup.string().required('Имя обязательно'),
  title: yup.string().required('Заголовок обязателен'),
  type: yup.mixed().oneOf(fieldsType).defined().required(),
  value: yup.string().required('Значение по умолчание обязательно'),
  width: yup.number().required().integer(),
  height: yup.number().required().integer(),
  options: yup.object({
    min: yup.number().required().integer(),
    max: yup.number().required().integer(),
  })
})

interface AddControllerModalProps {
  isOpen: boolean,
  close: () => void,
}

// TODO: handle deep object
export const buildYupObject = (items: InputType[]) => {
  return yup.object(items.reduce((acc, item) => {
    acc[item.name] = item.validation
    return acc
  }, {}))
}

const generateOptionsController = (items: InputType[], formik: any) => {
  const validationOptions = buildYupObject(items)
  validationSchema = validationOptions

  return <Box> {items.map((item, index) => {
    return FieldForm(item, formik)
    // return useMemo(() => FieldForm(item, formik), [formik.values[item.name]])
  })} </Box>
}

const buildControllerView = (field: FieldType) => {
  return <Box sx={{
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      background: (theme) => theme.palette.background.default,
      p: 3,
      borderRadius: 1,
      mb: 2,
    }}>
    <Box sx={{ width: `${(field.width || 1) * 50}px`, height: `${(field.height || 1) * 50}px`}}>
      <WrapperController {...field} sendRequest={false} />
    </Box>
  </Box>
}

const AddControllerModal: React.FunctionComponent<AddControllerModalProps> = ({ isOpen, close }) => {
  const title = 'Создать контроллер'

  // TODO: add image validation
  const [initialValues, setInitialValues] = useState({
    name: 'field1',
    type: 'slider',
    title: 'Заголовок',
    value: '10',
    width: 6,
    height: 2,
    options: {
      min: 0,
      max: 100,
      color: '#30E3CA',
      leftIcon: 'Brightness2',
    }
  })
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values: any) => {
      // build ID -> id: '1-slider',
      toast.success('Контроллер добавлен')
    },
  })

  const generateOptions = () => {
    const type = formik.values.type
    const changeValue = (v: any) => {
      console.log({ v })
      setInitialValues(v)
    }

    const mapConfigGenerator = {
      button: generateButtonOptionsConfig,
      slider: generateSliderOptionsConfig,
      icon: generateIconOptionsConfig,
      text: generateTextOptionsConfig
    }

    if (type in mapConfigGenerator) {
      return mapConfigGenerator[type](initialValues, changeValue)
    }

    return []
  }

  const generateForm = useMemo(() => {
    console.log('generateForm')
    const sliderOptionsFields: InputType[] = [
      {
        name: 'name',
        title: 'Название mqtt значения',
        validation: yup.string().required('Имя обязательно'),
        type: 'text',
      },
      {
        name: 'title',
        title: 'Заголовок',
        validation: yup.string().required('Заголовок обязателен'),
        type: 'text',
      },
      {
        name: 'type',
        title: 'Тип контроллера',
        validation: yup.mixed().oneOf(fieldsType).defined().required(),
        type: 'selector',
        items: fieldsType.map((type) => ({ value: type })),
      },
      {
        name: 'value',
        title: 'Значение по умолчанию',
        validation: yup.string().required('Значение по умолчание обязательно'),
        type: 'text',
      },
      {
        name: 'bound',
        children: [
          {
            name: 'width',
            title: 'Ширина',
            validation: yup.number().required().integer(),
            type: 'text',
            width: { xs: 6 },
          },
          {
            name: 'height',
            title: 'Высота',
            validation: yup.number().required().integer(),
            type: 'text',
            width: { xs: 6 },
          },
        ]
      },
      ...(generateOptions())
    ]

    return generateOptionsController(sliderOptionsFields, formik)
  }, [formik.values['name']])

  return (
    <Dialog open={isOpen} onClose={close} maxWidth='md' fullWidth={ true }>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>{ title }</DialogTitle>
        <DialogContent>
          { generateForm }

        { buildControllerView(formik.values as FieldType) }

          <Grid spacing={2} container justifyContent="flex-end" display="flex" sx={{mt: 2}}>
            <Button onClick={close} sx={{ mr: 2 }}>Отменить</Button>
            <Button type="submit" variant="contained">Создать</Button>
          </Grid>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default AddControllerModal
