import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { produce } from "immer";
import { getContact } from "@/api/contacts";
import { routes } from "@/utils/routes/localRoutes";

const initialState = {
  header: { format: "", str: "" },
  body: "Hello",
  bodyExampleValues: [],
  footer: "",
  button1: "",
  button2: "",
  button3: "",
  templateButtons: [
    {
      type: "PHONE_NUMBER",
      text: "",
      phone_number: "",
      country_code: "",
      url: "",
      url_type: "STATIC",
    },
  ],
  broadcasts: [],
  templateName: "",
  currentUser: {},
  chatContacts: [],
  contacts: [],
  conversations: {},
  selectedContact: {},
  selectedContactForFavoriteEdit: {},

  authToken: "",

  nodeId: "",

  selectedNodeType: "",

  selectedFlow: {},

  selectedTemplate: {},
  userTypeAndManager: {},
  selectedBroadcastHistory: {},
};

const useStore = create(
  persist(
    (set, get) => ({
      ...initialState,
      header: { format: "", str: "" },
      body: "Hello",
      bodyExampleValues: [],
      footer: "",
      button1: "",
      button2: "",
      button3: "",
      templateButtons: [
        {
          type: "PHONE_NUMBER",
          text: "",
          phone_number: "",
          country_code: "",
          url: "",
          url_type: "STATIC",
        },
      ],
      templateName: "",
      waba_id: "380962461770162",

      updateTemplateFields: (data) => set({ [data.key]: data.value }),

      currentUser: {},
      updateCurrentUser: (data) => set({ currentUser: data }),

      contacts: [],
      updateContacts: (data) => set({ contacts: data }),

      chatContacts: [],
      fetchChatContacts: async (data) => {
        let chatContacts = await getContact({ contact_id: data?.id });
        const stateChatContacts = get()?.chatContacts;
        let newChatContact = chatContacts?.data?.data;
        newChatContact = {
          ...newChatContact,
          unread: true, // new contact from socket
        };
        set({
          chatContacts: [...newChatContact, ...stateChatContacts],
        });
      },
      updateChatContacts: async ({ data, source }) => {
        set(
          produce((state) => {
            let chatContacts = state.chatContacts ?? [];
            for (let i = 0; i < data?.length; i++) {
              const contact = data[i];

              // find conversation index
              const existingIndex = chatContacts.findIndex(
                (chat: any) => chat.id === contact.id
              );
              //

              const selectedContact = get().selectedContact;
              const pathname = get().pathname;

              // Default unread state based on source
              let isUnread = false;

              // Logic for socket (partial update)
              if (source === "socket") {
                const isNotCurrentContact = selectedContact?.id !== contact?.id;
                const isCustomerMessage =
                  contact?.last_message?.contact_sender_id;
                const shouldMarkUnread =
                  (pathname === routes.inbox.home &&
                    isNotCurrentContact &&
                    isCustomerMessage) ||
                  pathname !== routes.inbox.home;

                isUnread = shouldMarkUnread;
              } else if (source === "read") {
                isUnread = false; // explicitly mark as read
              }

              if (existingIndex === -1) {
                if (Object.keys(contact)?.length < 5) {
                  // fetch & unshift
                  chatContacts.unshift({
                    ...contact,
                    unread: isUnread, // new contact from socket
                  });
                } else {
                  // push
                  chatContacts.push({
                    ...contact,
                    unread: isUnread, // from api
                  }); // new contact
                }
              } else {
                const existing = chatContacts[existingIndex];
                const updatedContact = {
                  ...existing,
                  ...contact,
                };

                // Set unread flag based on source
                if (source === "socket") {
                  updatedContact.unread = isUnread;
                } else if (source === "read") {
                  updatedContact.unread = false;
                } else {
                  // From API — preserve `true` if already unread
                  updatedContact.unread = existing.unread || false;
                }

                // Bring to top only if new customer message
                const isNewCustomerMessage =
                  (contact?.last_message?.double_tick_status === "sent" ||
                    (contact?.last_message?.origin === "instagram" &&
                      contact?.last_message?.double_tick_status ===
                        "delivered") ||
                    contact?.last_message?.contact_sender_id) &&
                  existingIndex !== 0;

                if (isNewCustomerMessage && source === "socket") {
                  const updatedList = chatContacts
                    .slice(0, existingIndex)
                    .concat(chatContacts.slice(existingIndex + 1));
                  chatContacts = [updatedContact, ...updatedList];
                } else {
                  chatContacts[existingIndex] = updatedContact;
                }
              }
            }

            state.chatContacts = chatContacts;
          })
        );
      },

      conversations: {},
      updateConversations: async (data) => {
        set(
          produce((state) => {
            const contactConversations =
              state.conversations[data[0]?.contact_id] ?? [];

            for (let i = 0; i < data?.length; i++) {
              let conversationIndex = -1;

              // find conversation index
              conversationIndex = contactConversations.findIndex(
                (convo: any) => convo.id === data[i].id
              );
              //
              if (conversationIndex === -1) {
                // push or unshift based on date
                let firstConversationInState = contactConversations[0];
                if (
                  firstConversationInState?.createdAt &&
                  data[i]?.createdAt &&
                  new Date(firstConversationInState?.createdAt) < // TODO: have to test
                    new Date(data[i]?.createdAt)
                ) {
                  contactConversations.unshift({
                    ...data[i],
                    // messages: data[i]?.messages?.reverse(), // reverse messages for first time loading into state
                  }); // new convo
                } else {
                  contactConversations.push({
                    ...data[i],
                    // messages: data[i]?.messages?.reverse(), // reverse messages for first time loading into state
                  }); // old convo
                }

                // contactConversations.push(data[i]);
              } else {
                // check message duplicates
                let stateConversationMessages = [];
                let tempConversation = {
                  ...contactConversations[conversationIndex],
                };
                if (data[i]?.hasOwnProperty("messages")) {
                  stateConversationMessages =
                    contactConversations[conversationIndex]?.messages ?? [];
                  const newConversationMessages = data[i]?.messages ?? []; // length condition

                  for (let j = 0; j < newConversationMessages?.length; j++) {
                    let stateMessageIndex = -1;
                    // find message index
                    for (
                      let k = 0;
                      k < stateConversationMessages?.length;
                      k++
                    ) {
                      if (
                        stateConversationMessages[k].id !== "" &&
                        newConversationMessages[j].id !== "" &&
                        stateConversationMessages[k].id ===
                          newConversationMessages[j].id
                      ) {
                        stateMessageIndex = k;
                        break;
                      }
                    }
                    //
                    if (stateMessageIndex === -1) {
                      // add new message

                      // push or unshift based on date
                      let firstMessageInState = stateConversationMessages[0];
                      if (
                        firstMessageInState?.createdAt &&
                        newConversationMessages[j]?.createdAt &&
                        new Date(firstMessageInState?.createdAt) <
                          new Date(newConversationMessages[j]?.createdAt)
                      ) {
                        stateConversationMessages.unshift(
                          newConversationMessages[j]
                        ); // new message
                      } else {
                        stateConversationMessages.push(
                          newConversationMessages[j]
                        ); // old message
                      }
                    } else {
                      // update read status
                      stateConversationMessages[stateMessageIndex] = {
                        ...stateConversationMessages[stateMessageIndex],
                        ...newConversationMessages[j],
                      };
                    }
                    tempConversation = {
                      ...tempConversation,
                      messages: stateConversationMessages,
                    };
                  }
                }

                // update latest conversation changes here
                let newConvoWithoutMessages = { ...data[i] };
                if (newConvoWithoutMessages?.hasOwnProperty("messages")) {
                  delete newConvoWithoutMessages["messages"];
                }
                tempConversation = {
                  ...tempConversation,
                  ...newConvoWithoutMessages,
                };
                contactConversations[conversationIndex] = tempConversation;
                //
              }
            }

            state.conversations[data[0]?.contact_id] = contactConversations;
          })
        );
      },

      broadcasts: [],
      updateBroadcasts: (data) => set({ broadcasts: data }),
      updateBroadcast: async (data) => {
        set(
          produce((state) => {
            // update broadcasts
            // let broadcasts = state.broadcasts ?? [];
            // if (broadcasts?.length > 0) {
            //   let broadcastIndex = broadcasts?.findIndex(
            //     (broadcast) => broadcast.id === data?.broadcast_id
            //   );
            //   if (broadcastIndex !== -1) {
            //     let broadcastToUpdate = broadcasts[broadcastIndex];
            //     let broadcastMessages = broadcastToUpdate?.messages;

            //     if (broadcastMessages?.length > 0) {
            //       let messageIndex = broadcastMessages?.findIndex(
            //         (m) => m.id === data?.id
            //       );
            //       if (messageIndex != -1) {
            //         broadcastMessages[broadcastIndex] = data;
            //       } else {
            //         broadcastMessages.push(data);
            //       }
            //       broadcastToUpdate.messages = broadcastMessages;
            //     }
            //     broadcasts[broadcastIndex] = broadcastToUpdate;
            //   }
            // }
            // state.broadcasts = broadcasts;
            //

            // update selectedBroadcastHistory as well
            let selectedBroadcastHistory = state.selectedBroadcastHistory ?? {};
            if (selectedBroadcastHistory?.id === data?.broadcast_id) {
              let broadcastHistoryMessages =
                selectedBroadcastHistory?.messages ?? [];

              let historyMessageIndex = broadcastHistoryMessages?.findIndex(
                (m) => m.id === data?.id
              );
              if (historyMessageIndex != -1) {
                broadcastHistoryMessages[historyMessageIndex] = data;
              } else {
                broadcastHistoryMessages.push(data);
              }
              selectedBroadcastHistory.messages = broadcastHistoryMessages;
            }
            state.selectedBroadcastHistory = selectedBroadcastHistory;
            //
          })
        );
      },

      selectedContact: {},
      updateSelectedContact: (data) => set({ selectedContact: data }),

      authToken: "",
      updateAuthToken: (data) => set({ authToken: data }),

      nodeId: "",
      updateNodeId: (data) => set({ nodeId: data }),

      selectedNodeType: "",
      updateSelectedNodeType: (data) => set({ selectedNodeType: data }),

      selectedFlow: {},
      updateSelectedFlow: (data) => set({ selectedFlow: data }),

      selectedKeywordAction: {},
      updateSelectedKeywordAction: (data) =>
        set({ selectedKeywordAction: data }),

      selectedTemplate: {},
      updateSelectedTemplate: (data) => set({ selectedTemplate: data }),

      pathname: {},
      updatePathname: (data) => set({ pathname: data }),

      selectedContactForFavoriteEdit: {},
      updateSelectedContactForFavoriteEdit: (data) =>
        set({ selectedContactForFavoriteEdit: data }),

      selectedContactForEdit: {},
      updateSelectedContactForEdit: (data) =>
        set({ selectedContactForEdit: data }),

      selectedUserForEdit: {},
      updateSelectedUserForEdit: (data) => set({ selectedUserForEdit: data }),

      selectedPromptForEdit: {},
      updateSelectedPromptForEdit: (data)=>set({
        selectedPromptForEdit:data
      }),

      selectedPlan: {},
      updateSelectedPlan: (data) => set({ selectedPlan: data }),

      userTypeAndManager: {},
      updateUserTypeAndManager: (data) => set({ userTypeAndManager: data }),

      selectedCtwForEdit: {},
      updateSelectedCtwForEdit: (data) => set({ selectedCtwForEdit: data }),

      selectedChatbotForEdit: {},
      updateSelectedChatbotForEdit: (data) =>
        set({ selectedChatbotForEdit: data }),

      selectedBroadcastHistory: {},
      updateSelectedBroadcastHistory: (data) =>
        set({ selectedBroadcastHistory: data }),

      platform: "",
      setPlatform: (data) => set({ platform: data }),

      reset: () => set(initialState),
    }),
    {
      name: "whats-business-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useStore;
