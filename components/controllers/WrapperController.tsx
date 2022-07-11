import React from 'react';
import { useSelector } from 'react-redux';
import { selectIsBlockLayout } from '../../store/reducers/connection';
import { toast } from 'react-toastify';
import { Box, Typography } from '@mui/material';
import { Theme } from '@mui/material/styles';

import { FieldType } from '../../store/reducers/connection/types';
import useMqttConnetion from '../../hooks/mqtt';
import SliderController from './Slider';
import ColorController from './Color';
import ButtonController from './Button';
import IconController from './Icon';
import TextController from './Text';
import ClockController from './Clock';

import MoveIcon from '../IconComponents/MoveIcon';

const controllerComponentMap = {
  slider: SliderController,
  color: ColorController,
  button: ButtonController,
  icon: IconController,
  text: TextController,
  clock: ClockController,
};

const defaultBlockStyle = {
  overflow: 'hidden',
  borderRadius: 1,
  height: '100%',
  position: 'relative',
}

const wrapperBlockStyle = {
  bgcolor: (theme: Theme) => (theme.palette.mode === 'dark' ? 'primaryDark.900' : 'grey.200'),
  // background: 'linear-gradient(45deg, #22b0e6, #bae85e)',
  // backgroundClip: 'padding-box',
  // backgroundSize: 'cover',
  // backgroundPosition: 'center',
  // backgroundAttachment: 'fixed',
  backgroundRepeat: 'no-repeat',
  p: 2,
  display: 'flex',
  flexDirection: 'column',
  ...defaultBlockStyle
};

interface WrapperControllerProps {
  sendRequest?: boolean
}

const WrapperController: React.FunctionComponent<FieldType & WrapperControllerProps> = (props) => {
  const [mqttClient] = useMqttConnetion();
  const isBlockedLayout = useSelector(selectIsBlockLayout);
  const { title, type, name = 'field1', sendRequest = true } = props;

  const handleChangeField = (value: string): void => {
    if (!sendRequest) { return }
    if (mqttClient && !props.readonly && !isBlockedLayout) {
      mqttClient.publish(`channels/1771128/publish/fields/${name}`, value, { qos: 0, retain: false }, (error) => {
        if (!error) {
          return toast.success(`Поле успешно обновлено "${name}": ${value}`);
        }
        toast.error(error.toString());
      });
    } else {
      let errorMessage = 'Произошла неизвестная ошибка'

      if (isBlockedLayout) {
        errorMessage = 'Когда сетка находится в режиме редактирования вы не можете менять значения'
      } else if (mqttClient) {
        mqttClient
      } else if (props.readonly) {
        errorMessage = 'Поле заблокировано для изменения значения'
      }

      toast.error(errorMessage);
    } 
  };

  const showWrapper = !['button', 'icon'].includes(props.type)
  const showTitle = !['text', 'clock'].includes(props.type)

  const BuildWrapper = () => {
    const ControllerItem = controllerComponentMap[type];
    {/* @ts-ignore */}
    const Controller = <ControllerItem{...props} readonly={isBlockedLayout || props.readonly} handleChange={handleChangeField} />

    return <Box sx={showWrapper ? wrapperBlockStyle : defaultBlockStyle} className={`${isBlockedLayout && 'widget--blocked'}`}>
      { isBlockedLayout ? <MoveIcon /> : null }

      { showWrapper && showTitle ? <Typography variant="h5" gutterBottom>
        { title }
      </Typography> : null }
      { Controller }
    </Box>
  }

  return BuildWrapper();
};

export default WrapperController;
