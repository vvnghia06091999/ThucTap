import React,{useState} from 'react';
import {withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';


const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
    }
}))(TableCell);


function ItemVanBanGui(props){
    const [vanBan] = useState(props.vanBan);
    function click(){
        props.setOpen(true);
        props.setVanBan(vanBan);
        props.setVanBanGui(props.vanBanGui);
        props.getLanhDao(vanBan.idLanhDao);
        props.getLinhVuc(vanBan.idLinhVucVanBan);
        props.getLoaiVanBan(vanBan.idLoaiVanBan);
        props.checkSave(props.vanBanGui.id);
    }
    return(
            <TableRow onClick={() =>{click()}}>
                <StyledTableCell size="small" align="left">{props.index+1}</StyledTableCell>
                <StyledTableCell align="left">{vanBan.trichYeu}</StyledTableCell>
                <StyledTableCell size="small" align="center">{vanBan.soDen}</StyledTableCell>
                <StyledTableCell size="small" align="center">{vanBan.soKyHieu}</StyledTableCell>
                <StyledTableCell align="center">{vanBan.trangThai}</StyledTableCell>
            </TableRow>
    )
}


export default ItemVanBanGui;