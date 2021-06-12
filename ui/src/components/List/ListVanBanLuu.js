import React from 'react';
import TableBody from '@material-ui/core/TableBody';
import ItemVanBanLuu from './ItemList/ItemVanBanLuu';

function ListVanBanLuu(props){
    return (
        <TableBody>
            {props.listVanBanLuu.map(((item,index)=>(
                props.listVanBanGui.map((vanBanGui)=>{
                    if(vanBanGui.id === item.idVanBanGuiNhan){
                        return(
                            <ItemVanBanLuu
                                vanBanLuu={item}
                                index = {index}
                                vanBanGui={vanBanGui}
                                listVanBan={props.listVanBan}
                            />
                        )
                    }
                })
            )))}
        </TableBody>
    )
}

export default ListVanBanLuu;