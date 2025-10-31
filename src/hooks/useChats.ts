"use client";
import {
  getConversation,
  getConversations,
  updateConversation,
} from "../api/conversations";
import { getContact, getContacts, updateContact } from "@/api/contacts";
import useStore from "@/store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { v4 } from "uuid";
import { sendInternalMessage, sendMessage } from "@/api/messages";
import { usePathname, useRouter } from "next/navigation";
import { routes } from "@/utils/routes/localRoutes";
import { findUsersOfCompany } from "@/api/users";
import { checkTimeAndProgress } from "@/utils/format/progressBarCondition";
import _ from "lodash";
import { getCompanyAttributes } from "@/api/attributes";

export function useChats(props) {
  const { hold } = props ?? {};

  const pathname = usePathname();
  const inputRef = useRef();
  const inputFilterRef = useRef();
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState();
  const [openDrawer, setOpenDrawer] = useState(false);
  const initialLimit = 15;
  const initialConversationLimit = 6;
  const [totalConversations, setTotalConversations] = useState(0);
  const [conversationLimit, setConversationLimit] = useState(6);
  const [limit, setLimit] = useState(15);
  const [offset, setOffset] = useState(1);
  const [search, setSearch] = useState("");
  const [searchKey, setSearchKey] = useState({ value: "name", label: "Name" });
  const [currentPage, setCurrentPage] = useState(1);
  const defaultFilterValue = {
    attribute: null,
    value: "",
    condition: { label: "Equals", value: "=" },
  };
  const [chatFilter, setChatFilter] = useState({
    label: "All Chats",
    value: "all_chats",
  });
  const filterConditions = [
    { label: "Equals", value: "=" },
    { label: "Contains", value: "contains" },
    { label: "Not Contain", value: "not_contains" },
  ];

  const [open, setOpen] = useState(false);

  const [filters, setFilters] = useState([defaultFilterValue]);
  const [filterInputs, setFilterInputs] = useState([{ value: "" }]);

  const currentUser = useStore((state) => state?.currentUser);
  const conversations = useStore((state) => state?.conversations);
  const selectedContact = useStore((state) => state?.selectedContact);
  const updateChatContacts = useStore((state) => state?.updateChatContacts);
  const updateConversations = useStore((state) => state?.updateConversations);
  const updateSelectedContact = useStore(
    (state) => state?.updateSelectedContact
  );
  const chatContacts = useStore((state) => state?.chatContacts);
  const updateSelectedContactForEdit = useStore(
    (state) => state?.updateSelectedContactForEdit
  );

  const selectedContactForFavoriteEdit = useStore(
    (state) => state?.selectedContactForFavoriteEdit
  );
  const updateSelectedContactForFavoriteEdit = useStore(
    (state) => state?.updateSelectedContactForFavoriteEdit
  );

  const conversationViewRef = useRef(null);
  const contactsViewRef = useRef(null);

  const [scrollPositions, setScrollPositions] = useState({}); // Store scroll positions
  const chatRefs = useRef({}); // Refs for each chat container

  useEffect(() => {
    // Restore the scroll position when activeChat changes
    if (selectedContact && chatRefs.current[selectedContact?.id]) {
      const scrollTop = scrollPositions[selectedContact?.id] || 0;
      chatRefs.current[selectedContact?.id].scrollTop = scrollTop;
    }
  }, [selectedContact?.id, chatRefs, scrollPositions]);

  const debouncedHandleScroll = useCallback(
    (chatId) => {
      if (chatRefs.current[chatId]) {
        const scrollTop = chatRefs.current[chatId].scrollTop;
        setScrollPositions((prev) => ({
          ...prev,
          [chatId]: scrollTop,
        }));
      }
    },
    [chatRefs, setScrollPositions]
  );

  const handleScroll = _.debounce(debouncedHandleScroll, 200);

  const { isPending: isAttributesLoading, data: attributes } = useQuery({
    queryKey: ["getCompanyAttributes"],
    queryFn: () => {
      return getCompanyAttributes({
        company_id: currentUser?.company_id,
      });
    },
    enabled: open,
  });

  const isFilterApplied = useMemo(
    () =>
      filters?.some(
        (filter) =>
          Object.keys(filter?.attribute ?? {})?.length > 0 &&
          filter?.value &&
          Object.keys(filter?.condition ?? {})?.length > 0
      ),
    [filters]
  );

  const {
    data: contacts,
    isLoading,
    refetch: fetchExtraContact,
  } = useQuery({
    queryKey: [
      "contacts",
      search,
      chatFilter?.value,
      filters,
      currentPage,
      limit,
    ],
    queryFn: () => {
      let paramObj: any = {
        forChats: true,
        limit: limit,
        offset: currentPage,
        // searchKey: searchKey?.value,
        fields: [
          "id",
          "name",
          "origin",
          "double_tick_status",
          "company_id",
          "waba_meta_id",
          "contact_fb_page_id",
          "contact_insta_user_id",
          "phone_number",
          "country_code",
          "last_message_id",
          "is_favorite",
          "createdAt",
          "last_message_date",
          "company_name",
          "unread",
        ],
      };

      if (
        currentUser?.company?.instagrams?.length &&
        currentUser?.company?.instagrams[0]?.insta_professional_account_id &&
        (currentUser?.type === "admin" ||
          currentUser?.is_instagram_manager ||
          currentUser?.manager?.is_instagram_manager)
      ) {
        paramObj.commi_insta_user_id =
          currentUser?.company?.instagrams[0]?.insta_professional_account_id;
      }
      if (
        currentUser?.company?.facebooks?.length &&
        currentUser?.company?.facebooks[0]?.commi_fb_page_id &&
        (currentUser?.type === "admin" ||
          currentUser?.is_facebook_manager ||
          currentUser?.manager?.is_facebook_manager)
      ) {
        paramObj.commi_fb_page_id =
          currentUser?.company?.facebooks[0]?.commi_fb_page_id;
      }
      if (
        currentUser?.type === "admin" &&
        currentUser?.company?.wabas?.length &&
        currentUser?.company?.wabas[0]?.waba_meta_id
      ) {
        paramObj.waba_meta_id = currentUser?.company?.wabas[0]?.waba_meta_id;
      }

      if (
        currentUser?.type !== "admin" &&
        (currentUser?.assigned_phone_number_id ||
          currentUser?.manager?.assigned_phone_number_id)
      ) {
        paramObj.phone_number_id =
          currentUser?.assigned_phone_number_id ||
          currentUser?.manager?.assigned_phone_number_id;
      }

      if (search) {
        paramObj.search = search;
      } else if (
        Object.keys(chatFilter ?? {})?.length > 0 &&
        chatFilter?.value !== "all_chats"
      ) {
        if (
          chatFilter?.value === "open" ||
          chatFilter?.value === "pending" ||
          chatFilter?.value === "solved" ||
          chatFilter?.value === "expired" ||
          chatFilter?.value === "blocked"
        ) {
          paramObj.filter = {
            ticket_status: chatFilter.value,
          };
        } else if (chatFilter?.value === "unassigned") {
          paramObj.filter = {
            assigned_to: "NULL",
          };
        } else if (chatFilter?.value === "assigned_to_me") {
          paramObj.filter = {
            assigned_to: currentUser?.id,
          };
        } else if (chatFilter?.value === "is_favorite") {
          paramObj.filter = {
            is_favorite: true,
          };
        }
      } else if (isFilterApplied) {
        paramObj.filter = filters?.map((filter) => {
          if (
            Object.keys(filter?.attribute ?? {})?.length > 0 &&
            filter?.value &&
            Object.keys(filter?.condition ?? {})?.length > 0
          ) {
            return {
              attribute_id: filter?.attribute?.id,
              value: filter.value,
              condition: filter?.condition?.value,
            };
          }
        });
      }
      return getContacts(paramObj);
    },
    enabled: !hold,
  });

  const unreadCount = useMemo(
    () => chatContacts?.filter((chat) => chat?.unread)?.length,
    [chatContacts]
  );

  const chats = useMemo(
    () =>
      search || isFilterApplied || chatFilter?.value !== "all_chats"
        ? contacts?.data?.rows
        : chatContacts,
    [
      chatContacts,
      contacts?.data?.rows,
      search,
      chatFilter?.value,
      isFilterApplied,
    ]
  );

  const contactConversations = useMemo(
    () => conversations[selectedContact?.id],
    [conversations, selectedContact?.id]
  );

  const conversationProgress = useMemo(() => {
    let tempConvos = conversations[selectedContact?.id];
    const latestConversation = tempConvos?.length ? tempConvos[0] : {};
    let result = {};
    if (latestConversation?.createdAt) {
      result = checkTimeAndProgress(latestConversation?.createdAt);
    }
    return {
      ...result,
      id: latestConversation?.id,
      ticket_status: latestConversation?.ticket_status,
      status: latestConversation?.status,
      assigned_to: latestConversation?.assigned_to,
    };
  }, [conversations, selectedContact]);

  const { data: companyUsers, isLoading: isCompanyUsersLoading } = useQuery({
    queryKey: ["companyUsers"],
    queryFn: () => {
      return findUsersOfCompany({
        company_id: currentUser?.company_id,
      });
    },
    enabled:
      conversationProgress?.status === "active" &&
      !conversationProgress?.is24HoursPassed,
  });

  const handleSearch = (value) => {
    // reset filter
    // if (Object.keys(filter?.attribute ?? {})?.length > 0 &&
    //     filter?.value &&
    //     Object.keys(filter?.condition ?? {})?.length > 0) {
    //     setFilter(defaultFilterValue)
    //     let inputSelector = inputFilterRef.current?.querySelector('input');
    //     inputSelector.value = ''
    // }
    //
    setSearch(value);
  };

  const debouncedSearch = _.debounce(handleSearch, 300);

  const { mutate: fetchConversation, isPending: isConversationLoading } =
    useMutation({
      mutationKey: ["getConversations"],
      mutationFn: (data) => {
        let params = {
          limit: conversationLimit,
          offset: 1,
        };
        return getConversations({ ...params, ...data });
      },
      onSuccess: (data) => {
        if (data.data?.rows?.length > 0) {
          updateConversations(data.data?.rows);
          setTotalConversations(data.data?.totalRows);
        }
      },
    });

  const { mutate: fetchSingleConversation } = useMutation({
    mutationKey: ["getConversations"],
    mutationFn: getConversation,
    onSuccess: (data) => {
      if (data.data) {
        updateConversations([data.data]);
      }
    },
  });

  const { mutate: updateConversationApi } = useMutation({
    mutationKey: ["updateConversation"],
    mutationFn: updateConversation,
    onSuccess: (data) => {
      if (data) {
        fetchSingleConversation({
          conversation_id: conversationProgress.id,
        });
      }
    },
  });

  const { mutate: getContactApi } = useMutation({
    mutationKey: ["contact"],
    mutationFn: getContact,
    onSuccess(data, variables, context) {
      if (data) {
        if (data?.data?.id === selectedContact.id) {
          updateSelectedContact(data?.data);
        }
        if (data?.data && Object.keys(data?.data)?.length > 0) {
          updateChatContacts({ data: [data.data], source: "api" });
        }
      }
    },
  });

  const { mutate: updateContactHandlerApi, isPending: isContactUpdating } =
    useMutation({
      mutationKey: ["updateContact"],
      mutationFn: updateContact,
      onSuccess(data, variables, context) {
        if (Object.keys(selectedContactForFavoriteEdit)?.length > 0) {
          getContactApi({
            contact_id: selectedContactForFavoriteEdit,
          });
        }
      },
    });

  const { mutate: sendBroadcastApi, isPending: isBroadcastSending } =
    useMutation({
      mutationKey: ["sendMessage"],
      mutationFn: sendMessage,
      onSuccess(data, variables, context) {
        if (data) {
          setSelectedTemplate();
          setOpenDrawer(false);
        }
      },
    });

  const {
    mutate: sendInternalMessageApi,
    isPending: isInternalMessageSending,
  } = useMutation({
    mutationKey: ["sendInternalMessage"],
    mutationFn: sendInternalMessage,
    onSuccess(data, variables, context) {
      if (data.data?.length > 0) {
        let conversation = data.data;
        updateConversations(conversation);

        if (conversation[0]?.messages?.length > 0) {
          updateChatContacts({
            data: [
              {
                id: conversation[0]?.contact_id,
                last_message_id: conversation[0]?.messages[0]?.id,
                last_message: conversation[0]?.messages,
              },
            ],
            source: "api",
          });
        }
      }
    },
  });

  const fetchConversationHandler = useCallback(
    (contacts) => {
      if (contacts.origin === "instagram") {
        if (currentUser?.company?.instagrams?.length > 0) {
          fetchConversation({
            commi_insta_user_id:
              currentUser?.company?.instagrams[0]
                ?.insta_professional_account_id,
            contact_id: contacts?.id,
          });
        }
      } else if (contacts.origin === "page") {
        fetchConversation({
          commi_fb_page_id:
            currentUser?.company?.facebooks[0]?.commi_fb_page_id,
          contact_id: contacts?.id,
        });
      } else {
        // if (currentUser?.company?.wabas?.length > 0) {
        fetchConversation({
          waba_id: currentUser?.company?.wabas[0]?.waba_meta_id,
          // waba_id: 380962461770162,
          contact_id: contacts?.id,
        });
        // }
      }
    },
    [fetchConversation, currentUser]
  );

  useEffect(() => {
    if (contacts?.data?.rows?.length > 0) {
      updateSelectedContact(contacts?.data?.rows[0]);
      fetchConversationHandler(contacts?.data?.rows[0]);
      if (search || isFilterApplied || chatFilter?.value !== "all_chats") {
        // do nothing
      } else {
        updateChatContacts({ data: contacts?.data?.rows, source: "api" });
      }
    }
  }, [
    contacts?.data?.rows,
    updateChatContacts,
    updateSelectedContact,
    search,
    isFilterApplied,
    chatFilter?.value,
    fetchConversationHandler,
    updateContactHandlerApi,
    updateChatContacts,
  ]);

  // update selected chat unread

  useEffect(() => {
    if (
      Object.keys(selectedContact)?.length > 0 &&
      selectedContact?.unread &&
      pathname === routes.inbox.home
    ) {
      updateChatContacts({ data: [selectedContact], source: "read" });
      updateContactHandlerApi({
        data: {
          read: true,
        },
        contact_id: selectedContact?.id,
      });
    }
  }, [selectedContact, pathname, routes, updateContactHandlerApi]);

  //

  // send a single broadcast message
  const sendBroadCastMessageHandler = useCallback(
    (selectedTemplate, type, isInternal = false) => {
      let tempObj: any = {
        origin:
          selectedContact?.origin === "instagram"
            ? "instagram"
            : selectedContact?.origin === "page"
            ? "page"
            : "whatsapp_business_account",
        contact_id: selectedContact?.id,
        user_sender_id: currentUser?.id,
        phone: selectedContact?.phone_number,
        type,
        isInternal,
      };
      if (selectedContact?.origin === "instagram") {
        tempObj.contact_insta_user_id = selectedContact?.contact_insta_user_id;
        tempObj.commi_insta_user_id =
          currentUser?.company?.instagrams[0].insta_professional_account_id;
      } else if (selectedContact?.origin === "page") {
        tempObj.contact_fb_page_id = selectedContact?.contact_fb_page_id;
        tempObj.commi_fb_page_id =
          currentUser?.company?.facebooks[0].commi_fb_page_id;
      } else {
        tempObj.waba_id = currentUser?.company?.wabas[0]?.waba_meta_id;
        tempObj.phone_number_id =
          currentUser?.company?.wabas[0]?.businessnumbers[0]?.business_phone_id;
      }
      if (type == "template") {
        tempObj.template_id = selectedTemplate?.id;
        tempObj.data = {
          template_name: selectedTemplate?.name,
          template_components: selectedTemplate?.components,
        };
      }

      if (type == "text") {
        tempObj.data = {
          text: selectedTemplate,
        };
      }

      let tempConversation = conversations[selectedContact?.id] ?? [];
      const latestConversation = tempConversation?.length
        ? tempConversation[0]
        : {};

      let temporary_conversation_id;
      let temporary_message_id;
      if (latestConversation?.status === "active") {
        tempObj.conversation_id = latestConversation?.id;
        temporary_message_id = v4(); // temporary UUID,
        tempObj.temporary_message_id = temporary_message_id;
      } else {
        temporary_conversation_id = v4(); // temporary UUID,
        temporary_message_id = v4(); // temporary UUID,
        tempObj.temporary_message_id = temporary_message_id;
        tempObj.temporary_conversation_id = temporary_conversation_id;
      }

      // push new message to store
      let prepareObjToPushStore: any = {
        createdAt: new Date(),
      };

      if (latestConversation?.status === "active") {
        prepareObjToPushStore = latestConversation;
      } else {
        prepareObjToPushStore.contact_id = selectedContact?.id;
        prepareObjToPushStore.id = temporary_conversation_id;
      }

      let prepareMessageObjToPushStore: any = {
        createdAt: new Date(),
        user_sender: {
          name: "You",
        },
        double_tick_status: "sending",
        id: temporary_message_id,
        type,
      };

      if (type == "template") {
        prepareMessageObjToPushStore.data = {
          template_name: selectedTemplate?.name,
          template_components: selectedTemplate?.components,
        };
      }

      if (type == "text") {
        prepareMessageObjToPushStore.data = {
          text: selectedTemplate,
        };
      }

      prepareObjToPushStore = {
        ...prepareObjToPushStore,
        messages: [prepareMessageObjToPushStore],
      };
      //

      updateConversations([prepareObjToPushStore]);
      //

      if (isInternal) {
        sendInternalMessageApi({ broadcast: tempObj });
      } else {
        sendBroadcastApi({ broadcast: tempObj });
      }
    },
    [
      selectedContact,
      conversations,
      currentUser?.id,
      updateConversations,
      sendInternalMessageApi,
      sendBroadcastApi,
    ]
  );
  //

  const viewProfileClick = useCallback(() => {
    updateSelectedContactForEdit(selectedContact);
    router.push(routes.contacts.create);
  }, [updateSelectedContactForEdit, router, selectedContact]);

  const updateContactApi = useCallback(
    (params) => {
      updateSelectedContactForFavoriteEdit(params?.contact_id);
      updateContactHandlerApi({
        data: params.data,
        contact_id: params?.contact_id,
      });
    },
    [updateContactHandlerApi, updateSelectedContactForFavoriteEdit]
  );

  const onFilterChange = useCallback(
    (data) => {
      //reset search
      if (search) {
        setSearch("");
        // let inputSelector = inputRef.current?.querySelector('input');
        // inputSelector.value = '';
      }
      //
      let tempFilters = [...filters];
      let exampleValue: any = { ...tempFilters[data.index] };
      exampleValue[data.key] = data.value;
      tempFilters[data.index] = exampleValue;
      setFilters(tempFilters);
    },
    [setFilters, search, filters]
  );

  const onFilterInputChange = useCallback(
    (data) => {
      //reset search
      if (search) {
        setSearch("");
        // let inputSelector = inputRef.current?.querySelector('input');
        // inputSelector.value = '';
      }
      //

      const tempFilters = [...filterInputs];
      let exampleValue: any = { ...tempFilters[data.index] };
      exampleValue[data.key] = data.value;
      tempFilters[data.index] = exampleValue;
      setFilterInputs(tempFilters);
    },
    [setFilterInputs, search, filters, filterInputs]
  );

  const debouncedFilterSearch = _.debounce(onFilterChange, 300);

  const removeAttributeButtonHandler = useCallback(
    (index) => {
      const tempFilters = [...filters];
      tempFilters.splice(index, 1);
      setFilters(tempFilters);
    },
    [filters, setFilters]
  );

  const addAttributeButtonHandler = useCallback(() => {
    const tempFilters: any = [...filters];
    tempFilters.push(defaultFilterValue);
    setFilters(tempFilters);
  }, [setFilters, filters]);

  const updateSelectedContactHandler = useCallback(
    (chat: any) => {
      if (
        (chat.origin === "instagram" && !chat.insta_user_name) ||
        (chat.origin === "page" && !chat.name) ||
        Object.keys(chat)?.length < 6
      ) {
        getContactApi({
          contact_id: chat.id,
        });
      }
      updateSelectedContact(chat);
    },
    [getContactApi, updateSelectedContact]
  );

  useEffect(() => {
    if (conversationLimit > initialConversationLimit) {
      fetchConversationHandler(selectedContact);
    }
  }, [conversationLimit, selectedContact]);

  useEffect(() => {
    const stack = chatRefs.current[selectedContact?.id];

    let isScrolling;

    const handleScroll = () => {
      if (!stack) return;

      // Clear the previous timeout
      clearTimeout(isScrolling);

      // Set a timeout to detect scroll end
      isScrolling = setTimeout(() => {
        const scrollTop = stack.scrollTop;
        const scrollHeight = stack.scrollHeight;
        const clientHeight = stack.clientHeight;
        console.log("test 1", scrollTop, scrollHeight, clientHeight);

        if (scrollTop === 0) {
          // console.log("You reached the bottom of the stack.");
        } else if (Math.abs(scrollTop) + clientHeight >= scrollHeight) {
          // console.log("You reached the top of the stack.");
          if (
            contactConversations?.length + initialConversationLimit >=
            totalConversations
          ) {
            setConversationLimit(totalConversations);
          } else {
            setConversationLimit(
              contactConversations?.length + initialConversationLimit
            );
          }
        } else {
          // console.log("middle");
        }
      }, 200); // Adjust debounce time as needed
    };

    // Attach the scroll event to the stack element
    stack?.addEventListener("scroll", handleScroll);

    return () => {
      stack?.removeEventListener("scroll", handleScroll);
    };
  }, [chatRefs, selectedContact?.id, contactConversations, setConversationLimit, totalConversations]);

  useEffect(() => {
  const handleScroll = () => {
    const stack = contactsViewRef.current;
    if (!stack) return;

    const { scrollTop, scrollHeight, clientHeight } = stack;
    const buffer = 20;

    if (scrollTop + clientHeight >= scrollHeight - buffer) {
      let chats =
        search || isFilterApplied || chatFilter?.value !== "all_chats"
          ? contacts?.data?.rows
          : chatContacts;

      const newLimit =
        chats?.length + initialLimit >= contacts?.data?.totalRows
          ? contacts?.data?.totalRows
          : chats?.length + initialLimit;

      if (newLimit > limit) {
        setLimit(newLimit);
        fetchExtraContact();
      }
    }
  };

  const stack = contactsViewRef.current;
  stack?.addEventListener("scroll", handleScroll);

  return () => stack?.removeEventListener("scroll", handleScroll);
}, [contactsViewRef, contacts?.data, chatContacts, search, isFilterApplied, chatFilter?.value, limit, fetchExtraContact]);


  return {
    isLoading: isLoading,
    fetchConversation,
    sendBroadCastMessageHandler,
    isBroadcastSending,
    selectedTemplate,
    setSelectedTemplate,
    openDrawer,
    setOpenDrawer,
    viewProfileClick,
    updateConversationApi,
    companyUsers: companyUsers?.data?.rows ?? [],
    conversationProgress,
    debouncedSearch,
    chats: chats,
    unreadCount,
    conversations: conversations[selectedContact?.id] ?? [],
    selectedContact,
    chatFilter,
    setChatFilter,
    updateContactApi,
    isContactUpdating,
    filterConditions,
    attributes: attributes?.data ?? [],
    debouncedFilterSearch,
    onFilterChange,
    inputRef,
    inputFilterRef,
    filters,
    open,
    setOpen,
    removeAttributeButtonHandler,
    addAttributeButtonHandler,
    currentUser,
    updateSelectedContactHandler,
    conversationViewRef,
    contactsViewRef,
    isConversationLoading,
    handleScroll,
    chatRefs,
    filterInputs,
    onFilterInputChange,
    updateContactHandlerApi,
  };
}
