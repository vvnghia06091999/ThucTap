import React,{useState} from 'react';
import List from '@material-ui/core/List';
import ItemNguoiDung from './ItemList/ItemNguoiDung';


function ListPhongBan(props){
    const [listCTNhom] = useState(props.listCTNhom);
    const [listNguoiDung] = useState(props.listNguoiDung);

    function getNguoiDung(idNguoiDung){
        return listNguoiDung.find(nguoiDung => nguoiDung.id === idNguoiDung);
    }

   

    return(
            <List>
                {listCTNhom.map(item => (
                    <ItemNguoiDung 
                        key ={item.id}
                        nguoiDung={getNguoiDung(item.idNguoiDung)}
                        updateNguoiDungCheck={props.updateNguoiDungCheck}
                        checkNhom={true}
                    />
                ))}
            </List>
    )
}

export default ListPhongBan;