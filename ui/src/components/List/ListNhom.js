import React,{useState} from 'react';
import List from '@material-ui/core/List';
import ItemNhom from './ItemList/ItemNhom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      
      backgroundColor: theme.palette.background.default,
      position: 'relative',
      overflow: 'auto',

    }
}));

function ListNhom(props){
    const classes = useStyles();
    const [listNhom] = useState(props.listNhom);
    const [listCTNhom] = useState(props.listCTNhom);

    function getCTNhom(idNhom){
        return listCTNhom.filter(ctNhom => ctNhom.idNhom === idNhom);
    }

    return(
        <List className={classes.root}>
            {listNhom.map((item) => (
                <ItemNhom 
                    nhom={item}
                    listCTNhom={getCTNhom(item.id)}
                    listNguoiDung = {props.listNguoiDung}
                    updateNguoiDungCheck={props.updateNguoiDungCheck}
                    setListNguoiDung={props.setListNguoiDung}
                />
            ))}
        </List>
    )
}

export default ListNhom;