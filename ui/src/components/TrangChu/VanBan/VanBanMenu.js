import React,{useState} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleIcon from '@material-ui/icons/People';
import SendIcon from '@material-ui/icons/Send';
import DraftsIcon from '@material-ui/icons/Drafts';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

function VanBanMenu(props){
    const classes = useStyles();
    const [open,setOpen] = useState(false);
    return (
      <div>
        <ListItem button onClick={() =>{props.setNumberPage(1)}}>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="Tạo Văn Bản Mới" />
        </ListItem>
        <ListItem button onClick={() =>{props.setNumberPage(2)}}>
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Văn Bản Đến" />
        </ListItem>
        <ListItem button onClick={() =>{props.setNumberPage(3)}}>
          <ListItemIcon>
            <SendIcon />
          </ListItemIcon>
          <ListItemText primary="Văn Bản Gửi Đi" />
        </ListItem>
            <ListItem button onClick={() =>{setOpen(!open)}}>
                <ListItemIcon>
                <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Văn Bản Lưu" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem button className={classes.nested}  onClick={() =>{props.setNumberPage(4)}}>
                        <ListItemText primary="Văn Bản Gửi" />
                    </ListItem>
                    <ListItem button className={classes.nested} onClick={() =>{props.setNumberPage(5)}}>
                        <ListItemText primary="Văn Bản Đến" />
                    </ListItem>
                </List>
            </Collapse>
        <ListItem button button onClick={() =>{props.setNumberPage(8)}}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Nhóm" />
        </ListItem>
      </div>
    )
}

export default VanBanMenu;