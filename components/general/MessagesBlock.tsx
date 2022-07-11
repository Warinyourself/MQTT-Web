import React, { useState } from 'react';
import { Box, Stack, IconButton, Typography, Collapse } from '@mui/material';
import { useSelector } from 'react-redux';
import { messagesMQTTStatus } from '../../store/reducers/connection';
import ReactJson from 'react-json-view'
import { useTheme } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { MessageInterface } from '../../store/reducers/connection/types';

// TODO: handle empty messages list
function MessagesBlock() {
  const messages = useSelector(messagesMQTTStatus);
  const [isOpen, setOpen] = useState(false)
  const { palette } = useTheme();
  const textColor = palette.grey[700]
  const primary = palette.primary.main

  const MessagesBlockStyle = {
    overflow: 'auto',
    marginTop: 'auto',
    background: palette.primaryDark['900']
  }
  const jsonColorScheme = {
    base00: palette.primaryDark['900'],
    base01: "#ddd",
    base02: 'transparent',
    base03: "white",
    base04: "purple",
    base05: textColor,
    base06: textColor,
    base07: textColor,
    base08: textColor,
    base09: palette.secondary.main, // string
    base0A: palette.info.main, // NULL VALUE
    base0B: primary,
    base0C: primary,
    base0D: primary,
    base0E: primary,
    base0F: primary // int value
  }

  const generateMessageJson = (message: MessageInterface) => {
    return <ReactJson
      key={message.created_at + message.channel_id}
      src={message}
      enableClipboard={false}
      displayDataTypes={false}
      displayObjectSize={false}
      name={false}
      theme={jsonColorScheme}
    />
  }
  const ButtonIcon = isOpen ? KeyboardDoubleArrowDownIcon : KeyboardDoubleArrowUpIcon
  const titleMessagesStyle = {
    p: 2,
    py: 1,
    m: 0,
    zIndex: 10,
    top: 0,
    position: 'sticky',
    backdropFilter: 'blur(10px)',
  }

  return (
    <Box sx={ MessagesBlockStyle }>
      <Stack direction="row" spacing={2} alignItems="center" sx={titleMessagesStyle}>
        <Typography variant="body1">Messages</Typography>
        <Box sx={{ flex: '1 1 auto' }} />

        <IconButton color="primary" sx={{ px: 2, mb: 1 }} onClick={ () => setOpen(!isOpen) }>
          <ButtonIcon fontSize="small" />
        </IconButton>
      </Stack>

      <Collapse in={isOpen}>
        <Box sx={{ maxHeight: '25vh', minHeight: isOpen ? '25vh' : null }}> { messages.map(generateMessageJson) } </Box>
      </Collapse>
    </Box>
  );
}

export default MessagesBlock;
