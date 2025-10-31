import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Stack from '@mui/joy/Stack';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import CelebrationOutlinedIcon from '@mui/icons-material/CelebrationOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';
import { MessageProps } from '../types';
import { useCallback, useMemo } from 'react';
import moment from 'moment';
import { Done, DoneAll } from '@mui/icons-material';
import MessageNode from './node/messageNode';
import { Tooltip } from '@mui/joy';
import { ClickAwayListener } from '@mui/material';

type ChatBubbleProps = MessageProps & {
  variant: 'sent' | 'received';
};

export default function ChatBubble(props: ChatBubbleProps) {
  const { template_components, variant, createdAt, attachment = undefined, sender, body, user_sender, contact_sender, double_tick_status, data, type, status, error_reason } = props;
  const isSent = variant === 'sent';
  const [isHovered, setIsHovered] = React.useState<boolean>(false);
  const [isLiked, setIsLiked] = React.useState<boolean>(false);
  const [isCelebrated, setIsCelebrated] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipToggle = () => {
    setOpen(!open);
  };

  const prepareTemplateMessage = useCallback((components) => {
    let preparedTemplate = {};
    for (let item of components) {
      if (item?.type == "HEADER") {
        preparedTemplate = {
          ...preparedTemplate,
          header: {
            format: item.format,
            src: item.format === 'TEXT' ? item.text : item?.example?.header_handle[0]
          },
          headerExampleValues: item?.example?.header_text?.map((ht, index) => {
            return {
              [`{{${index + 1}}}`]: ht
            }
          }) ?? []
        }
      }
      if (item?.type == "BODY") {
        preparedTemplate = {
          ...preparedTemplate,
          body: item.text,
          bodyExampleValues: item?.example?.body_text?.length ? item?.example?.body_text[0]?.map((bt, index) => {
            return {
              [`{{${index + 1}}}`]: bt
            }
          }) : item?.example?.body_text_named_params ?? []
        }
      }
      if (item?.type == "FOOTER") {
        preparedTemplate = {
          ...preparedTemplate,
          footer: item.text
        }
      }
      if (item?.type == "BUTTONS") {
        preparedTemplate = {
          ...preparedTemplate,
          templateButtons: item.buttons
        }
      }
    }
    return preparedTemplate;
  }, [])

  const renderTime = useMemo(() => {
    return moment(createdAt).format('LT') ?? ''
  }, [createdAt]);

  const renderMessage = useMemo(() => {
    switch (type) {
      case 'button':
      case 'node_text':
        return data?.text;
      case 'text':
        return data?.text;
      case 'interactive':
        return data?.title ? data?.title : data?.question ? <MessageNode nodeValues={prepareTemplateMessage([{
          type: 'HEADER',
          format: 'TEXT',
          text: data?.question
        }, {
          type: "BUTTONS",
          buttons: data?.buttons
        }])} justDisplay={true} /> : 'renderMessage';
      case 'template':
        return data?.template_name ? <MessageNode nodeValues={prepareTemplateMessage(data?.template_components)} justDisplay={true} /> : 'renderTemplateMessage'
      default:
        return ''
    }
  }, [data, prepareTemplateMessage]);

  const renderTick = useMemo(() => {
    switch (double_tick_status) {
      case 'sending':
      case 'queued':
        return <Typography sx={{ fontSize: 12, ml: 1 }} variant='soft'>sending</Typography>;
      case 'sent':
        return <Done sx={{ height: 20, width: 20, ml: 0.5, color: 'grey' }} />;
      case 'delivered':
        return <DoneAll sx={{ height: 20, width: 20, ml: 0.5, color: 'grey' }} />
      case 'read':
        return <DoneAll sx={{ height: 20, width: 20, ml: 0.5 }} color='primary' />
      case 'failed':
        return <ClickAwayListener onClickAway={handleTooltipClose}><Box onClick={handleTooltipToggle}><Tooltip open={open} title={error_reason} variant="solid"><Typography sx={{ fontSize: 12, ml: 1, color: 'tomato', cursor: 'pointer' }} variant='soft'>failed</Typography></Tooltip></Box></ClickAwayListener>;
      case 'failed_retry':
        return 'Failed Retry'

      default:
        return ''
    }
  }, [double_tick_status, handleTooltipToggle, handleTooltipClose, open, error_reason]);

  return (
    <Box sx={{ maxWidth: '60%', minWidth: 'auto' }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        sx={{ mb: 0.25 }}
      >
        <Typography level="body-xs">
          {!user_sender && !contact_sender ? "Bot" : user_sender?.name ? 'You' : contact_sender?.name}
        </Typography>
        <Box sx={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
          <Typography level="body-xs">{renderTime}</Typography>
          {renderTick}
        </Box>
      </Stack>
      {attachment ? (
        <Sheet
          variant="outlined"
          sx={{
            px: 1.75,
            py: 1.25,
            borderRadius: 'lg',
            borderTopRightRadius: isSent ? 0 : 'lg',
            borderTopLeftRadius: isSent ? 'lg' : 0,
          }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Avatar color="primary" size="lg">
              <InsertDriveFileRoundedIcon />
            </Avatar>
            <div>
              <Typography fontSize="sm">{attachment?.fileName}</Typography>
              <Typography level="body-sm">{attachment?.size}</Typography>
            </div>
          </Stack>
        </Sheet>
      ) : (
        <Box
          sx={{ position: 'relative' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Sheet
            color={isSent ? 'primary' : 'neutral'}
            variant={isSent ? 'solid' : 'soft'}
            sx={{
              p: 1.25,
              borderRadius: 'lg',
              borderTopRightRadius: isSent ? 0 : 'lg',
              borderTopLeftRadius: isSent ? 'lg' : 0,
              backgroundColor: isSent
                ? '0b6bcb'
                : 'background.body',
            }}
          >
            <Typography
              level="body-sm"
              sx={{
                color: isSent
                  ? 'var(--joy-palette-common-white)'
                  : 'var(--joy-palette-text-primary)',
              }}
            >
              {status === 'unsent' ? <Typography fontStyle={'italic'}>"This message was unsent."</Typography> : renderMessage ?? ''}
            </Typography>
          </Sheet>
          {(isHovered || isLiked || isCelebrated) && (
            <Stack
              direction="row"
              justifyContent={isSent ? 'flex-end' : 'flex-start'}
              spacing={0.5}
              sx={{
                position: 'absolute',
                top: '50%',
                p: 1.5,
                ...(isSent
                  ? {
                    left: 0,
                    transform: 'translate(-100%, -50%)',
                  }
                  : {
                    right: 0,
                    transform: 'translate(100%, -50%)',
                  }),
              }}
            >
              <IconButton
                variant={isLiked ? 'soft' : 'plain'}
                color={isLiked ? 'danger' : 'neutral'}
                size="sm"
                onClick={() => setIsLiked((prevState) => !prevState)}
              >
                {isLiked ? '❤️' : <FavoriteBorderIcon />}
              </IconButton>
              <IconButton
                variant={isCelebrated ? 'soft' : 'plain'}
                color={isCelebrated ? 'warning' : 'neutral'}
                size="sm"
                onClick={() => setIsCelebrated((prevState) => !prevState)}
              >
                {isCelebrated ? '🎉' : <CelebrationOutlinedIcon />}
              </IconButton>
            </Stack>
          )}
        </Box>
      )}
    </Box>
  );
}
