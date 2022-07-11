import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Box, FormControl, Grid, InputLabel, Typography } from '@mui/material'
import { InputType, isInputsWrapper } from './FormParser';
import ColorField from './ColorField'
import { getKey } from '../../../utils/helper';


// TODO: необходимо добавить обработку вложенных связей в formik и yum (с помощью утилиты jq)
const FieldForm = (item: InputType, formik: any) => {
  const spacing = 1
  console.log('build FieldForm')

  if (isInputsWrapper(item)) {
    return <Grid key={`grid-${item.name}`} container spacing={spacing} sx={{ mb: 3 }}>
      { item.children.map((child) => FieldForm(child, formik)) }
    </Grid>
  } else {
    const { name, items, buildItemCallback, title, type, fieldOptions, width } = item
    const key = `${name}-${formik.values?.type}`
    const value = getKey(formik.values, name) //.options?.[name]
    const error: boolean | undefined = getKey(formik.touched, name) && Boolean(getKey(formik.errors, name))
    const helperText: string | boolean | undefined = getKey(formik.touched, name) && getKey(formik.errors, name)

    let field
    if (type === 'text') {
      field = <TextField
        key={key}
        id={name}
        {...fieldOptions}
        sx={{ mb: item.width ? 0 : spacing }}
        name={name}
        label={title}
        margin="dense"
        fullWidth
        value={value}
        variant="outlined"
        onChange={formik.handleChange}
        error={error}
        helperText={helperText}
        onBlur={ formik.handleBlur }
      />
    } else if (type === 'color') {
      const handle = (color: string) => {
        formik.setFieldValue(name, color)
      }

      field = <Box key={key} sx={{
          display: 'flex',
          flexDirection: 'column',
          height: 62,
          '& button': { borderRadius: 1 }
        }}>
        <Typography
          variant="caption"
          display="block"
          gutterBottom
          sx={{
            color: (theme) => theme.palette.text.disabled
          }}
        >
          {title}
        </Typography>
        <ColorField value={value} onChange={handle} />
      </Box>
    } else if (type === 'selector') {
      field = <FormControl sx={{width: '100%', mt: 1}}>
        <InputLabel id={`${name}-label`}>{title}</InputLabel>
        <Select
          key={key}
          id={name}
          labelId={`${name}-label`}
          label={title}
          sx={{ mb: item.width ? 0 : spacing }}
          {...fieldOptions}
          name={name}
          margin="dense"
          fullWidth
          value={value}
          variant="outlined"
          onChange={formik.handleChange}
          error={error}
          onBlur={formik.handleBlur}
        >
          { items && items.map(({ value }) => {
            return <MenuItem value={value} key={`selector-${key}-${value}`}>
              {buildItemCallback ? buildItemCallback(value) : value}
            </MenuItem>
          })}
        </Select>
      </FormControl>
    } else {
      field = <Box> Need build field </Box>
    }

    const needWrapper = width

    if (needWrapper) {
      return <Grid key={`${name}-${type}-wrapper`} item {...width}>
        { field }
      </Grid>
    }

    return field
  }
}

export default FieldForm