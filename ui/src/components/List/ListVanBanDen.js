import React from 'react';
import TableBody from '@material-ui/core/TableBody';
import ItemVanBan from './ItemList/ItemVanBanDen';

function ListVanBanDen(props){
    return (
        <TableBody>
            {props.listVanBanDen.map(((item,index)=>(
                props.listVanBan.map((vanBan) =>{
                    if(vanBan.id === item.idVanBan){
                        return(
                            <ItemVanBan
                                index={index}
                                vanBan={vanBan}
                                setOpen={props.setOpen}
                                setVanBan={props.setVanBan}
                                vanBanGui = {item}
                                setVanBanGui={props.setVanBanGui}
                                getLanhDao={props.getLanhDao}
                                getLinhVuc={props.getLinhVuc}
                                getLoaiVanBan={props.getLoaiVanBan}
                                checkSave={props.checkSave}
                            />
                        )
                    }
                })
            )))}
        </TableBody>
    )
}

export default ListVanBanDen;