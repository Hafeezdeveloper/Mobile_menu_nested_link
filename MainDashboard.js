import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ClassIcon from '@mui/icons-material/Class';
import SchoolIcon from '@mui/icons-material/School';
import MailIcon from '@mui/icons-material/Mail';
import { Route, Routes, useNavigate, Link } from 'react-router-dom';
import Dashboards from '../Pages/Dashboard';
import Collapse from '@mui/material/Collapse';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import Task from '../Pages/Task';
import { getUserCookire } from '../Api/BaseMethod';
import { SupervisorAccount } from '@mui/icons-material';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));



export default function MainDashboard() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const navig = useNavigate()
  const clkBtn = (e) => {
    navig(`${e}`)
  }


  let nav = [
    {
      name: "Dashboard",
      key: ""
    },
    {
      name: "Projects",
      key: "projects",
      navsubName: {
        subName: "Porject Details",
        subNamekey: "task"
      }
    },
    {
      name: "Task",
      key: "task"
    },
    {
      name: "Class Details",
      key: "classDetails",

    },
    {
      name: "Student Details",
      key: "studentDetails",
      navsubName: {
        subName: "sub details",
        key: "project"
      }
    },
  ]

  // let nav2 = [
  //   {
  //     subName: "Clasxxss Add",
  //     key: "classAdd"
  //   },
  //   {
  //     subName: "Student Add",
  //     key: "studentAdd"
  //   },
  // ]


  const [openItems, setOpenItems] = React.useState(new Array(nav.length).fill(false));

  const handleClick = (index) => {
    const updatedOpenItems = [...openItems];
    updatedOpenItems[index] = !updatedOpenItems[index];
    setOpenItems(updatedOpenItems);
  };



  const User = () => {
    getUserCookire("/api/auth/users")
      .then((suc) => {
        console.log("data found",)
        if (!suc.data?.data?._id) {
          navig("/")
        } else {
          navig("/dashboard")
        }
        console.log(suc.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  React.useEffect(() => {
    User()
  }, [])



  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Pakistan Virtual Internship Program
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />


        <List>
  {nav.map((text, i) => {
    return (
      <React.Fragment key={i}>
        <ListItemButton onClick={() => handleClick(i)}>
          <ListItem onClick={() => console.log(text.name)} key={text.name} disablePadding>
            {text.navsubName ?
              <>
                <ListItemText  primary={text.navsubName.subName} />
                {openItems[i] ? <ExpandLess /> : <ExpandMore />}
              </>
              :
              <>
                <ListItemText  primary={text.name} />
              </>
            }
          </ListItem>
        </ListItemButton>
        {text.navsubName && openItems[i] && (
          <Collapse in={openItems[i]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem>
                {/* <ListItemText onClick={(e) => console.log("awd")} primary={text.navsubName.subName} /> */}
                <Link to={`dashboard/${text.navsubName.subNamekey}`} >{text.navsubName.subName} </Link> 
              </ListItem>
            </List>
          </Collapse>
        )}
      </React.Fragment>
    );
  })}
</List>

      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Routes>
          <Route path='/dash' element={<Dashboards />} />
          <Route path='task' element={<Task />} />
          {/* <Route path='/' element={<Dashboards />} /> */}
        </Routes>
      </Main>
    </Box>
  );
}