import React from 'react';
import Button from '@mui/material/Button';
import { Box, Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import useMqttConnetion from '../../hooks/mqtt';
import { selectConnectionName, selectMQTTStatus } from '../../store/reducers/connection';
import { MQTT_STATUS_CONNECTION } from '../../constant/mqtt';

function ConnectionController() {
  const [MQTTClient, initClient] = useMqttConnetion()
  const MQTTstatus = useSelector(selectMQTTStatus);
  const connectionName = useSelector(selectConnectionName);
  const showConnectButton = [MQTT_STATUS_CONNECTION.close, MQTT_STATUS_CONNECTION.disconnect, MQTT_STATUS_CONNECTION.error].includes(MQTTstatus);
  const showCloseButton = [MQTT_STATUS_CONNECTION.success, MQTT_STATUS_CONNECTION.loading, MQTT_STATUS_CONNECTION.reconnect].includes(MQTTstatus);

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Typography variant="h6">
        { connectionName }
      </Typography>
      <Box className={`connection-indicator connection-indicator--${MQTTstatus}`} />

      <Box sx={{ flex: '1 1 auto' }} />

      { showConnectButton ? (
        <Button sx={{ mr: 2 }} size="medium" variant="outlined" onClick={ () => initClient && initClient() }>
          Connect
        </Button>
      ) : null }

      { showCloseButton ? (
        <Button size="medium" color="error" variant="outlined" onClick={ () => MQTTClient && MQTTClient.end() }>
          Close
        </Button>
      ) : null }
    </Stack>
  );
}

export default ConnectionController;
