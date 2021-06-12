import React,{useState,useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {withStyles } from '@material-ui/core/styles';
import ListVanBanLuu from '../../List/ListVanBanLuu';

const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
        color: theme.palette.common.black,
      },
    },
}))(TableRow);

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.info.main,
      color: theme.palette.common.black,
    }
}))(TableCell);

function VanBanGuiLuu(props){
    const [listVanBanLuu,setListVanBanLuu] = useState([]);
    const [listVanBan,setListVanBan] = useState([]);
    const [listVanBanGui,setListVanBanGui] = useState([]);

    
    /**
     * Lấy dữ liều từ NeDB vào
     */
    useEffect(() => {
        props.vanBanLuuDB.find({loaiVanBanLuu : "Văn Bản Gửi"},function(err,docs){
            setListVanBanLuu(docs);
        });
        props.vanBanDB.find({},function(err,docs){
            setListVanBan(docs);
        });
        props.vanBanGuiDB.find({},function(err,docs){
            setListVanBanGui(docs);
        })
    },[]);

    return(
        <div>
            <Grid item sm={12}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell size="small" align="left">STT</StyledTableCell>
                                <StyledTableCell align="left">Ghi Chú</StyledTableCell>
                                <StyledTableCell size="small" align="center">Trích Yếu</StyledTableCell>
                                <StyledTableCell size="small" align="center">Số Ký Hiệu</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <ListVanBanLuu
                            listVanBanLuu = {listVanBanLuu}
                            listVanBan ={listVanBan}
                            listVanBanGui ={listVanBanGui}
                        />
                    </Table>
                </TableContainer>
            </Grid>
        </div>
    )
}

export default VanBanGuiLuu;