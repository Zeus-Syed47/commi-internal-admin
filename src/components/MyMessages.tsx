import * as React from 'react';
import Sheet from '@mui/joy/Sheet';
import MessagesPane from './MessagesPane';
import ChatsPane from './ChatsPane';
import { ChatContext } from '@/context/chatContext';
import { useContext } from 'react';
import NoConversationsView from './NoConversationsView';


export default function MyProfile() {

  const { selectedContact } = useContext(ChatContext)
  return (
    <Sheet
      sx={{
        // border: '1px solid black',
        flex: 1,
        width: '100%',
        mx: 'auto',
        pt: { xs: 'var(--Header-height)', sm: 0 },
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'minmax(min-content, min(30%, 400px)) 1fr',
        },
      }}
    >
      <Sheet
      className='inbox-sheet'
        sx={{
          // border: '1px solid black',
          position: { xs: 'fixed', sm: 'sticky' },
          transform: {
            xs: 'translateX(calc(100% * (var(--MessagesPane-slideIn, 0) - 1)))',
            sm: 'none',
          },
          transition: 'transform 0.4s, width 0.4s',
          width: '100%',
          top: 52,
          zIndex: {xs: 100, sm: 'unset'},
        }}
      >
        <ChatsPane />
      </Sheet>
      {Object.keys(selectedContact ?? {})?.length > 0 ?
        <MessagesPane />
        :
        <NoConversationsView />
      }
    </Sheet>
  );
}
