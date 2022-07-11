import React, { useEffect, useRef } from 'react';
import { ControllerOptions } from '../../../store/reducers/connection/types';
import { iconMap } from '../../../constant/icons';
import { buildColor } from '../../../utils/helper';
import styles from './style.module.css'
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

const IconController: React.FunctionComponent<ControllerOptions<'clock'>> = (props) => {
  const { type = 'default', color } = props.options
  const hoursLine = useRef<HTMLDivElement>(null)
  const minutesLine = useRef<HTMLDivElement>(null)
  const secondsLine = useRef<HTMLDivElement>(null)
  const timer = useRef<ReturnType<typeof setInterval>>()

  useEffect(() => {
    clockTick()
    timer.current = setInterval(clockTick, 1000)
    return () => {
      clearInterval(timer.current)
    }
  }, [])

  const clockTick = () => {
    const date = new Date()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()

    hoursLine!.current!.style.setProperty('transform', `rotate(${(hours % 12) * 30 + (minutes * (15 / 60))}deg)`)
    minutesLine!.current!.style.setProperty('transform', `rotate(${minutes * 6}deg)`)
    secondsLine!.current!.style.setProperty('transform', `rotate(${seconds * 6}deg)`)
  }

  return (
    <div className={styles.clock}>
      <div className={styles.clockHour}>
        <Box className={styles.clockHourPath} ref={hoursLine} sx={{
          '&::before': { backgroundColor: theme => buildColor(color || 'primary.main', theme) }
        }}/>
      </div>
      <div className={styles.clockMinute}>
        <div className={styles.clockMinutePath} ref={minutesLine}></div>
      </div>
      <div className={styles.clockSecond}>
        <div className={styles.clockSecondPath} ref={secondsLine}></div>
      </div>
    </div>
  );
};

export default IconController;
