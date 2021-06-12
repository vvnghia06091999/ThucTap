import React,{useState,useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import 'date-fns';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import ListDonVi from '../../List/ListDonVi';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import VaiTro from '../NguoiDung/VaiTro';
import ListNhom from '../../List/ListNhom';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

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


function ThemVanBan(props){
    const classes = useStyles();
    //Van Ban
    const [trichYeu,setTrichYeu] = useState('');
    const [soKyHieu,setSoKyHieu] = useState('');
    const [soDen,setSoDen] = useState('');
    const [capDo,setCapDo] = useState('Bình Thường');
    const [baoMat,setBaoMat] = useState('Bình Thường');
    const [linhVucVanBan,setLinhVucVanBan] = useState(1);
    const [loaiVanBan,setLoaiVanBan] = useState(1);
    const [lanhDao,setLanhDao] = useState(); // Chưa sử dụng
    const [file,setFile] = useState();
    const [ngayBanHanh,setNgayBanHanh] = useState(Date.now);
    const [hanXuLy,setHanXuLy] = useState(null);
    const [step,setStep] = useState(0);
    const [listLinhVuc,setListLinhVuc] = useState([]);
    const [listLoai,setListLoai] = useState([]);
    const [nguoiDung] = useState(props.nguoiDung);
    const [listDonVi,setListDonVi] = useState([]);
    const [listPhongBan,setListPhongBan] = useState([]);
    const [listNguoiDung,setListNguoiDung] = useState([]);
    // VanBanGuiNhan
    const [noiDung,setNoiDung] = useState('');
    const [yKienXuLy,setYKienXuLy] = useState('');
    const [trangThai,setTrangThai] = useState('Đang Xử Lý');
    //Nhom
    const [listNhom,setListNhom] = useState([]);
    const [listCTNhom,setListCTNhom] = useState([]);
    //
    const [nhom,setNhom] = useState(false);

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

    useEffect(() => {
        props.nguoiDungDB.find({},function(err,docs){
            const listND = docs.map((item) =>({...item, isCheck : false , vaiTro : "Xem Để Biết"}));
            setListNguoiDung(listND);
        })
    },[step])
    

    /**
     * Đưa dữ liệu từ các NeDB vào const
     */
    useEffect(() => {
        props.linhVucVanBanDB.find({},function(err,docs){
            setListLinhVuc(docs);
        });
        props.loaiVanBanDB.find({},function(err,docs){
            setListLoai(docs);
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
    },[]);


    /**
     * Update isCheck của người dung
     * @param {number} id 
     */
    function updateNguoiDungCheck(id){
        const updateList = listNguoiDung.map(item => {
            if (item.id === id) {
                return {...item,isCheck :!item.isCheck}
            }
            return item;
        })
        setListNguoiDung(updateList);
    }

    /**
     * Cập nhật vai trò người dùng
     * @param {number} id 
     * @param {String} vaiTro 
     */
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
     * Hàm lưu văn bản sử dụng API : "http://localhost:3000/vanban/themVanBan" 
     * Lưu văn bản lên sever
     */
    function luuVanBan(){
        const api = process.env.REACT_APP_API+"vanban/themVanBan";
        const requestOptions ={
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                trichYeu : trichYeu,
                ngayBanHanh : ngayBanHanh,
                soKyHieu : soKyHieu,
                capDo : capDo,
                baoMat : baoMat,
                soDen : soDen,
                hanXuLy : hanXuLy,
                trangThai : "Đã Duyệt",
                file : file,
                idLanhDao : nguoiDung.id,
                idLoaiVanBan : loaiVanBan,
                idLinhVucVanBan: linhVucVanBan,
                idNguoiTao : nguoiDung.id
             })
        };
        fetch(api,requestOptions)
        .then(response => response.json())
        .then(data => {
            props.setNguoiDung(data);
            alert("Lưu văn bản thành công");
        }).catch(err=>{
            alert("Kết nối với server thất bại")
        })
    }

    /**
     * Hàm tạo văn bản "http://localhost:9999/vanban/themVanBan"
     * Tạo văn bản gửi nhận  "http://localhost:9999/vanbanguinhan/themVanBanGuiNhan"
     * Tạo chi tiết văn bản gửi nhận theo người dùng được chọn trong danh sách 
     * "http://localhost:9999/chiTietVanBanGuiNhan/themChiTietVanBanGuiNhan"
     */
    function taoVanBanVaGui(){
        const api = process.env.REACT_APP_API+"vanban/themVanBan";
        const requestOptions ={
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                trichYeu : trichYeu,
                ngayBanHanh : ngayBanHanh,
                soKyHieu : soKyHieu,
                capDo : capDo,
                baoMat : baoMat,
                soDen : soDen,
                hanXuLy : hanXuLy,
                trangThai : "Đã Duyệt",
                file : file,
                idLanhDao : nguoiDung.id,
                idLoaiVanBan : loaiVanBan,
                idLinhVucVanBan: linhVucVanBan,
                idNguoiTao : nguoiDung.id
             })
        };
        fetch(api,requestOptions)
        .then(response => response.json())
        .then(data => {
            const apiVanBanGuiNhan = process.env.REACT_APP_API+"vanbanguinhan/themVanBanGuiNhan";
            const requestOptions ={
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    idNguoiGui : nguoiDung.id,
                    idVanBan : data.id,
                    trangThai : trangThai,
                    noiDung : noiDung,
                    yKienXuLy : yKienXuLy
                 })
            };
            fetch(apiVanBanGuiNhan,requestOptions)
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
            })
        }).catch(err=>{
            alert("Kết nối với server thất bại")
        })
    }

    // function getListLanhDao(){
    //     listNguoiDung.filter()
    // }


    /**
     * Xuất màn hình theo step
     * màn hình 1 : nhập thông tin văn bản
     * màn hình 2 : chọn người gửi văn bản hoặc nhóm
     */
    if(step===0){
        return(
            <div>
                <Grid container justify="center" spacing={4} >
                    <Grid item xs={12} sm={12}>
                        <TextField
                            label="Trích Yếu"
                            multiline
                            fullWidth
                            rows={3}
                            value={trichYeu}
                            onChange={(e) => {setTrichYeu(e.target.value)}}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            label="Số Ký Hiệu"
                            fullWidth
                            variant="outlined"
                            value={soKyHieu}
                            onChange={(e) =>{setSoKyHieu(e.target.value)}}
                        />
                    </Grid>
    
                    <Grid item xs={12} sm={3}>
                        <TextField
                            label="Số Đi"
                            fullWidth
                            variant="outlined"
                            value={soDen}
                            onChange={(e) =>{setSoDen(e.target.value)}}
                        />
                    </Grid>
                    
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid item xs={12} sm={3}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="dd/MM/yyyy"
                                    margin="normal"
                                    label="Ngày Ban Hành"
                                    value={ngayBanHanh}
                                    onChange={(date)=>{setNgayBanHanh(date)}}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                        
                        </Grid>
                        <Grid item xs={12} sm={3}>
                        
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="dd/MM/yyyy"
                                    margin="normal"
                                    label="Hạn Xử Lý"
                                    value={hanXuLy}
                                    onChange={(date) => {setHanXuLy(date)}}
                                    KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        
                        </Grid>
                    </MuiPickersUtilsProvider>
                    
                    <Grid item xs={12} sm={3}>
                        <InputLabel >Cấp Độ</InputLabel>
                        <Select
                            fullWidth
                            label="Cấp Độ"
                            value={capDo}
                            onChange={(e)=>{setCapDo(e.target.value)}}
                            >
                            <MenuItem value={"Bình Thường"}>Bình Thường</MenuItem>
                            <MenuItem value={"Khẩn"}>Khẩn</MenuItem>
                            <MenuItem value={"Hỏa Tốc"}>Hỏa Tốc</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <InputLabel >Bảo mật</InputLabel>
                        <Select
                            fullWidth
                            label="Bảo mật"
                            value={baoMat}
                            onChange={(e)=>setBaoMat(e.target.value)}
                            >
                            <MenuItem value={"Bình Thường"}>Bình Thường</MenuItem>
                            <MenuItem value={"Cao"}>Cao</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <InputLabel >Lĩnh Vực Văn Bản</InputLabel>
                        <Select
                            fullWidth
                            value={linhVucVanBan}
                            onChange={(e)=> {setLinhVucVanBan(e.target.value)}}
                            >
                            {listLinhVuc.map((item) =>(
                                <MenuItem value={item.id}>{item.tenLinhVucVanBan}</MenuItem>
                            )
                            )}
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <InputLabel >Loại Văn Bản</InputLabel>
                        <Select
                            fullWidth
                            value = {loaiVanBan}
                            onChange={(e)=>{setLoaiVanBan(e.target.value)}}
                            >
                            {listLoai.map((item) =>(
                                <MenuItem value={item.id}>{item.tenLoaiVanBan}</MenuItem>
                            )
                            )}
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <input
                            className={classes.input}
                            id="contained-button-file"
                            multiple
                            type="file"
                            value={file}
                            onChange={(e)=>{setFile(e.target.value)}}
                        />
                        <label htmlFor="contained-button-file">
                            <Button variant="contained" color="primary" component="span">
                                Upload File
                            </Button>
                        </label>
                    </Grid>
                    <Grid item xs={12} sm={3}>
    
                    </Grid>
                    <Grid item xs={12} sm={3}>
    
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <InputLabel >Lãnh Đạo</InputLabel>
                        <Select
                            fullWidth

                            >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={5}>
                        <Button variant="contained" color="secondary" onClick={() =>{luuVanBan()}}>
                            Lưu
                        </Button>
                        <Button variant="contained" color="primary" onClick={() => {setStep(step+1)}}>
                            Gửi
                        </Button>
                        <Button variant="contained" color="primary" onClick={() => {setStep(step+1);setNhom(true)}}>
                            Gửi Nhóm
                        </Button>
                        <Button variant="contained" color="inherit" onClick={() => {props.setNumberPage(0)}}>
                            Đóng
                        </Button>
                    </Grid>
                </Grid>
            </div>
        )
    }else{
        return(
            <div>
                <Grid container justify="center" spacing={4} >
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
                                <Button variant="contained" color="primary" onClick={() => {taoVanBanVaGui()}}>
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
            </div>
        )
    }
}

export default ThemVanBan;