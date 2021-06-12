import React,{useState,useEffect} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Checkbox from '@material-ui/core/Checkbox';
import StarOutlinedIcon from '@material-ui/icons/StarOutlined';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ListVanBanGui from '../../List/ListVanBanGui';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';

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



/**
 * Hàm xuất form input theo tùy chọn người dùng
 * @param {number} select 
 * @param {function} setTimKiem 
 * @param {array} listLinhVuc 
 * @param {array} listLoai 
 */
function getTimKiem(select,setTimKiem,listLinhVuc=[],listLoai=[]){
    switch(select){
        case 1 :
            return (
                <TextField
                        label="Trích Yếu"
                        multiline
                        fullWidth
                        onChange={(e) => {setTimKiem(e.target.value)}}
                        variant="outlined"
                />
            )
        case 2 :
            return (
                <TextField
                    label="Số Ký Hiệu"
                    multiline
                    fullWidth
                    onChange={(e) => {setTimKiem(e.target.value)}}
                    variant="outlined"
                />
            )
        case 3 :
            return (
                <TextField
                    label="Số Đi"
                    multiline
                    fullWidth
                    onChange={(e) => {setTimKiem(e.target.value)}}
                    variant="outlined"
                />
            )
        case 4 : 
            return (
                <div>
                    <InputLabel >Cấp Độ</InputLabel>
                    <Select
                        fullWidth
                        onChange={(e)=>{setTimKiem(e.target.value)}}
                        >
                        <MenuItem value={"Bình Thường"}>Bình Thường</MenuItem>
                        <MenuItem value={"Khẩn"}>Khẩn</MenuItem>
                        <MenuItem value={"Hỏa Tốc"}>Hỏa Tốc</MenuItem>
                    </Select>
                </div>
            )
        case 5 :
            return(
                <div>
                    <InputLabel >Lĩnh Vực</InputLabel>
                    <Select
                        fullWidth
                        onChange={(e)=>{setTimKiem(e.target.value)}}
                        >
                        {listLinhVuc.map((item) =>(
                                <MenuItem value={item.id}>{item.tenLinhVucVanBan}</MenuItem>
                        ))}
                    </Select>
                </div>
            )
        case 6 :
            return(
                <div>
                    <InputLabel >Lĩnh Vực</InputLabel>
                    <Select
                        fullWidth
                        onChange={(e)=>{setTimKiem(e.target.value)}}
                        >
                        {listLoai.map((item) =>(
                            <MenuItem value={item.id}>{item.tenLoaiVanBan}</MenuItem>
                        ))}
                    </Select>
                </div>
            )
        default:
            return (
                <div>
                    <InputLabel >Trạng Thái</InputLabel>
                    <Select
                        fullWidth
                        onChange={(e)=>{setTimKiem(e.target.value)}}
                        >
                        <MenuItem value={"Đã Duyệt"}>Đã Duyệt</MenuItem>
                        <MenuItem value={"Chưa Duyệt"}>Chưa Duyệt</MenuItem>
                    </Select>
                </div>
            )
    }
}

