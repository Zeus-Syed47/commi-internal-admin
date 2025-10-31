'use client'

import * as React from 'react';
import MyMessages from '../../components/MyMessages';
import { useChats } from '@/hooks/useChats';
import { ChatContext } from '@/context/chatContext';


export default function Users() {

  const { isLoading,
    fetchConversation, sendBroadCastMessageHandler, isBroadcastSending, selectedTemplate, setSelectedTemplate,
    openDrawer, setOpenDrawer, viewProfileClick, updateConversationApi, companyUsers, conversationProgress,
    debouncedSearch, chats, unreadCount, conversations, selectedContact, chatFilter,
    setChatFilter, updateContactApi, isContactUpdating, filterConditions, attributes,
    debouncedFilterSearch,
    onFilterChange, inputRef,
    inputFilterRef, filters, open, setOpen, removeAttributeButtonHandler,
    addAttributeButtonHandler, currentUser, updateSelectedContactHandler,
    conversationViewRef, contactsViewRef, isConversationLoading,
    handleScroll, chatRefs, onFilterInputChange, filterInputs, updateContactHandlerApi
  } = useChats();


  return (
    <ChatContext.Provider value={{
      conversations: conversations, chats: chats, isLoading: isLoading,
      fetchConversation, sendBroadCastMessageHandler, isBroadcastSending, selectedTemplate, setSelectedTemplate, openDrawer, setOpenDrawer,
      selectedContact, unreadCount, viewProfileClick, updateConversationApi, companyUsers, conversationProgress, debouncedSearch,
      chatFilter,
      setChatFilter, updateContactApi, isContactUpdating,
      filterConditions, attributes,
      debouncedFilterSearch,
      onFilterChange,
      inputRef,
      inputFilterRef, filters, open, setOpen,
      removeAttributeButtonHandler,
      addAttributeButtonHandler, currentUser, updateSelectedContactHandler,
      conversationViewRef, contactsViewRef, isConversationLoading,
      handleScroll, chatRefs, onFilterInputChange, filterInputs,
      updateContactHandlerApi
    }}>
      <MyMessages />
    </ChatContext.Provider>
  );
}