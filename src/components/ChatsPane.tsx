import * as React from 'react';
import Stack from '@mui/joy/Stack';
import Sheet from '@mui/joy/Sheet';
import { Autocomplete, Box, Button, Chip, Divider, FormControl, FormLabel, IconButton, Input, Modal, ModalClose, ModalDialog, TextField, Typography } from '@mui/joy';
import List from '@mui/joy/List';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ChatListItem from './ChatListItem';
import { ChatProps } from '../types';
import { toggleMessagesPane } from '../utils/joy/utils';
import { useContext, useMemo, useState } from 'react';
import { ChatContext } from '@/context/chatContext';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

import ContactAttributes from './contact-attributes';
import { CircularProgress } from '@mui/material';

type ChatsPaneProps = {
  chats: ChatProps[];
  setSelectedChat: (chat: ChatProps) => void;
  selectedChatId: string;
};

export default function ChatsPane(props: ChatsPaneProps) {

  const { chats, unreadCount, debouncedSearch, isLoading, chatFilter,
    setChatFilter, filterConditions, attributes, debouncedFilterSearch,
    onFilterChange, inputRef,
    inputFilterRef, filters, open, setOpen, removeAttributeButtonHandler,
    addAttributeButtonHandler, contactsViewRef, onFilterInputChange, filterInputs } = useContext(ChatContext);


  return (
    <Sheet
      sx={{
        borderRight: '1px solid',
        borderColor: 'divider',
        height: {
          xs: 'calc(100dvh - var(--Header-height))',
          sm: 'calc(94dvh - var(--Header-height))'
        },
        // overflowY: 'auto',
      }}
    // ref={contactsViewRef}
    >
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        justifyContent="space-between"
        p={2}
        pb={1.5}
      >
        <Autocomplete
          sx={{
            fontWeight: "bold",
            fontSize: 18,
            width: 160
          }}
          disableClearable
          value={chatFilter}
          options={[{
            label: 'All Chats',
            value: 'all_chats',
          },
          {
            label: 'Unassigned',
            value: 'unassigned',
          },
          {
            label: 'Last 24 Hours',
            value: 'last24hours',
          },
          {
            label: 'Assigned to me',
            value: 'assigned_to_me',
          },
          {
            label: 'Favorite Only',
            value: 'is_favorite',
          },
          // {
          //   label: 'Not closed & Not expired',
          //   value: 'not_closed_and_expired',
          // },
          // {
          //   label: 'New',
          //   value: 'new',
          // },
          {
            label: 'Open',
            value: 'open',
          },
          {
            label: 'Pending',
            value: 'pending',
          },
          {
            label: 'Solved',
            value: 'solved',
          },
          {
            label: 'Expired',
            value: 'expired',
          },
          {
            label: 'Blocked chats',
            value: 'blocked',
          },
            // {
            //   label: 'Broadcasts',
            //   value: 'broadcasts',
            // }
          ]}
          variant="plain"
          slotProps={{
            listbox: {
              variant: 'outlined',
            },
          }}
          onChange={(e, v) => setChatFilter(v)}
        />
        {/* <Typography
          fontSize={{ xs: 'md', md: 'lg' }}
          component="h1"
          fontWeight="lg"
          endDecorator={
            unreadCount > 0 && <Chip
              variant="soft"
              color="primary"
              size="md"
              slotProps={{ root: { component: 'span' } }}
            >
              {unreadCount}
            </Chip>

          }
          sx={{ mr: 'auto' }}
        >
          Messages
        </Typography> */}
        <Box>
          <IconButton
            variant="plain"
            aria-label="edit"
            color="neutral"
            size="sm"
            sx={{
              display: {
                // xs: 'none',
                sm: 'unset'
              }
            }}
            onClick={() => setOpen(true)}
          >
            <FilterAltIcon />
          </IconButton>
          <IconButton
            variant="plain"
            aria-label="edit"
            color="neutral"
            size="sm"
            onClick={() => {
              toggleMessagesPane();
            }}
            sx={{
              display: { sm: 'none' }
            }}
          >
            <CloseRoundedIcon />
          </IconButton>
        </Box>
      </Stack>
      <Box sx={{ px: 2, pb: 1.5 }}>
        <Input
          size="sm"
          startDecorator={<SearchRoundedIcon />}
          placeholder="Search"
          aria-label="Search"
          onChange={(event) => debouncedSearch(event.target.value)}
        />
      </Box>
      <ContactAttributes
        filters={filters}
        onFilterChange={onFilterChange}
        filterConditions={filterConditions}
        attributes={attributes}
        debouncedFilterSearch={debouncedFilterSearch}
        open={open}
        setOpen={setOpen}
        removeAttributeButtonHandler={removeAttributeButtonHandler}
        addAttributeButtonHandler={addAttributeButtonHandler}
        onFilterInputChange={onFilterInputChange}
        filterInputs={filterInputs}
      />
      <Box
      className='chats-pane-box'
        ref={contactsViewRef}
        sx={{
          // backgroundColor: 'blue',
          overflowY: 'auto',
          height: 'calc(100dvh - var(--Header-height))' // subtracting header height height
        }}>
        <List
          sx={{
            py: 0,
            '--ListItem-paddingY': '0.75rem',
            '--ListItem-paddingX': '1rem',
          }}

        >
          {chats?.map((chat) => (
            <ChatListItem
              key={chat?.id}
              {...chat}
              chat={chat}
            />
          ))}
        </List>
        {isLoading &&
          <Box sx={{
            // mt: 2,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}>
            <CircularProgress color='primary' />
          </Box>
        }
      </Box>
      {
        chats?.length == 0 &&
        <Typography sx={{
          px: 2, pb: 1.5
        }}>
          No chats found
        </Typography>
      }
    </Sheet >
  );
}
