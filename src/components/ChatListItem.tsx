import * as React from 'react';
import Box from '@mui/joy/Box';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { ListItemButtonProps } from '@mui/joy/ListItemButton';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import CircleIcon from '@mui/icons-material/Circle';
import AvatarWithStatus from './AvatarWithStatus';
import { ChatProps, MessageProps, UserProps } from '../types';
import { toggleMessagesPane } from '../utils/joy/utils';
import useStore from "@/store";
import { useContext, useMemo } from 'react';
import { ChatContext } from '@/context/chatContext';
import { timeAgo } from '@/utils/format/chatTime';
import { Grid2 } from '@mui/material';
import { Done, DoneAll, Star, StarBorderOutlined } from '@mui/icons-material';
import { CircularProgress, IconButton } from '@mui/joy';
import AvatarWithOrigin from './AvatarWithOrigin';


type ChatListItemProps = ListItemButtonProps & {
  name: string;
  id: string;
  unread?: boolean;
  sender: UserProps;
  messages: MessageProps[];
  selectedChatId?: string;
  setSelectedChat: (chat: ChatProps) => void;
};

export default function ChatListItem(props: ChatListItemProps) {
  const { sender, last_message, name, id, unread, chat, insta_user_name, origin } = props;

  const { fetchConversation, selectedContact, isContactUpdating, updateContactApi, currentUser, updateSelectedContactHandler, updateContactHandlerApi } = useContext(ChatContext);

  const updateChatContacts = useStore((state) => state?.updateChatContacts);

  const selected = useMemo(() => selectedContact?.id === id, [id, selectedContact?.id])
  const time = useMemo(() => last_message?.createdAt ? timeAgo(last_message?.createdAt) : '', [last_message?.createdAt])

  const renderTick = useMemo(() => {
    if (!last_message?.double_tick_status) {
      return null
    }
    switch (last_message?.double_tick_status) {
      case 'sending':
        return <Typography sx={{ fontSize: 12, ml: 1 }} variant='soft'>sending</Typography>;
      case 'sent':
        return <Done sx={{ height: 20, width: 20, ml: 0.5, color: 'grey' }} />;
      case 'delivered':
        return <DoneAll sx={{ height: 20, width: 20, ml: 0.5, color: 'grey' }} />
      case 'read':
        return <DoneAll sx={{ height: 20, width: 20, ml: 0.5 }} color='primary' />
      case 'failed':
        return 'Failed'
      case 'failed_retry':
        return 'Failed Retry'

      default:
        return ''
    }
  }, [last_message?.double_tick_status]);

  const favoriteView = useMemo(() => {
    return (
      chat?.is_favorite ?
        <IconButton onClick={() => {
          updateContactApi({
            data: {
              is_favorite: false
            }, contact_id: chat?.id
          })
        }}><Star color='success' /></IconButton> :
        <IconButton onClick={() => {
          updateContactApi({
            data: {
              is_favorite: true
            }, contact_id: chat?.id
          })
        }}> <StarBorderOutlined /></IconButton>
    )
  }, [updateContactApi, chat?.id, chat?.is_favorite])

  const renderMessage = useMemo(() => {
    switch (last_message?.type) {
      case 'button':
      case 'node_text':
        return last_message?.data?.text;
      case 'text':
        return last_message?.data?.text;
      case 'interactive':
        return last_message?.data?.title ?? 'renderMessage';
      case 'template':
        return last_message?.data?.template_name ?? 'renderTemplateMessage'
      default:
        return last_message?.data?.text ?? ''
    }
  }, [last_message]);

  return (
    <React.Fragment>
      <ListItem>
        <ListItemButton
          onClick={() => {
            toggleMessagesPane();
            updateSelectedContactHandler(chat);
            if (unread) {
              updateChatContacts({ data: [chat], source: 'read' });
              updateContactHandlerApi({
                data: {
                  read: true
                },
                contact_id: id,
              });
            }
            if (chat?.origin === 'instagram') {
              fetchConversation({
                commi_insta_user_id: currentUser?.company?.instagrams[0]?.insta_professional_account_id,
                contact_id: id,
              })
            }
            else if (chat?.origin === 'page') {
              fetchConversation({
                commi_fb_page_id: currentUser?.company?.facebooks[0]?.commi_fb_page_id,
                contact_id: id,
              })
            }
            else {
              fetchConversation({
                waba_id: currentUser?.company?.wabas[0]?.waba_meta_id,
                // waba_id: 380962461770162,
                contact_id: id,
              })
            }
          }}
          selected={selected}
          color="neutral"
          sx={{
            flexDirection: 'column',
            alignItems: 'initial',
            gap: 1,
          }}
        >
          <Stack direction="row" spacing={1.5}>
            <AvatarWithOrigin origin={origin} />
            <Box sx={{ flex: 1 }}>
              <Box sx={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                <Typography level="title-sm">{name ? name : chat?.origin === 'instagram' ? 'Instagram User' : chat?.origin === 'page' ? 'Facebook User' : ''}</Typography>
                {favoriteView}
              </Box>
              <Typography level="body-sm">{sender?.username}</Typography>
            </Box>
            <Box
              sx={{
                lineHeight: 1.5,
                textAlign: 'right',
              }}
            >
              {unread && (
                <CircleIcon sx={{ fontSize: 12 }} color="primary" />
              )}
              <Typography
                level="body-xs"
                display={{ xs: 'none', md: 'block' }}
                noWrap
              >
                {time}
              </Typography>
            </Box>
          </Stack>
          <Grid2 sx={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
            <Grid2 sx={{ mr: 1.5 }}>{renderTick}</Grid2>
            <Typography
              level="body-sm"
              sx={{
                display: '-webkit-box',
                WebkitLineClamp: '2',
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {last_message?.status === 'unsent' ? <Typography fontStyle={'italic'}>{'This message was unsent.'}</Typography> : renderMessage}
            </Typography>
          </Grid2>
        </ListItemButton>
      </ListItem>
      <ListDivider sx={{ margin: 0 }} />
    </React.Fragment>
  );
}
