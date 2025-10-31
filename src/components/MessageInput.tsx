import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import Textarea from '@mui/joy/Textarea';
import { IconButton, Stack, Tab, tabClasses, TabList, Tabs } from '@mui/joy';

import FormatBoldRoundedIcon from '@mui/icons-material/FormatBoldRounded';
import FormatItalicRoundedIcon from '@mui/icons-material/FormatItalicRounded';
import StrikethroughSRoundedIcon from '@mui/icons-material/StrikethroughSRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { AddCircleOutline, ArrowDropUp, AutoFixHigh, InsertEmoticon, Message } from '@mui/icons-material';
import AutoCorrectMenu from './AutoCorrectMenu';

export type MessageInputProps = {
  textAreaValue: string;
  setTextAreaValue: (value: string) => void;
  setIsInternal: (value: boolean) => void;
  onSubmit: () => void;
  isInternal: boolean;
};

export default function MessageInput(props: MessageInputProps) {
  const { textAreaValue, setTextAreaValue,
    onSubmit, setIsInternal, isInternal,
    getCorrectedText, isCorrectedTextLoading, onTemplateSelected } = props;
  const textAreaRef = React.useRef<HTMLDivElement>(null);

  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    if (isInternal) {
      setTabValue(1);
    }
    else {
      setTabValue(0);
    }
  }, [setTabValue, isInternal])

  const handleClick = () => {
    if (textAreaValue.trim() !== '') {
      onSubmit();
      setTextAreaValue('');
    }
  };
  return (
    <Box sx={{ px: 2, pb: 3 }}>
      <FormControl>
        <Textarea
          placeholder="Type something here…"
          aria-label="Message"
          ref={textAreaRef}
          onChange={(e) => {
            setTextAreaValue(e.target.value);
          }}
          value={textAreaValue}
          minRows={3}
          maxRows={10}
          startDecorator={
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              flexGrow={1}
              sx={{
                // py: 1,
                pr: 1,
                borderBottom: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Tabs defaultValue={tabValue} value={tabValue}
                sx={{ borderBottom: 'transparent' }}
              >
                <TabList
                  disableUnderline
                  tabFlex={1}
                  size="sm"
                  sx={{
                    pl: { xs: 0, md: 4 },
                    justifyContent: 'left',
                    [`&& .${tabClasses.root}`]: {
                      fontWeight: '600',
                      flex: 'initial',
                      color: 'text.tertiary',
                      [`&.${tabClasses.selected}`]: {
                        bgcolor: 'transparent',
                        color: 'text.primary',
                        '&::after': {
                          height: '2px',
                          bgcolor: 'primary.500',
                        },
                      },
                    },
                  }}

                >
                  <Link href={''} onClick={() => {
                    setTabValue(0)
                    setIsInternal(false);
                  }}>
                    <Tab sx={{ borderRadius: '6px 6px 0 0' }} indicatorInset value={0}>
                      Reply
                    </Tab>
                  </Link>
                  <Link href={''} onClick={() => {
                    setTabValue(1)
                    setIsInternal(true);
                  }}>
                    <Tab sx={{ borderRadius: '6px 6px 0 0' }} indicatorInset value={1}>
                      Notes
                    </Tab>
                  </Link>
                </TabList>
              </Tabs>
              <div>
                <IconButton size="sm" variant="plain" color="neutral">
                  <FormatBoldRoundedIcon />
                </IconButton>
                <IconButton size="sm" variant="plain" color="neutral">
                  <FormatItalicRoundedIcon />
                </IconButton>
                <IconButton size="sm" variant="plain" color="neutral">
                  <StrikethroughSRoundedIcon />
                </IconButton>
                <IconButton size="sm" variant="plain" color="neutral">
                  <FormatListBulletedRoundedIcon />
                </IconButton>
              </div>

            </Stack>
          }
          endDecorator={
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              flexGrow={1}
              sx={{
                py: 0.5,
                pr: 1,
                borderTop: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Box sx={{
                display: 'flex',
                flex: 1,
                flexDirection: {
                  xs: 'column',
                  md: 'row'
                },
                justifyContent: {
                  // xs: 'center'
                },
                alignContent: {
                  sm: 'center'
                }

              }}>
                <Box>
                  <IconButton size="sm" variant="plain" color="neutral">
                    <AddCircleOutline />
                  </IconButton>
                  <IconButton size="sm" variant="plain" color="neutral">
                    <InsertEmoticon />
                  </IconButton>
                </Box>
                <AutoCorrectMenu
                  isCorrectedTextLoading={isCorrectedTextLoading}
                  updateSelectedOption={getCorrectedText}
                />
              </Box>
              <Box sx={{
                display: 'flex',
                flex: 1,
                flexDirection: {
                  xs: 'column',
                  md: 'row'
                },
                justifyContent: {
                  sm: 'flex-end',
                  xs: "flex-end"
                },
                alignItems: {
                  xs: 'flex-end'
                },
              }}>
                <Button
                  size="sm"
                  color="primary"
                  sx={{ borderRadius: 'sm', width: 120 }}
                  endDecorator={<Message />}
                  onClick={onTemplateSelected}
                >
                  Template
                </Button>
                <Button
                  size="sm"
                  color="primary"
                  sx={{
                    borderRadius: 'sm',
                    width: 120,
                    ml: {
                      sm: 2,
                      xs: 0
                    },
                    mt: {
                      xs: 1
                    }
                  }}
                  endDecorator={<SendRoundedIcon />}
                  onClick={handleClick}
                >
                  Send
                </Button>
              </Box>
            </Stack>
          }
          onKeyDown={(event) => {
            if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
              handleClick();
            }
          }}
          sx={{
            '& textarea:first-of-type': {
              minHeight: 72,
            },
          }}
        />
      </FormControl>
    </Box>
  );
}
