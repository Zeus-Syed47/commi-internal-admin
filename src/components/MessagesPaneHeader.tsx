import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Button from '@mui/joy/Button';
import Chip from '@mui/joy/Chip';
import IconButton from '@mui/joy/IconButton';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import CircleIcon from '@mui/icons-material/Circle';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { UserProps } from '../types';
import { toggleMessagesPane } from '../utils/joy/utils';
import CircularWithValueLabel from './progress';
import { ChatContext } from '@/context/chatContext';
import { useContext, useEffect, useMemo, useState } from 'react';
import { Autocomplete, Box } from '@mui/joy';
import { Star, StarBorderOutlined } from '@mui/icons-material';
import AvatarWithOrigin from './AvatarWithOrigin';

type MessagesPaneHeaderProps = {
  sender: UserProps;
};

export default function MessagesPaneHeader(props: MessagesPaneHeaderProps) {
  const { sender } = props;
  const [ticketStatus, setTicketStatus] = useState();
  const [assignedTo, setAssignedTo] = useState();

  const { viewProfileClick, updateConversationApi, companyUsers, conversationProgress, updateContactApi, isContactUpdating } = useContext(ChatContext);
  const statuses = [
    { key: 'open', label: 'Open' },
    { key: 'pending', label: 'Pending' },
    { key: 'solved', label: 'Solved' },
    { key: 'spam_block', label: 'Spam & Block' },
  ]
  useEffect(() => {
    if (conversationProgress?.ticket_status) {
      setTicketStatus({ key: conversationProgress?.ticket_status });
    }
  }, [conversationProgress?.ticket_status])

  useEffect(() => {
    if (conversationProgress?.assigned_to) {
      setAssignedTo({ id: conversationProgress?.assigned_to });
    }
  }, [conversationProgress?.assigned_to])

  const remainingHoursView = useMemo(() =>
    <CircularWithValueLabel progress={conversationProgress?.progress} hoursFormat={conversationProgress?.hoursFormat} />
    ,
    [conversationProgress?.progress, conversationProgress?.hoursFormat])

  const favoriteView = useMemo(() => {
    return (
      sender?.is_favorite ?
        <IconButton onClick={() => {
          updateContactApi({
            data: {
              is_favorite: false
            }, contact_id: sender?.id
          })
        }}><Star color='success' /></IconButton> :
        <IconButton onClick={() => {
          updateContactApi({
            data: {
              is_favorite: true
            }, contact_id: sender?.id
          })
        }}> <StarBorderOutlined /></IconButton>
    )
  }, [updateContactApi, sender?.id, sender?.is_favorite])

  return (
    <Stack
      // direction="row"
      justifyContent="space-between"
      sx={{
        borderBottom: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.body',
        flexDirection: {
          xs: 'column',
          md: 'row',
        }
      }}
      py={{ xs: 2, md: 2 }}
      px={{ xs: 1, md: 2 }}
    >
      <Stack direction='row' sx={{
        justifyContent: 'space-between'
      }}>
        <Stack direction="row" spacing={{ xs: 1, md: 2 }} alignItems="center">
          <IconButton
            variant="plain"
            color="neutral"
            size="sm"
            sx={{
              display: { xs: 'inline-flex', sm: 'none' },
            }}
            onClick={() => toggleMessagesPane()}
          >
            <ArrowBackIosNewRoundedIcon />
          </IconButton>
          <div onClick={() => {
            viewProfileClick()
          }} style={{
            cursor: 'pointer'
          }}>
            <AvatarWithOrigin size="lg" origin={sender?.origin} />
          </div>
          <div
            style={{
              cursor: 'pointer'
            }}
            onClick={() => {
              viewProfileClick()
            }}>
            <Typography
              fontWeight="lg"
              fontSize="lg"
              component="h2"
              noWrap
              endDecorator={
                sender?.online ? (
                  <Chip
                    variant="outlined"
                    size="sm"
                    color="neutral"
                    sx={{
                      borderRadius: 'sm',
                    }}
                    startDecorator={
                      <CircleIcon sx={{ fontSize: 8 }} color="success" />
                    }
                    slotProps={{ root: { component: 'span' } }}
                  >
                    Online
                  </Chip>
                ) : undefined
              }
            >
              {sender.name ? sender.name : sender?.origin === 'instagram' ? 'Instagram User' : sender?.origin === 'page' ? 'Facebook User' : ''}
            </Typography>
            <Typography level="body-sm">{sender?.username}</Typography>
          </div>
          {favoriteView}
        </Stack>
        {conversationProgress?.status === 'active' && !conversationProgress?.is24HoursPassed &&
          <Stack sx={{
            display: { xs: 'inline-flex', sm: 'none' },
          }}>
            {remainingHoursView}
          </Stack>
        }
      </Stack>

      <Stack spacing={1} direction="row" alignItems="center" justifyContent="space-between" sx={{
        mt: {
          xs: conversationProgress?.status === 'active' && !conversationProgress?.is24HoursPassed ? 2 : 0,
          sm: 0
        }
      }}>
        {conversationProgress?.status === 'active' && !conversationProgress?.is24HoursPassed &&
          <>
            <Stack sx={{
              display: { xs: 'none', sm: 'inline-flex' },
            }}>
              {remainingHoursView}
            </Stack>
            <Autocomplete
              size='sm'
              sx={{
                width: 160
              }}
              value={ticketStatus}
              // id="combo-box-demo"
              options={statuses ?? []}
              onChange={(e, v) => {
                updateConversationApi({
                  data: { ticket_status: v?.key },
                  conversation_id: conversationProgress?.id
                })
              }}
              placeholder='Update'
              getOptionLabel={(option) =>
                option?.label ?
                  `${option.label}`
                  : `${statuses?.find((item) => item?.key === ticketStatus?.key)?.label}`}
            />
            <Autocomplete
              size='sm'
              sx={{
                width: 160
              }}
              value={assignedTo}
              // id="combo-box-demo"
              options={companyUsers ?? []}
              onChange={(e, v) => {
                updateConversationApi({
                  data: { assigned_to: v?.id },
                  conversation_id: conversationProgress?.id
                })
              }}
              placeholder='Assign'
              getOptionLabel={(option) =>
                option?.email || option?.name
                  ? `${option.email || option?.name}`
                  : `${companyUsers?.find((item) => item?.id === assignedTo?.id)?.email
                  ||
                  companyUsers?.find((item) => item?.id === assignedTo?.id)?.name
                  }`}
            />
          </>
        }
        {/* <Button
          startDecorator={<PhoneInTalkRoundedIcon />}
          color="neutral"
          variant="outlined"
          size="sm"
          sx={{
            display: { xs: 'none', md: 'inline-flex' },
          }}
        >
          Call
        </Button> */}
        <Button
          color="neutral"
          variant="outlined"
          size="sm"
          sx={{
            display: { xs: 'none', md: 'inline-flex' },
          }}
          onClick={() => viewProfileClick()}
        >
          View profile
        </Button>
        {/* <IconButton size="sm" variant="plain" color="neutral">
          <MoreVertRoundedIcon />
        </IconButton> */}
      </Stack>
    </Stack>
  );
}
