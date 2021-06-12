import React,{useState,useEffect} from 'react';   
import Grid from '@material-ui/core/Grid';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListDonVi from '../../List/ListDonVi';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';


const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: 'none',
    },
  }));

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

function Nhom(props){
    const classes = useStyles();

    const[listNhom,setListNhom] = useState([]);
    const[listCTNhom,setListCTNhom] = useState([]);
    const[listNguoiDung,setListNguoiDung] = useState([]);
    const[nguoiDung] = useState(props.nguoiDung);
    const[listDonVi,setListDonVi] = useState([]);
    const[listPhongBan,setListPhongBan] = useState([]);
    const[idNhom,setIdNhom] = useState(0);
    const[nhom,setNhom] = useState();
    const[openDialog,setOpenDialog] = useState(false);
    const[tenNhom,setTenNhom] = useState('');
    const[change,setChange] = useState(0);

    useEffect(() => {
        props.nhomDB.find({},function(err,docs){
            setListNhom(docs);
        });
        props.chiTietNhomDB.find({},function(err,docs){
            setListCTNhom(docs);
        });
        props.donViDB.find({},function(err,docs){
            setListDonVi(docs);
        });
        props.phongBanDB.find({},function(err,docs){
            setListPhongBan(docs);
        });
        
    },[]);

    useEffect(() => {
        props.nguoiDungDB.find({},function(err,docs){
            const listND = docs.map((item) =>({...item, isCheck : false }));
            setListNguoiDung(listND);
        })
    },[change])

    function updateNguoiDungCheck(id){
        const updateList = listNguoiDung.map(item => {
            if (item.id === id) {
                return {...item,isCheck :!item.isCheck}
            }
            return item;
        })
        setListNguoiDung(updateList);
    }

    function getTitle(nhom) {
        if(nhom){
            return <Grid item container sm={12} spacing={4}>
                    <Grid item sm={10}>
                        <Typography variant="h4" >
                            {nhom.tenNhom}
                        </Typography>
                    </Grid>
                    <Grid item sm={2}>
                        <IconButton onClick={() => {deleteNhom(idNhom)}}>
                            <DeleteIcon fontSize="large" />
                        </IconButton>
                    </Grid>
            </Grid>
        }
    }

    function deleteNhom(idNhom){
        listCTNhom.filter(ctNhom => ctNhom.idNhom === idNhom).map((item=>{
            deleteCTNhom(item.idNhom,item.idNguoiDung);
        }));
        const api = process.env.REACT_APP_API+"nhom/xoaNhom/"+idNhom;
        const requestOptions = {
            method: "DELETE"
        };
        fetch(api,requestOptions)
        .then(data => {
            props.onChangeVanBan();
            alert("Xóa nhóm thành công");
        }).catch(err => {
            alert("Kết nối với server thất bại");
        })
    }

    function deleteCTNhom(idNhom,idNguoiDung){
        const api = process.env.REACT_APP_API+"chitietnhom/xoaChiTietNhom/"+idNhom+"/"+idNguoiDung;
        const requestOptions = {
            method: "DELETE"
        };
        fetch(api,requestOptions)
        .then(data=>{
            props.onChangeVanBan();
        });
    }

    function getNguoiDungNhom(idNguoiDung,index){
        let nguoiDung;
        listNguoiDung.map(item => {
            if(item.id === idNguoiDung){
                nguoiDung = item;
            }
        });
        return <StyledTableRow>
                    <StyledTableCell>{index+1}</StyledTableCell>
                    <StyledTableCell align="left">{nguoiDung.tenNguoiDung}</StyledTableCell>
                    {getPhongBan(nguoiDung.idPhongBan)}
                    <StyledTableCell>
                        <IconButton onClick={() => {deleteCTNhom(idNhom,nguoiDung.id)}}>
                            <DeleteIcon />
                        </IconButton>
                    </StyledTableCell>
                </StyledTableRow>
    }

    function luuNhom(){
        const api = process.env.REACT_APP_API+"nhom/themNhom";
        const requestOptions ={
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                tenNhom : tenNhom,
                idNguoiTao : nguoiDung.id
            })
        };
        fetch(api,requestOptions)
        .then(response => response.json())
        .then(data => {
            listNguoiDung.map(item => {
                if(item.isCheck === true) {
                    luuChiTietNhom(data.id,item.id);
                }
            });
            setTenNhom("");
            props.onChangeVanBan();
            setChange(change+1);
            alert("Lưu văn bản thành công");
        }).catch(err =>{
            alert("Kết nối với sever thất bại");
        })
    }

    function luuChiTietNhom(idNhom,idNguoiDung){
        const api = process.env.REACT_APP_API+"chitietnhom/themChiTietNhom";
        const requestOptions ={
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                idNhom : idNhom,
                idNguoiDung : idNguoiDung
            })
        };
        fetch(api,requestOptions);
    }

    function getPhongBan(idPhongBan){
        let tenPhongBan;
        listPhongBan.map((item => {
            if(item.id === idPhongBan){
                tenPhongBan = item.tenPhongBan;
            }
        }));
        return <StyledTableCell align="center">{tenPhongBan}</StyledTableCell>
    }

    function getListDonVi(idNhom){
        if(idNhom===0)
            return <div/>
        else 
            return <TableContainer> 
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell size="small">STT</StyledTableCell>
                                    <StyledTableCell align="left" >Tên Nhân Viên</StyledTableCell>
                                    <StyledTableCell align="center">Phòng Ban</StyledTableCell>
                                    <StyledTableCell align="center"></StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {listCTNhom.filter(ctNhom => ctNhom.idNhom === idNhom).map((item, index) =>(
                                        getNguoiDungNhom(item.idNguoiDung,index)
                                ))}
                                <StyledTableRow>
                                    <StyledTableCell>
                                        <ListItem button >
                                            <ListItemIcon>
                                                <AddIcon />
                                            </ListItemIcon>
                                        </ListItem>
                                    </StyledTableCell>
                                    <StyledTableCell/>
                                    <StyledTableCell/>
                                    <StyledTableCell/>
                                </StyledTableRow>
                            </TableBody>
                        </Table> 
                    </TableContainer>
    }

    return (
        <div>
            <Dialog open={openDialog} onClose={()=>{setOpenDialog(false)}}>
                <DialogTitle>
                    Tên Nhóm
                </DialogTitle>
                <TextField
                    label="Tên Nhóm"
                    value={tenNhom}
                    onChange={(e)=>{setTenNhom(e.target.value)}}
                    variant="outlined"
                    multiline
                    fullWidth
                />
                <DialogTitle>
                    Chọn Nhân Viên
                </DialogTitle>
                <DialogContent>
                    <ListDonVi
                        listDonVi={listDonVi}
                        listPhongBan={listPhongBan}
                        listNguoiDung={listNguoiDung}
                        updateNguoiDungCheck={updateNguoiDungCheck}
                        setListNguoiDung={setListNguoiDung}
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="secondary" onClick={()=>{setOpenDialog(false);setTenNhom("")}}>Hủy</Button>
                    <Button variant="contained" color="primary" onClick={()=>{setOpenDialog(false);luuNhom()}}>Lưu</Button>
                </DialogActions>
            </Dialog>
            <Grid container justify="center" spacing={4}>
                <Grid item sm={3}>
                    <ListSubheader inset>Nhóm</ListSubheader>
                    {listNhom.map(item=>(
                        <ListItem button onClick={() =>{setIdNhom(item.id);setNhom(item)}}>
                            <ListItemText primary={item.tenNhom} />             
                        </ListItem>
                    ))}
                    <ListItem button onClick={() =>{setIdNhom(0);setOpenDialog(true);setNhom(null);}}>
                        <ListItemIcon>
                            <AddIcon />
                        </ListItemIcon>
                        <ListItemText primary="Thêm Nhóm" />
                    </ListItem>
                </Grid>
                <Grid item justify="center" spacing={4} sm={6}>
                    {getTitle(nhom)}
                    <Grid item sm={12}>
                        {getListDonVi(idNhom)}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default Nhom;