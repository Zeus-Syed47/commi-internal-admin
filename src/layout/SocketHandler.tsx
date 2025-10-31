import { SocketContext } from "@/context/socketContext";
import useStore from "@/store";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function SocketHandler({ children }) {
    const [socket, setSocket] = useState(null);

    const updateConversations = useStore((state) => state?.updateConversations);
    const updateChatContacts = useStore((state) => state?.updateChatContacts);
    const updateBroadcast = useStore((state) => state?.updateBroadcast);
    const currentUser = useStore((state) => state?.currentUser);

    useEffect(() => {
        const newSocket = io(`${process.env.NEXT_PUBLIC_API}`,
            {
                extraHeaders: {
                    Authorization: "Bearer authorization_token_here"
                }
            }); // Connect to the Socket.IO server
        setSocket(newSocket);

        newSocket.on('connect', function () {
            // Connected, let's sign-up for to receive messages for this room
            // admin
            if (currentUser?.type === 'admin' && currentUser?.company?.wabas[0]?.waba_meta_id) {
                newSocket.emit('join_room', currentUser?.company?.wabas[0]?.waba_meta_id);
            }
            //
            // manager or employee
            if (currentUser?.type !== 'admin' && (currentUser?.assigned_phone_number_id || currentUser?.manager?.assigned_phone_number_id)) {
                newSocket.emit('join_room', currentUser?.assigned_phone_number_id || currentUser?.manager?.assigned_phone_number_id);
            }
            //
            if (currentUser?.company?.instagrams?.length > 0
                && currentUser?.company?.instagrams[0]?.insta_user_id
                && currentUser?.company?.instagrams[0]?.insta_professional_account_id
                && (currentUser?.type === 'admin' || (currentUser?.is_instagram_manager || currentUser?.manager?.is_instagram_manager))
            ) {
                newSocket.emit('join_room', currentUser?.company?.instagrams[0]?.insta_professional_account_id);
            }
            if (currentUser?.company?.facebooks?.length > 0
                && currentUser?.company?.facebooks[0]?.commi_fb_page_id
                && (currentUser?.type === 'admin' || (currentUser?.is_facebook_manager || currentUser?.manager?.is_facebook_manager))
            ) {
                newSocket.emit('join_room', currentUser?.company?.facebooks[0]?.commi_fb_page_id);
            }
        });

        // if (WABA_ID) {
        // Listen for incoming messages
        newSocket.on('chat message', (conversation) => {
            console.log('conversation received', conversation)

            if (conversation?.length > 0) {


                // new unread
                if (conversation[0]?.messages?.length) {

                    if (conversation[0]?.messages[0]?.broadcast_id) {
                        updateBroadcast(conversation[0]?.messages[0])
                        return
                    }
                    else {
                        let chatObj: any = {
                            id: conversation[0]?.contact_id,
                            last_message: conversation[0]?.messages[0],
                            last_message_id: conversation[0]?.messages[0]?.id,
                            origin: conversation[0]?.messages[0]?.origin
                        }
                        updateChatContacts({ data: [chatObj], source: 'socket' })
                    }
                }
                updateConversations(conversation)
            }
        });

        return () => {
            newSocket.off('chat message'); // Clean up the event listener
            newSocket.disconnect();
        };
    }, [setSocket, updateConversations, updateChatContacts, updateBroadcast, currentUser]);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};