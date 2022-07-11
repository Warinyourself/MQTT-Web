import React, { useRef, useState } from 'react';

import { Box, Button, Grid, IconButton, styled } from '@mui/material'
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

import * as yup from 'yup'
import { useFormik } from 'formik'
import { toast } from 'react-toastify';

const numberPositiveValidation = (field: string) => yup.number().required().positive(`${field} must be positive`).integer()
const numberValidation = (field: string) => yup.number().required().integer()

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  description: yup.string().required(),
  cost: numberPositiveValidation('Cost'),
  property: yup.object({
    proteins: numberValidation('Proteins'),
    fats: numberValidation('Fats'),
    carbohydrates: numberValidation('Carbohydrates'),
    calories: numberValidation('Calories')
  })
})

interface CreateProductModalProps {
  isOpen: boolean,
  open: () => void,
  close: () => void,
}

const defaultInitialValue = {
  name: '',
  description: '',
  cost: 0,
  image: '',
  property: {
    proteins: 0,
    fats: 0,
    carbohydrates: 0,
    calories: 0
  }
}

// TODO: add loading state on submit button
const CreateProductModal = ({ isOpen, close }: CreateProductModalProps) => {
  const title = 'Создать продукт'

  // TODO: add image validation
  const formik = useFormik({
    initialValues: defaultInitialValue,
    // initialValues: deepmerge(defaultInitialValue, product),
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      try {
        toast(`Продукт успешно добавлен`)
      } catch (error) {
        toast('Не получилось добавить продукт', { type: 'error' })
      }
    },
  })

  return (
    <Dialog open={isOpen} onClose={close} maxWidth='md' fullWidth={ true }>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>{ title }</DialogTitle>
        <DialogContent>
          <TextField
            id="name"
            label="Название продукта"
            autoFocus
            margin="dense"
            fullWidth
            required
            value={ formik.values.name }
            sx={{ mb: 3 }}
            variant="outlined"
            onChange={ formik.handleChange }
            error={ formik.touched.name && Boolean(formik.errors.name) }
            helperText={ formik.touched.name && formik.errors.name }
            onBlur={ formik.handleBlur }
          />
          <TextField
            id="cost"
            value={ formik.values.cost }
            label="Цена продукта"
            onChange={ formik.handleChange }
            error={ formik.touched.cost && Boolean(formik.errors.cost) }
            helperText={ formik.touched.cost && formik.errors.cost }
            onBlur={ formik.handleBlur }
            fullWidth
            type="number"
            sx={{ mb: 3 }}
          />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3} lg={3} >
              <TextField
                id="proteins"
                name="property.proteins"
                value={ formik.values?.property?.proteins }
                label="Белки"
                onChange={ formik.handleChange }
                error={ formik.touched?.property?.proteins && Boolean(formik.errors?.property?.proteins) }
                helperText={ formik.touched?.property?.proteins && formik.errors?.property?.proteins }
                onBlur={ formik.handleBlur }
                fullWidth
                type="number"
                sx={{ mb: 3 }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3} >
              <TextField
                id="fats"
                name="property.fats"
                value={ formik.values?.property?.fats }
                label="Жиры"
                onChange={ formik.handleChange }
                error={ formik.touched?.property?.fats && Boolean(formik.errors?.property?.fats) }
                helperText={ formik.touched?.property?.fats && formik.errors?.property?.fats }
                onBlur={ formik.handleBlur }
                fullWidth
                type="number"
                sx={{ mb: 3 }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3} >
              <TextField
                id="carbohydrates"
                name="property.carbohydrates"
                value={ formik.values?.property?.carbohydrates }
                label="Углеводы"
                onChange={ formik.handleChange }
                error={ formik.touched?.property?.carbohydrates && Boolean(formik.errors?.property?.carbohydrates) }
                helperText={ formik.touched?.property?.carbohydrates && formik.errors?.property?.carbohydrates }
                onBlur={ formik.handleBlur }
                fullWidth
                type="number"
                sx={{ mb: 3 }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3} >
              <TextField
                id="calories"
                name="property.calories"
                value={ formik.values?.property?.calories }
                label="Калории"
                onChange={ formik.handleChange }
                error={ formik.touched?.property?.calories && Boolean(formik.errors?.property?.calories) }
                helperText={ formik.touched?.property?.calories && formik.errors?.property?.calories }
                onBlur={ formik.handleBlur }
                fullWidth
                type="number"
                sx={{ mb: 3 }}
              />
            </Grid>
          </Grid>
          <TextField
            id="description"
            value={ formik.values.description }
            label="Описание продукта"
            onChange={ formik.handleChange }
            error={ formik.touched.description && Boolean(formik.errors.description) }
            helperText={ formik.touched.description && formik.errors.description }
            onBlur={ formik.handleBlur }
            multiline
            fullWidth
            rows={3}
            sx={{ mb: 2 }}
          />
          <Grid spacing={2} justifyContent="flex-end" display="flex">
            <Button onClick={close} sx={{ mr: 2 }}>Cancel</Button>
            <Button type="submit" variant="contained">Subscribe</Button>
          </Grid>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default CreateProductModal
