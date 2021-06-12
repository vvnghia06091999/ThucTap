import React,{useState,useEffect} from 'react';
import {withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
    }
}))(TableCell);

function ItemVanBanLuu(props){
    const [vanBanLuu] = useState(props.vanBanLuu);
    const [trichYeu,setTrichYeu] = useState("");
    const [soKyHieu,setSoKyHieu] = useState("");

    useEffect(() => {
        props.listVanBan.map((item)=>{
            if(item.id === props.vanBanGui.idVanBan){
                setTrichYeu(item.trichYeu);
                setSoKyHieu(item.soKyHieu);
            }
        });
    },[])

    return (
        <TableRow>
            <StyledTableCell size="small" align="left">{props.index+1}</StyledTableCell>
            <StyledTableCell align="left">{vanBanLuu.ghiChu}</StyledTableCell>
            <StyledTableCell align="center">{trichYeu}</StyledTableCell>
            <StyledTableCell size="small" align="center">{soKyHieu}</StyledTableCell>
        </TableRow>
    )
}

export default ItemVanBanLuu;