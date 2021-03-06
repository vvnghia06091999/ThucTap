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
    const [capDo,setCapDo] = useState('B??nh Th?????ng');
    const [baoMat,setBaoMat] = useState('B??nh Th?????ng');
    const [linhVucVanBan,setLinhVucVanBan] = useState(1);
    const [loaiVanBan,setLoaiVanBan] = useState(1);
    const [lanhDao,setLanhDao] = useState(); // Ch??a s??? d???ng
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
    const [trangThai,setTrangThai] = useState('??ang X??? L??');
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
            const listND = docs.map((item) =>({...item, isCheck : false , vaiTro : "Xem ????? Bi???t"}));
            setListNguoiDung(listND);
        })
    },[step])
    

    /**
     * ????a d??? li???u t??? c??c NeDB v??o const
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
     * Update isCheck c???a ng?????i dung
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
     * C???p nh???t vai tr?? ng?????i d??ng
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
     * H??m l??u v??n b???n s??? d???ng API : "http://localhost:3000/vanban/themVanBan" 
     * L??u v??n b???n l??n sever
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
                trangThai : "???? Duy???t",
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
            alert("L??u v??n b???n th??nh c??ng");
        }).catch(err=>{
            alert("K???t n???i v???i server th???t b???i")
        })
    }

    /**
     * H??m t???o v??n b???n "http://localhost:9999/vanban/themVanBan"
     * T???o v??n b???n g???i nh???n  "http://localhost:9999/vanbanguinhan/themVanBanGuiNhan"
     * T???o chi ti???t v??n b???n g???i nh???n theo ng?????i d??ng ???????c ch???n trong danh s??ch 
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
                trangThai : "???? Duy???t",
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
                        alert("K???t n???i v???i sever th???t b???i")
                    })
                });
                alert("G???i th??nh c??ng !");
                props.onChangeVanBan();
                props.setNumberPage(0);
            }).catch(err=>{
                alert("K???t n???i v???i server th???t b???i")
            })
        }).catch(err=>{
            alert("K???t n???i v???i server th???t b???i")
        })
    }

    // function getListLanhDao(){
    //     listNguoiDung.filter()
    // }


    /**
     * Xu???t m??n h??nh theo step
     * m??n h??nh 1 : nh???p th??ng tin v??n b???n
     * m??n h??nh 2 : ch???n ng?????i g???i v??n b???n ho???c nh??m
     */
    if(step===0){
        return(
            <div>
                <Grid container justify="center" spacing={4} >
                    <Grid item xs={12} sm={12}>
                        <TextField
                            label="Tr??ch Y???u"
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
                            label="S??? K?? Hi???u"
                            fullWidth
                            variant="outlined"
                            value={soKyHieu}
                            onChange={(e) =>{setSoKyHieu(e.target.value)}}
                        />
                    </Grid>
    
                    <Grid item xs={12} sm={3}>
                        <TextField
                            label="S??? ??i"
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
                                    label="Ng??y Ban H??nh"
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
                                    label="H???n X??? L??"
                                    value={hanXuLy}
                                    onChange={(date) => {setHanXuLy(date)}}
                                    KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        
                        </Grid>
                    </MuiPickersUtilsProvider>
                    
                    <Grid item xs={12} sm={3}>
                        <InputLabel >C???p ?????</InputLabel>
                        <Select
                            fullWidth
                            label="C???p ?????"
                            value={capDo}
                            onChange={(e)=>{setCapDo(e.target.value)}}
                            >
                            <MenuItem value={"B??nh Th?????ng"}>B??nh Th?????ng</MenuItem>
                            <MenuItem value={"Kh???n"}>Kh???n</MenuItem>
                            <MenuItem value={"H???a T???c"}>H???a T???c</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <InputLabel >B???o m???t</InputLabel>
                        <Select
                            fullWidth
                            label="B???o m???t"
                            value={baoMat}
                            onChange={(e)=>setBaoMat(e.target.value)}
                            >
                            <MenuItem value={"B??nh Th?????ng"}>B??nh Th?????ng</MenuItem>
                            <MenuItem value={"Cao"}>Cao</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <InputLabel >L??nh V???c V??n B???n</InputLabel>
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
                        <InputLabel >Lo???i V??n B???n</InputLabel>
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
                        <InputLabel >L??nh ?????o</InputLabel>
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
                            L??u
                        </Button>
                        <Button variant="contained" color="primary" onClick={() => {setStep(step+1)}}>
                            G???i
                        </Button>
                        <Button variant="contained" color="primary" onClick={() => {setStep(step+1);setNhom(true)}}>
                            G???i Nh??m
                        </Button>
                        <Button variant="contained" color="inherit" onClick={() => {props.setNumberPage(0)}}>
                            ????ng
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
                                    label="N???i Dung"
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
                                    label="?? Ki???n X??? L??"
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
                                    <FormLabel >Tr???ng th??i x??? l?? :</FormLabel>
                                    <RadioGroup value={trangThai} onChange={(e)=>{setTrangThai(e.target.value)}}>
                                        <FormControlLabel value="??ang X??? L??" control={<Radio />} label="??ang X??? L??" />
                                        <FormControlLabel value="???? Ho??n T???t" control={<Radio />} label="???? ho??n t???t" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Divider/>
                            <Grid item sm={6} >
                                <Button variant="contained" color="secondary" onClick={() => {setStep(0);setNhom(false)}}>
                                    Tr??? V???
                                </Button>
                                <Button variant="contained" color="primary" onClick={() => {taoVanBanVaGui()}}>
                                    G???i
                                </Button>
                                <Button variant="contained" color="inherit" onClick={() => {props.setNumberPage(0)}}>
                                    ????ng
                                </Button>
                            </Grid>
                            <Grid item sm={12}>
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell size="small">STT</StyledTableCell>
                                                <StyledTableCell >T??n Nh??n Vi??n</StyledTableCell>
                                                <StyledTableCell align="center">Vai tr??</StyledTableCell>
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