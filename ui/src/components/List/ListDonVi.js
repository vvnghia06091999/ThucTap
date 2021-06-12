import React,{useState,useEffect} from 'react';
import List from '@material-ui/core/List';
import ItemDonVi from './ItemList/ItemDonVi';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      
      backgroundColor: theme.palette.background.default,
      position: 'relative',
      overflow: 'auto',

    }
}));

function ListDonVi(props){
    const classes = useStyles();
    const [listDonVi] = useState(props.listDonVi);
    const [listPhongBan] = useState(props.listPhongBan);
    const [listNguoiDung] = useState(props.listNguoiDung);

    useEffect(() => {
        console.log(props.listDonVi);
        console.log(props.listPhongBan);
        console.log(props.listNguoiDung);
    });

    /**
     * Hàm tìm danh sách phòng ban theo idDonVi
     * @param {number} idDonVi 
     */
    function findPhongBan(idDonVi) {
        return listPhongBan.filter(phongBan => phongBan.idDonVi === idDonVi);
    }

    return(
        <List className={classes.root}>
            {listDonVi.map((item) => (
                <ItemDonVi 
                    key={item.id}
                    donVi={item}
                    listPhongBan={findPhongBan(item.id)} 
                    listNguoiDung = {listNguoiDung}
                    updateNguoiDungCheck={props.updateNguoiDungCheck}
                />
            ))}
        </List>
    )
}

export default ListDonVi;