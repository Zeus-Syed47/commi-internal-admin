import { MessageProps } from "@/types";
import { NotificationsActive, NotificationsNone } from "@mui/icons-material";
import { Box, Chip, Stack } from "@mui/joy";
import { CircularProgress } from "@mui/material";
import { useContext, useMemo } from "react";
import BotWithStatus from "./BotWithStatus";
import AvatarWithStatus from "./AvatarWithStatus";
import ChatBubble from "./ChatBubble";
import { ChatContext } from "@/context/chatContext";



export default function MessagesPaneView() {

    const { conversationViewRef, isConversationLoading,
        conversations, chatRefs,
        currentUser, handleScroll, selectedContact } = useContext(ChatContext);
    const conversationView = useMemo(() => {
        return (
            <Stack 
            // className='chat-stack'
            // sx={{border: '1px solid black'}}
            spacing={2} justifyContent="flex-end" flexDirection={'column-reverse'}>
                {conversations?.map((conversation, index) =>
                    <Box key={`convo-${index}`}>
                        <Box sx={{ display: 'flex', flex: 1, justifyContent: 'center', my: 3 }}>
                            <Chip
                                variant='outlined'
                                color={conversation?.status === 'active' ? 'success' : 'neutral'}
                                startDecorator={conversation?.status === 'active' ? <NotificationsActive /> : <NotificationsNone />}>
                                {`This ticket is ${conversation?.status}`}
                            </Chip>
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            flex: 1,
                            flexDirection: 'column-reverse',
                        }}>
                            {
                                conversation?.messages?.map((message: MessageProps, index: number) => {
                                    const isYou = message?.user_sender_id === currentUser?.id || message?.user_sender || (!message?.user_sender && !message?.contact_sender);
                                    return (
                                        <Stack
                                            key={index}
                                            direction="row"
                                            spacing={2}
                                            flexDirection={isYou ? 'row-reverse' : 'row'}
                                        >
                                            {(!message?.user_sender && !message?.contact_sender) ?
                                                <BotWithStatus />
                                                : (
                                                    <AvatarWithStatus
                                                        online={message?.sender?.online}
                                                        src={message?.sender?.avatar}
                                                    />
                                                )}
                                            <ChatBubble variant={isYou ? 'sent' : 'received'} {...message} />
                                        </Stack>
                                    );
                                })
                            }
                        </Box>
                    </Box>
                )
                }
            </Stack>
        )
    }, [conversations, currentUser]);

    return (
        <Box
        className='chat-box'
            sx={{
                // border: '1px solid black',
                display: 'flex',
                flex: 1,
                minHeight: 0,
                px: 2,
                py: 3,
                overflowY: 'scroll',
                flexDirection: 'column-reverse',
                maxHeight: {
                    sm: 'calc(93.5dvh - var(--Header-height))'
                },
            }}
            ref={(ref) => {
                if (ref) chatRefs.current[selectedContact?.id] = ref;
            }}
            onScroll={() => handleScroll(selectedContact?.id)}
        >
            {conversationView}
            {isConversationLoading &&
                <Box sx={{
                    // mt: 5,
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    // backgroundColor: 'white'
                }}>
                    <CircularProgress />
                </Box>
            }
        </Box>
    )

}