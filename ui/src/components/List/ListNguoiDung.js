import React,{useState} from 'react';
import List from '@material-ui/core/List';
import ItemNguoiDung from './ItemList/ItemNguoiDung';

function ListNguoiDung(props){
    const [listNguoiDung] = useState(props.listNguoiDung);
    
    return(
        <List>
            {listNguoiDung.map(item => (
                <ItemNguoiDung 
                    key ={item.id}
                    nguoiDung={item}
                    updateNguoiDungCheck={props.updateNguoiDungCheck}
                />
            ))}
        </List>
    )
}

export default ListNguoiDung;