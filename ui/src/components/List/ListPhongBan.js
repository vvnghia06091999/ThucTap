import React,{useState} from 'react';
import List from '@material-ui/core/List';
import ItemPhongBan from './ItemList/ItemPhongBan';
  

function ListPhongBan(props){
    const [listPhongBan] = useState(props.listPhongBan);
    const [listNguoiDung] = useState(props.listNguoiDung);

    /**
     * Hàm tìm người dùng theo idPhongBan
     * @param {number} idPhongBan 
     */
    function findNguoiDung(idPhongBan){
        return listNguoiDung.filter(nguoiDung => nguoiDung.idPhongBan === idPhongBan);
    }

    return(
            <List>
                {listPhongBan.map((item)=>(
                    <ItemPhongBan 
                        key={item.id}
                        phongBan={item}
                        listNguoiDung={findNguoiDung(item.id)}
                        updateNguoiDungCheck={props.updateNguoiDungCheck}
                    />
                ))}
            </List>
    )
}

export default ListPhongBan;