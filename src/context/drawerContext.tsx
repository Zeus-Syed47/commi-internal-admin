import { createContext } from "react";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import BookIcon from '@mui/icons-material/Book';
import { Group, Inbox, Light, Wifi } from "@mui/icons-material";
import KeyboardIcon from '@mui/icons-material/Keyboard';
import GroupsIcon from '@mui/icons-material/Groups';

export const DrawerContext = createContext({
  verticalRoutes: [
    {
      text:"Blogs",
      path:"/create-blogs",
      icon: <BookIcon/>,
      selected:true
    },
    {
      text:"Base Prompts",
      path:"/baseprompts",
      icon: <KeyboardIcon/>,
      selected:false
    },
    {
      text: "Clients",
      path: "/clients",
      icon: <GroupsIcon/>,
      selected:false
    }
  ],
});
