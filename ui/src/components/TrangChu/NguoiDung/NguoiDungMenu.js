import React,{useState} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

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

function NguoiDungMenu(props){
    const classes = useStyles();
    const [open , setOpen] = useState(false);
    return (
        <div>
            <ListSubheader inset>Thông tin</ListSubheader>
            <ListItem button onClick={() =>{setOpen(!open);props.setOpen(true);}}>
                <ListItemIcon>
                    <AccountBoxIcon />
                </ListItemIcon>
                <ListItemText primary="Thông tin cá nhân" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem button className={classes.nested} onClick={() =>{props.setNumberPage(6)}}>
                        <ListItemText primary="Cập nhật thông tin" />
                    </ListItem>
                    <ListItem button className={classes.nested} onClick={() =>{props.setNumberPage(7)}}>
                        <ListItemText primary="Đổi mật khẩu" />
                    </ListItem>
                </List>
            </Collapse>
            <ListItem button onClick={() =>{props.setLogout(true);localStorage.clear();}}>
                <ListItemIcon>
                <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary="Đăng Xuất" />
            </ListItem>
        </div>
    )
}

export default NguoiDungMenu;