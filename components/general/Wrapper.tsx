import React, { useState } from 'react';
import { Box } from '@mui/material';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import WrapperController from '../controllers/WrapperController';
import {
  selectFields,
  selectMQTTStatus,
  selectLayouts,
  selectIsBlockLayout,
  SET_LAYOUTS
} from '../../store/reducers/connection';
import MessagesBlock from './MessagesBlock'

import { Responsive, WidthProvider } from "react-grid-layout";
import { controllerBounds } from '../../constant/controllerSize';

const ReactGridLayout = WidthProvider(Responsive);

const rowHeight = 50
const columnGap = 10
const calculateColumnAmount = (width: number) => Math.ceil(width / (rowHeight + columnGap))
const gridBreakpoints = { xl: 1900, lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }

const gridCols = Object.entries(gridBreakpoints).reduce<Record<string, number>>((acc, [key, value]) => {
  acc[key] = calculateColumnAmount(value)
  return acc
}, {})

function Wrapper() {
  const MQTTstatus = useSelector(selectMQTTStatus);

  const isBlockedLayout = useSelector(selectIsBlockLayout);
  const [compactType, setCompactType] = useState<"vertical" | "horizontal">('vertical')
  const layouts = useSelector(selectLayouts);

  const fields = useSelector(selectFields);
  const dispatch = useDispatch();

  const onLayoutChange = (layout: ReactGridLayout.Layout[], newLayouts: ReactGridLayout.Layouts) => {
    dispatch(SET_LAYOUTS(newLayouts))
  }
  const ResizeHandler = <svg className="resize-handler" width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.12127 26.234L26.234 1.12132C28.1239 -0.76857 31.3553 0.569931 31.3553 3.24264V28.3553C31.3553 30.0122 30.0121 31.3553 28.3553 31.3553L3.24259 31.3553C0.569878 31.3553 -0.768622 28.1239 1.12127 26.234Z" fill="currentColor"/>
  </svg>

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <ReactGridLayout
        className="layout"
        rowHeight={rowHeight}
        isBounded={false}
        isDraggable={isBlockedLayout}
        isResizable={isBlockedLayout}
        compactType={compactType}
        onLayoutChange={onLayoutChange}
        breakpoints={gridBreakpoints}
        draggableCancel='.resize-handler'
        cols={gridCols}
        resizeHandle={ResizeHandler}
        layouts={layouts}
        // INFO: градиент на все блоки не работает с css transform
        useCSSTransforms={isBlockedLayout}
      >
        { fields.map(field => {
          const { width: w, height: h, id } = field;
          const bounds = controllerBounds[field.type];

          return <div data-grid={{ w, h, x: 0, y: 0, i: id, ...bounds }} key={id}>
            <WrapperController {...field} />
          </div>
        }) }
      </ReactGridLayout>

      <MessagesBlock />
    </Box>
  );
}

export default Wrapper;
