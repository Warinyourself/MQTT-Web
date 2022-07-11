import React, { useRef, useState } from 'react';
import * as mqtt from 'mqtt/dist/mqtt.min';
import { MQTT_STATUS_CONNECTION } from '../constant/mqtt';
import { ADD_MESSAGE, SET_CONNECTION_STATUS, UPDATE_FIELD_VALUE } from '../store/reducers/connection';
import { useDispatch } from 'react-redux';
import { MessageInterface } from '../store/reducers/connection/types';
let client: mqtt.MqttClient | null = null
import { toast } from 'react-toastify';

export default function useMqttConnetion(): [mqtt.MqttClient, null] | [null, () => mqtt.MqttClient] {
  const dispatch = useDispatch()
  const setStatusMQTT = (value: MQTT_STATUS_CONNECTION) => dispatch(SET_CONNECTION_STATUS(value))

  if (client) { return [client, null] }

  return [
    null,
    () => {
      client = mqtt.connect(`ws://${process.env.NEXT_PUBLIC_URL}`, {
        keepalive: 60,
        connectTimeout: 30 * 1000,
        clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
        username: process.env.NEXT_PUBLIC_USERNAME,
        password: process.env.NEXT_PUBLIC_PASSWORD,
        clean: true,
        protocolId: 'MQTT',
        protocolVersion: 4,
        reconnectPeriod: 1000,
      })

      setStatusMQTT(MQTT_STATUS_CONNECTION.loading)

      client.on('connect', function (client) {
        setStatusMQTT(MQTT_STATUS_CONNECTION.success)
        toast.success('Соединение успешно установлено')
        console.log('Connected', { client })
      })
    
      client.on('reconnect', function () {
        setStatusMQTT(MQTT_STATUS_CONNECTION.reconnect)
        console.log('Reconnecting...')
      })
    
      client.on('close', function () {
        client = null
        toast.success('Соединение успешно закрыто')
        setStatusMQTT(MQTT_STATUS_CONNECTION.close)
        console.log('Disconnected')
      })
    
      client.on('disconnect', function (packet) {
        setStatusMQTT(MQTT_STATUS_CONNECTION.disconnect)
        console.log(packet)
      })
    
      client.on('error', function (error) {
        setStatusMQTT(MQTT_STATUS_CONNECTION.error)
        console.log(error)
      })
    
      client.on('message', function (topic, message) {
        const formattedMessage = JSON.parse(message.toString()) as MessageInterface
        const changedFields = Object.entries(formattedMessage).filter(([key, value]) => {
          const isField = /field\d{1,}/.test(key)
          if (isField && value !== null) { return true }
        })
    
        changedFields.forEach(([field, value]) => {
          dispatch(UPDATE_FIELD_VALUE({ field, value }))
        })
    
        dispatch(ADD_MESSAGE(JSON.parse(message.toString())))
      })
    
      client.subscribe('channels/1771128/subscribe', { qos: 0 }, function (error, granted) {
        if (error) {
          console.log(error)
        } else {
          console.log(`${granted[0].topic} was subscribed`)
        }
      })

      return client
    }
  ]
  // client.publish('channels/1771128/publish/fields/field1', 'ws connection demo...!', { qos: 0, retain: false })

  // client.unubscribe('testtopic', () => {
  //   console.log('Unsubscribed')
  // })
  
  // client.subscribe('channels/1771128/subscribe/fields/field1/', { qos: 0 }, function (error, granted) {
  //   if (error) {
  //     console.log(error)
  //   } else {
  //     console.log(`${granted[0].topic} was subscribed`)
  //   }
  // })
}