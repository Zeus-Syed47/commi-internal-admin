import * as React from 'react';
import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import AvatarWithStatus from './AvatarWithStatus';
import ChatBubble from './ChatBubble';
import MessageInput from './MessageInput';
import MessagesPaneHeader from './MessagesPaneHeader';
import { ChatProps, MessageProps } from '../types';
import useStore from "@/store";
import { useContext, useEffect, useMemo, useState } from 'react';
import { ChatContext } from '@/context/chatContext';
import MessageInputBroadcast from './MessageInputBroadcast';
import SelectTemplate from './SelectTemplate';
import { Chip, CircularProgress, Container, Drawer, Grid2, useMediaQuery, useTheme } from '@mui/material';
import BotWithStatus from './BotWithStatus';
import { NotificationsActive, NotificationsNone } from '@mui/icons-material';
import MessagesPaneView from './MessagesPaneView';
import { useMutation } from '@tanstack/react-query';
import { getCorrectedTextApi } from '@/api/ai';
import { formatSentenceFromAI } from '@/utils/format/extractText';


type MessagesPaneProps = {
  chat: ChatProps;
  contact: any;
  conversations: any;
};

export default function MessagesPane(props: MessagesPaneProps) {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [isSelectingTemplate, setIsSelectingTemplate] = useState(false)
  const { conversations, openDrawer, setOpenDrawer,
    sendBroadCastMessageHandler, conversationProgress,
    conversationViewRef, isConversationLoading, currentUser,
    selectedContact
  } = useContext(ChatContext);

  const [textAreaValue, setTextAreaValue] = useState('');
  const [isInternal, setIsInternal] = useState(false);

  const { mutate: getCorrectedText, isPending: isCorrectedTextLoading } =
    useMutation({
      mutationKey: ["getCorrectedText"],
      mutationFn: (params) => {
        return getCorrectedTextApi({
          prompt: textAreaValue,
          promptType: params
        })
      },
      onSuccess: (data) => {
        if (data?.data) {
          let text = formatSentenceFromAI(data?.data);
          setTextAreaValue(text);
        }
      },
    });


  const toggleDrawer =
    () =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }

        setOpenDrawer(false);
      };



  const renderSendMessageView = useMemo(() => {
    const isConversationActive = conversationProgress?.status === 'active' && !conversationProgress?.is24HoursPassed
    return (
      isConversationActive ?
        <MessageInput
          isInternal={isInternal}
          textAreaValue={textAreaValue}
          setTextAreaValue={setTextAreaValue}
          setIsInternal={setIsInternal}
          onSubmit={() => {
            sendBroadCastMessageHandler(textAreaValue, 'text', isInternal)
          }}
          onTemplateSelected={() => {
            setOpenDrawer(true);
          }}
          getCorrectedText={getCorrectedText}
          isCorrectedTextLoading={isCorrectedTextLoading}
        />
        :
        <MessageInputBroadcast onSubmit={() => setOpenDrawer(true)} origin={selectedContact?.origin} />
    )
  }, [conversations, setIsSelectingTemplate, isSelectingTemplate,
    isInternal, setIsInternal, getCorrectedText, isCorrectedTextLoading,
    conversationProgress, sendBroadCastMessageHandler,
    textAreaValue, setTextAreaValue, selectedContact])

  return (
    <>
      <Sheet
      // className='inbox-sheet'
        sx={{
          // border: '1px solid black',
          height: {
            xs: 'calc(100dvh - var(--Header-height))',
            sm: '100dvh',
          },
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'background.level1',
        }}
      >
        <MessagesPaneHeader sender={selectedContact} />
        <MessagesPaneView />
        {renderSendMessageView}
      </Sheet>

      <Drawer
        anchor={'right'}
        open={openDrawer}
        onClose={toggleDrawer()}
        sx={{
          zIndex: 10000
        }}
      >
        <Grid2 sx={{
          width: isMobile ? 400 : 800,
        }}>
          <Container>
            <Grid2 container spacing={10} direction={'row'} wrap={'wrap'}>
              <Grid2>
                <SelectTemplate onClose={() => setOpenDrawer(false)} />
              </Grid2>
            </Grid2>
          </Container>
        </Grid2>
      </Drawer>
    </>
  );
}