function VanBanGui(props){
    const [listVanBanGui,setListVanBanGui] = useState([]);
    const [listVanBan,setListVanBan] = useState([]);
    const [timKiem,setTimKiem] = useState('');
    const [loaiTimKiem,setLoaiTimKiem] = useState(0);
    const [listLinhVuc,setListLinhVuc] = useState([]);
    const [listLoai,setListLoai] = useState([]);
    const [open,setOpen] = useState(false);
    const [vanBan,setVanBan] = useState();
    const [vanBanGui,setVanBanGui] = useState();
    const [loaiVanBan,setLoaiVanBan] = useState();
    const [linhVuc,setLinhVuc] = useState();
    const [lanhDao,setLanhDao] = useState();
    const [listVanBanLuu,setListVanBanLuu] = useState([]);
    const [check,setCheck] = useState(false);
    const [idVanBanLuu,setIdVanBanLuu] = useState();
    const [openDialog,setOpenDialog] = useState(false);
    const [nguoiDung] = useState(props.nguoiDung);
    const [ghiChu,setGhiChu] = useState("");

    /**
     * Đưa dữ liệu từ NeDB vào
     */
    useEffect(() => {
        props.vanBanDB.find({},function(err,docs){
            setListVanBan(docs);
        });
        props.vanBanGuiDB.find({},function(err,docs){
            setListVanBanGui(docs);
        });
        props.linhVucVanBanDB.find({},function(err,docs){
            setListLinhVuc(docs);
        });
        props.loaiVanBanDB.find({},function(err,docs){
            setListLoai(docs);
        });
        props.vanBanLuuDB.find({},function(err,docs){
            setListVanBanLuu(docs);
        });
    },[]);

    /**
     * Hàm lấy tên Lĩnh Vực Văn Bản theo ID
     * @param {number} idLinhVuc 
     */
    function getLinhVuc(idLinhVuc){
        props.linhVucVanBanDB.findOne({id : idLinhVuc},function(err,docs){
            setLinhVuc(docs.tenLinhVucVanBan);
        });
    }

    /**
     * Hàm lấy tên loại văn bản theo ID
     * @param {number} idLoaiVanBan 
     */
    function getLoaiVanBan(idLoaiVanBan){
        props.loaiVanBanDB.findOne({id : idLoaiVanBan},function(err,docs){
            setLoaiVanBan(docs.tenLoaiVanBan);
        });
    }

    /**
     * Hàm lấy tên Lãnh Đạo theo ID
     * @param {number} idLanhDao 
     */
    function getLanhDao(idLanhDao){
        props.nguoiDungDB.findOne({id : idLanhDao},function(err,docs){
            setLanhDao(docs.tenNguoiDung);
        });
    }

    /**
     * Hàm xuất list văn bản theo tùy chọn người dùng
     * @param {number} loaiTimKiem 
     * @param {String} timKiem 
     * @param {function} setListVanBan 
     */
    function getList(loaiTimKiem,timKiem,setListVanBan){
        if(loaiTimKiem===0){
            props.vanBanDB.find({trangThai : timKiem},function(err,docs){
                setListVanBan(docs);
            });
        }else if(loaiTimKiem===1){
            props.vanBanDB.find({trichYeu : new RegExp(timKiem)},function(err,docs){
                setListVanBan(docs);
            });
        }else if(loaiTimKiem===2){
            props.vanBanDB.find({soKyHieu : new RegExp(timKiem)},function(err,docs){
                setListVanBan(docs);
            });
        }
        else if(loaiTimKiem===3){
            props.vanBanDB.find({soDen : new RegExp(timKiem)},function(err,docs){
                setListVanBan(docs);
            });
        }
        else if(loaiTimKiem===4){
            props.vanBanDB.find({capDo : timKiem},function(err,docs){
                setListVanBan(docs);
            });
        }
        else if(loaiTimKiem===5){
            props.vanBanDB.find({idLinhVucVanBan : timKiem},function(err,docs){
                setListVanBan(docs);
            });
        }
        else if(loaiTimKiem===6){
            props.vanBanDB.find({idLoaiVanBan : timKiem},function(err,docs){
                setListVanBan(docs);
            });
        }else{
            props.vanBanDB.find({},function(err,docs){
                setListVanBan(docs);
            });
        }
    }

    function checkSave(idVanBanGuiNhan){
        setCheck(false);
        listVanBanLuu.map(item => {
            if(item.idVanBanGuiNhan === idVanBanGuiNhan){
                setCheck(true);
                setIdVanBanLuu(item.id);
            }
        });
    }

    function onCheckStar(){
        if(check === true){
            setCheck(false);
            deleteVanBanLuu(idVanBanLuu);
        }else{
            setOpenDialog(true);
        }
    }

    function deleteVanBanLuu(idVanBanLuu){
        const api = process.env.REACT_APP_API+"vanbanluu/xoaVanBanLuu/"+idVanBanLuu;
        const requestOptions = {
            method: "DELETE"
        };
        fetch(api,requestOptions)
        .then(response => response.json())
        .then(data => {
            alert("Xóa văn bản thành công");
            props.onChangeVanBan();
        }).catch(err=>{
            alert("Kết nối với server thất bại");
        });
    }

    function saveVanBanGuiNhan(idVanBanGuiNhan){
        const api = process.env.REACT_APP_API+"vanbanluu/themVanBanLuu";
        const requestOptions ={
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                idNguoiDung : nguoiDung.id,
                idVanBanGuiNhan : idVanBanGuiNhan,
                ghiChu : ghiChu,
                loaiVanBanLuu : "Văn Bản Gửi"
            })
        };
        fetch(api,requestOptions)
        .then(response => response.json())
        .then(data => {
            alert("Lưu văn bản thành công");
            props.onChangeVanBan();
        }).catch(err=>{
            alert("Kết nối với server thất bại");
        });
    }

    if(open)
        return(
            <div>
                <Dialog open={openDialog} onClose={()=>{setOpenDialog(false);setGhiChu("")}}>
                    <DialogContent>
                        <TextField 
                            label="Ghi Chú"
                            value={ghiChu}
                            onChange={(e)=>{setGhiChu(e.target.value)}}
                            variant="outlined"
                            multiline
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="secondary" onClick={()=>{setOpenDialog(false);}}>Hủy</Button>
                        <Button variant="contained" color="primary" onClick={()=>{setOpenDialog(false);setCheck(true);saveVanBanGuiNhan(vanBanGui.id);}}>Lưu</Button>
                    </DialogActions>
                </Dialog>
                <Grid container justify="center" spacing={2}>
                    <Grid item sm={10}>
                        <Typography variant="h4" gutterBottom>
                            Thông Tin Văn Bản
                        </Typography>
                    </Grid>
                    <Grid item sm={2}>
                        <Checkbox checked={check} onChange={() => {onCheckStar();}} icon={<StarOutlinedIcon/>} checkedIcon={<StarOutlinedIcon/>}/>
                    </Grid>
                    <Grid item sm={12}>
                        <Typography variant="subtitle2" gutterBottom>
                            Trích Yếu : {vanBan.trichYeu}
                        </Typography>
                    </Grid>
                    <Grid item sm={3}>
                        <Typography variant="subtitle2" gutterBottom>
                            Số Đi : {vanBan.soDen}
                        </Typography>
                    </Grid>
                    <Grid item sm={3}>
                        <Typography variant="subtitle2" gutterBottom>
                            Số Ký Hiệu : {vanBan.soKyHieu}
                        </Typography>
                    </Grid>
                    <Grid item sm={3}>
                        <Typography variant="subtitle2" gutterBottom>
                            Cấp Độ : {vanBan.capDo}
                        </Typography>
                    </Grid>
                    <Grid item sm={3}>
                        <Typography variant="subtitle2" gutterBottom>
                            Bảo Mật : {vanBan.baoMat}
                        </Typography>
                    </Grid>
                    <Grid item sm={3}>
                        <Typography variant="subtitle2" gutterBottom>
                            Ngày Ban Hành : {vanBan.ngayBanHanh}
                        </Typography>
                    </Grid>
                    <Grid item sm={3}>
                        <Typography variant="subtitle2" gutterBottom>
                            Hạn Xử Lý : {vanBan.hanXuLy}
                        </Typography>
                    </Grid>
                    <Grid item sm={3}>
                        <Typography variant="subtitle2" gutterBottom>
                            Loại Văn Bản : {loaiVanBan}
                        </Typography>
                    </Grid>
                    <Grid item sm={3}>
                        <Typography variant="subtitle2" gutterBottom>
                            Lĩnh Vực : {linhVuc}
                        </Typography>
                    </Grid>
                    <Grid item sm={3}>
                        <Typography variant="subtitle2" gutterBottom>
                            Lãnh Đạo : {lanhDao}
                        </Typography>
                    </Grid>
                    <Grid item sm={3}>
                        <Typography variant="subtitle2" gutterBottom>
                            Ngày Gửi : {vanBanGui.ngayGui}
                        </Typography>
                    </Grid>
                    <Grid item sm={3}>
                        <Typography variant="subtitle2" gutterBottom>
                            Trạng Thái : {vanBanGui.trangThai}
                        </Typography>
                    </Grid>
                    <Grid item sm={3}>
                        <Button variant="contained" color="primary">Xem File</Button>
                    </Grid>
                    <Grid item sm={12}>
                        <Typography variant="subtitle2" gutterBottom>
                            Nội Dung : {vanBanGui.noiDung}
                        </Typography>
                    </Grid>
                    <Grid item sm={12}>
                        <Typography variant="subtitle2" gutterBottom>
                            Ý Kiến Xử Lý : {vanBanGui.yKienXuLy}
                        </Typography>
                    </Grid>
                    <Grid item sm={3}>
                        <Button variant="contained" color="secondary" onClick={() =>{setOpen(false)}}>
                            Trở Về
                        </Button>
                        <Button variant="contained" color="primary" >
                            Chuyển tiếp
                        </Button>
                    </Grid>
                </Grid>
            </div>
        )
    else
        return(
            <div>
                <Grid container justify="center" spacing={2}>
                    <Grid container justify="center" spacing={1} sm={12}>
                        <Grid item sm={2}>
                            <InputLabel >Tìm Kiếm</InputLabel>
                            <Select
                                fullWidth
                                label="Loại Tìm Kiếm"
                                value={loaiTimKiem}
                                onChange={(e)=>setLoaiTimKiem(e.target.value)}
                                >
                                <MenuItem value={0}>Trạng Thái</MenuItem>
                                <MenuItem value={1}>Trích Yếu</MenuItem>
                                <MenuItem value={3}>Số Đi</MenuItem>
                                <MenuItem value={2}>Số Ký Hiệu</MenuItem>
                                <MenuItem value={4}>Cấp Độ</MenuItem>
                                <MenuItem value={5}>Lĩnh Vực</MenuItem>
                                <MenuItem value={6}>Loại Văn Bản</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item sm={3}>
                            {getTimKiem(loaiTimKiem,setTimKiem,listLinhVuc,listLoai)}
                        </Grid>
                        <Grid item sm={2} >
                            <Button fullWidth variant="contained" color="primary" onClick={() =>{getList(loaiTimKiem,timKiem,setListVanBan)}}>
                                Tìm Kiếm
                            </Button>
                            <Button fullWidth variant="contained" color="secondary" onClick={() =>{getList(-1,timKiem,setListVanBan)}}>
                                Xem Tất Cả
                            </Button>
                        </Grid>
                    </Grid>
                    <Divider />
                    <Grid item sm={12}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <StyledTableRow>
                                        <StyledTableCell size="small" align="left">STT</StyledTableCell>
                                        <StyledTableCell align="left">Trích Yếu</StyledTableCell>
                                        <StyledTableCell size="small" align="center">Số Đi</StyledTableCell>
                                        <StyledTableCell size="small" align="center">Số Ký Hiệu</StyledTableCell>
                                        <StyledTableCell align="center">Trạng Thái</StyledTableCell>
                                    </StyledTableRow>
                                </TableHead>
                                <ListVanBanGui
                                    listVanBan={listVanBan}
                                    listVanBanGui={listVanBanGui}
                                    setOpen={setOpen}
                                    setVanBan={setVanBan}
                                    setVanBanGui={setVanBanGui}
                                    getLanhDao={getLanhDao}
                                    getLinhVuc={getLinhVuc}
                                    getLoaiVanBan={getLoaiVanBan}
                                    checkSave={checkSave}
                                />
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </div>
        )
}

export default VanBanGui;