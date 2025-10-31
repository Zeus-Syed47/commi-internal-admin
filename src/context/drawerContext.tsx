import { createContext } from "react";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import BookIcon from '@mui/icons-material/Book';
import { Inbox, Light, Wifi } from "@mui/icons-material";
import KeyboardIcon from '@mui/icons-material/Keyboard';

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
    }
  ],
});
