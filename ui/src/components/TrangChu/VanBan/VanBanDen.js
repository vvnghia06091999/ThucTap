import React,{useState,useEffect} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Checkbox from '@material-ui/core/Checkbox';
import StarOutlinedIcon from '@material-ui/icons/StarOutlined';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import ListNhom from '../../List/ListNhom';
import ListDonVi from '../../List/ListDonVi';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TableBody from '@material-ui/core/TableBody';
import VaiTro from '../NguoiDung/VaiTro';
import ListVanBanDen from '../../List/ListVanBanDen';
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


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


function VanBanDen(props){
    const [listVanBanDen,setListVanBanDen] = useState([]);
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
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [listVanBanLuu,setListVanBanLuu] = useState([]);
    const [check,setCheck] = useState(false);
    const [idVanBanLuu,setIdVanBanLuu] = useState();
    const [openDialog,setOpenDialog] = useState(false);
    const [nguoiDung] = useState(props.nguoiDung);
    const [ghiChu,setGhiChu] = useState("");
    /// Chuyển Tiếp
    const [noiDung,setNoiDung] = useState('');
    const [yKienXuLy,setYKienXuLy] = useState('');
    const [trangThai,setTrangThai] = useState('Đang Xử Lý');
    const [listNhom,setListNhom] = useState([]);
    const [listCTNhom,setListCTNhom] = useState([]);
    const [listDonVi,setListDonVi] = useState([]);
    const [listPhongBan,setListPhongBan] = useState([]);
    const [listNguoiDung,setListNguoiDung] = useState([]);
    const [step,setStep] = useState(0);
    const [nhom,setNhom] = useState(false);

    

    /**
     * Đưa dữ liệu từ NeDB vào
     */
    useEffect(() => {
        props.vanBanDB.find({},function(err,docs){
            setListVanBan(docs);
        });
        props.vanBanDenDB.find({},function(err,docs){
            setListVanBanDen(docs);
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
        props.phongBanDB.findOne({id : nguoiDung.idPhongBan},function(err,docs){
            props.phongBanDB.find({idDonVi : docs.idDonVi},function(err,docs){
                setListPhongBan(docs);
            });
        });
        props.donViDB.find({},function(err,docs){
            setListDonVi(docs);
        }); 
        props.nhomDB.find({},function(err,docs){
            setListNhom(docs);
        }); 
        props.chiTietNhomDB.find({},function(err,docs){
            setListCTNhom(docs);
        }); 
    },[])

    useEffect(() => {
        props.nguoiDungDB.find({},function(err,docs){
            const listND = docs.map((item) =>({...item, isCheck : false , vaiTro : "Xem Để Biết"}));
            setListNguoiDung(listND);
        })
    },[]);

    function updateNguoiDungCheck(id){
        const updateList = listNguoiDung.map(item => {
            if (item.id === id) {
                return {...item,isCheck :!item.isCheck}
            }
            return item;
        })
        setListNguoiDung(updateList);
    }

    function updateVaiTroNguoiDung(id,vaiTro){
        const updateList = listNguoiDung.map(item => {
            if (item.id === id) {
                return {...item,vaiTro : vaiTro}
            }
            return item;
        })
        setListNguoiDung(updateList);
    }

     /**
     * Hàm lấy tên Lĩnh Vực Văn Bản theo ID
     * @param {number} idLinhVuc 
     */
    function getLinhVuc(idLinhVuc){
        props.linhVucVanBanDB.findOne({id : idLinhVuc},function(err,docs){
            setLinhVuc(docs.tenLinhVucVanBan);
        });
    }

    function getListCheck(nhom){
        if(nhom){
            return <ListNhom 
                        listNhom={listNhom}
                        listCTNhom={listCTNhom}
                        listNguoiDung={listNguoiDung}
                        updateNguoiDungCheck={updateNguoiDungCheck}
                        setListNguoiDung={setListNguoiDung}
                    />
        }else{
            return <ListDonVi
                        listDonVi={listDonVi}
                        listPhongBan={listPhongBan}
                        listNguoiDung={listNguoiDung}
                        updateNguoiDungCheck={updateNguoiDungCheck}
                        setListNguoiDung={setListNguoiDung}
                /> 
        }
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

    function getVanBan(step){
        if(step===0)
            return <Grid container justify="center" spacing={2}>
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
                    <Grid item sm={6}>
                        <Button variant="contained" color="secondary" onClick={() =>{setOpen(false)}}>
                            Trở Về
                        </Button>
                        <Button variant="contained" color="primary" onClick={()=>{setStep(step+1);setNhom(false)}}>
                            Chuyển Tiếp
                        </Button>
                        <Button variant="contained" color="primary" onClick={()=>{setStep(step+1);setNhom(true)}}>
                            Chuyển Nhóm
                        </Button>
                    </Grid>
                    <Grid item sm={10}>
                    <Document
                        file={vanBan.file}
                        onLoadSuccess={onDocumentLoadSuccess}
                    >
                        <Page pageNumber={pageNumber} />
                    </Document>
                    
                    </Grid>
                    <Grid item sm={4}>
                        <p>Page {pageNumber} of {numPages}</p>
                        <Button variant="contained" color="secondary"onClick={()=>{setPageNumber(pageNumber-1)}}>Prev</Button>
                        <Button variant="contained" color="primary"onClick={()=>{setPageNumber(pageNumber+1)}}>Next</Button>
                    </Grid>
                </Grid>
        else
            return <Grid container justify="center" spacing={4} >
                   <Grid item sm={5}>
                        {getListCheck(nhom)}
                   </Grid>
                   <Grid item sm={7}>
                        <Grid container justify="center" spacing={2} sm={12}>
                            <Grid item sm={12} >
                                <TextField
                                    label="Nội Dung"
                                    multiline
                                    fullWidth
                                    rows={3}
                                    value={noiDung}
                                    onChange={(e) => {setNoiDung(e.target.value)}}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item sm={12} >
                                <TextField
                                    label="Ý Kiến Xử Lý"
                                    multiline
                                    fullWidth
                                    rows={3}
                                    value={yKienXuLy}
                                    onChange={(e) => {setYKienXuLy(e.target.value)}}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item sm={12}>
                                <FormControl>
                                    <FormLabel >Trạng thái xử lý :</FormLabel>
                                    <RadioGroup value={trangThai} onChange={(e)=>{setTrangThai(e.target.value)}}>
                                        <FormControlLabel value="Đang Xử Lý" control={<Radio />} label="Đang Xử Lý" />
                                        <FormControlLabel value="Đã Hoàn Tất" control={<Radio />} label="Đã hoàn tất" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Divider/>
                            <Grid item sm={6} >
                                <Button variant="contained" color="secondary" onClick={() => {setStep(0);setNhom(false)}}>
                                    Trở Về
                                </Button>
                                <Button variant="contained" color="primary" onClick={() => {guiVanBan()}}>
                                    Gửi
                                </Button>
                                <Button variant="contained" color="inherit" onClick={() => {props.setNumberPage(0)}}>
                                    Đóng
                                </Button>
                            </Grid>
                            <Grid item sm={12}>
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell size="small">STT</StyledTableCell>
                                                <StyledTableCell >Tên Nhân Viên</StyledTableCell>
                                                <StyledTableCell align="center">Vai trò</StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {listNguoiDung.filter(item => item.isCheck === true).map((row,index) => (
                                                <StyledTableRow>
                                                    <StyledTableCell>{index+1}</StyledTableCell>
                                                    <StyledTableCell>{row.tenNguoiDung}</StyledTableCell>
                                                    <StyledTableCell align="center">
                                                        <VaiTro
                                                            vaiTro={row.vaiTro}
                                                            updateVaiTroNguoiDung={updateVaiTroNguoiDung}
                                                        />
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </Grid>
                        <Grid item sm={12}>
                        </Grid>
                   </Grid>
                </Grid>
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

    function guiVanBan(){
        const api = process.env.REACT_APP_API+"vanbanguinhan/themVanBanGuiNhan";
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                idNguoiGui : nguoiDung.id,
                idVanBan : vanBan.id,
                trangThai : trangThai,
                noiDung : noiDung,
                yKienXuLy : yKienXuLy
            })
        };
        fetch(api,requestOptions)
        .then(response => response.json())
            .then(data => {
                listNguoiDung.filter(item => item.isCheck === true)
                .map((nguoiDung) =>{
                    const apiGuiVanBan = process.env.REACT_APP_API+"chiTietVanBanGuiNhan/themChiTietVanBanGuiNhan";
                    const requestOptions ={
                        method: "POST",
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ 
                            idNguoiNhan : nguoiDung.id,
                            idVanBanGuiNhan :data.id,
                            vaiTro : nguoiDung.vaiTro
                        })
                    };
                    fetch(apiGuiVanBan,requestOptions)
                    .then(data => {

                    }).catch(err=>{
                        alert("Kết nối với sever thất bại")
                    })
                });
                alert("Gửi thành công !");
                props.onChangeVanBan();
                props.setNumberPage(0);
            }).catch(err=>{
                alert("Kết nối với server thất bại")
            });
    }

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
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
                loaiVanBanLuu : "Văn Bản Đến"
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

    if(open){
        return(
            <div>{getVanBan(step)}</div>
        )    
    }else{
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
                                <MenuItem value={3}>Số Đến</MenuItem>
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
                            <Button 
                                fullWidth 
                                variant="contained" 
                                color="primary" 
                                onClick={() =>{getList(loaiTimKiem,timKiem,setListVanBan)}}
                            >
                                Tìm Kiếm
                            </Button>
                            <Button 
                                fullWidth 
                                variant="contained" 
                                color="secondary" 
                                onClick={() =>{getList(-1,timKiem,setListVanBan)}}
                            >
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
                                <ListVanBanDen
                                    listVanBan={listVanBan}
                                    listVanBanDen={listVanBanDen}
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
}

export default VanBanDen;