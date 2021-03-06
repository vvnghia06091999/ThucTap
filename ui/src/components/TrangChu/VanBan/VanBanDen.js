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
 * H??m xu???t form input theo t??y ch???n ng?????i d??ng
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
                        label="Tr??ch Y???u"
                        multiline
                        fullWidth
                        onChange={(e) => {setTimKiem(e.target.value)}}
                        variant="outlined"
                />
            )
        case 2 :
            return (
                <TextField
                    label="S??? K?? Hi???u"
                    multiline
                    fullWidth
                    onChange={(e) => {setTimKiem(e.target.value)}}
                    variant="outlined"
                />
            )
        case 3 :
            return (
                <TextField
                    label="S??? ??i"
                    multiline
                    fullWidth
                    onChange={(e) => {setTimKiem(e.target.value)}}
                    variant="outlined"
                />
            )
        case 4 : 
            return (
                <div>
                    <InputLabel >C???p ?????</InputLabel>
                    <Select
                        fullWidth
                        onChange={(e)=>{setTimKiem(e.target.value)}}
                        >
                        <MenuItem value={"B??nh Th?????ng"}>B??nh Th?????ng</MenuItem>
                        <MenuItem value={"Kh???n"}>Kh???n</MenuItem>
                        <MenuItem value={"H???a T???c"}>H???a T???c</MenuItem>
                    </Select>
                </div>
            )
        case 5 :
            return(
                <div>
                    <InputLabel >L??nh V???c</InputLabel>
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
                    <InputLabel >L??nh V???c</InputLabel>
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
                    <InputLabel >Tr???ng Th??i</InputLabel>
                    <Select
                        fullWidth
                        onChange={(e)=>{setTimKiem(e.target.value)}}
                        >
                        <MenuItem value={"???? Duy???t"}>???? Duy???t</MenuItem>
                        <MenuItem value={"Ch??a Duy???t"}>Ch??a Duy???t</MenuItem>
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
    /// Chuy???n Ti???p
    const [noiDung,setNoiDung] = useState('');
    const [yKienXuLy,setYKienXuLy] = useState('');
    const [trangThai,setTrangThai] = useState('??ang X??? L??');
    const [listNhom,setListNhom] = useState([]);
    const [listCTNhom,setListCTNhom] = useState([]);
    const [listDonVi,setListDonVi] = useState([]);
    const [listPhongBan,setListPhongBan] = useState([]);
    const [listNguoiDung,setListNguoiDung] = useState([]);
    const [step,setStep] = useState(0);
    const [nhom,setNhom] = useState(false);

    

    /**
     * ????a d??? li???u t??? NeDB v??o
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
            const listND = docs.map((item) =>({...item, isCheck : false , vaiTro : "Xem ????? Bi???t"}));
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
     * H??m l???y t??n L??nh V???c V??n B???n theo ID
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
     * H??m l???y t??n lo???i v??n b???n theo ID
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
                                    label="Ghi Ch??"
                                    value={ghiChu}
                                    onChange={(e)=>{setGhiChu(e.target.value)}}
                                    variant="outlined"
                                    multiline
                                    fullWidth
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button variant="contained" color="secondary" onClick={()=>{setOpenDialog(false);}}>H???y</Button>
                                <Button variant="contained" color="primary" onClick={()=>{setOpenDialog(false);setCheck(true);saveVanBanGuiNhan(vanBanGui.id);}}>L??u</Button>
                            </DialogActions>
                        </Dialog>
                    <Grid item sm={10}>
                        <Typography variant="h4" gutterBottom>
                            Th??ng Tin V??n B???n
                        </Typography>
                    </Grid>
                    <Grid item sm={2}>
                        <Checkbox checked={check} onChange={() => {onCheckStar();}} icon={<StarOutlinedIcon/>} checkedIcon={<StarOutlinedIcon/>}/>
                    </Grid>
                    <Grid item sm={12}>
                        <Typography variant="subtitle2" gutterBottom>
                            Tr??ch Y???u : {vanBan.trichYeu}
                        </Typography>
                    </Grid>
                    <Grid item sm={3}>
                        <Typography variant="subtitle2" gutterBottom>
                            S??? ??i : {vanBan.soDen}
                        </Typography>
                    </Grid>
                    <Grid item sm={3}>
                        <Typography variant="subtitle2" gutterBottom>
                            S??? K?? Hi???u : {vanBan.soKyHieu}
                        </Typography>
                    </Grid>
                    <Grid item sm={3}>
                        <Typography variant="subtitle2" gutterBottom>
                            C???p ????? : {vanBan.capDo}
                        </Typography>
                    </Grid>
                    <Grid item sm={3}>
                        <Typography variant="subtitle2" gutterBottom>
                            B???o M???t : {vanBan.baoMat}
                        </Typography>
                    </Grid>
                    <Grid item sm={3}>
                        <Typography variant="subtitle2" gutterBottom>
                            Ng??y Ban H??nh : {vanBan.ngayBanHanh}
                        </Typography>
                    </Grid>
                    <Grid item sm={3}>
                        <Typography variant="subtitle2" gutterBottom>
                            H???n X??? L?? : {vanBan.hanXuLy}
                        </Typography>
                    </Grid>
                    <Grid item sm={3}>
                        <Typography variant="subtitle2" gutterBottom>
                            Lo???i V??n B???n : {loaiVanBan}
                        </Typography>
                    </Grid>
                    <Grid item sm={3}>
                        <Typography variant="subtitle2" gutterBottom>
                            L??nh V???c : {linhVuc}
                        </Typography>
                    </Grid>
                    <Grid item sm={3}>
                        <Typography variant="subtitle2" gutterBottom>
                            L??nh ?????o : {lanhDao}
                        </Typography>
                    </Grid>
                    <Grid item sm={3}>
                        <Typography variant="subtitle2" gutterBottom>
                            Ng??y G???i : {vanBanGui.ngayGui}
                        </Typography>
                    </Grid>
                    <Grid item sm={3}>
                        <Typography variant="subtitle2" gutterBottom>
                            Tr???ng Th??i : {vanBanGui.trangThai}
                        </Typography>
                    </Grid>
                    <Grid item sm={3}>
                        <Button variant="contained" color="primary">Xem File</Button>
                    </Grid>
                    <Grid item sm={12}>
                        <Typography variant="subtitle2" gutterBottom>
                            N???i Dung : {vanBanGui.noiDung}
                        </Typography>
                    </Grid>
                    <Grid item sm={12}>
                        <Typography variant="subtitle2" gutterBottom>
                            ?? Ki???n X??? L?? : {vanBanGui.yKienXuLy}
                        </Typography>
                    </Grid>
                    <Grid item sm={6}>
                        <Button variant="contained" color="secondary" onClick={() =>{setOpen(false)}}>
                            Tr??? V???
                        </Button>
                        <Button variant="contained" color="primary" onClick={()=>{setStep(step+1);setNhom(false)}}>
                            Chuy???n Ti???p
                        </Button>
                        <Button variant="contained" color="primary" onClick={()=>{setStep(step+1);setNhom(true)}}>
                            Chuy???n Nh??m
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
                                <Button variant="contained" color="primary" onClick={() => {guiVanBan()}}>
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
    }
    /**
     * H??m l???y t??n L??nh ?????o theo ID
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
                        alert("K???t n???i v???i sever th???t b???i")
                    })
                });
                alert("G???i th??nh c??ng !");
                props.onChangeVanBan();
                props.setNumberPage(0);
            }).catch(err=>{
                alert("K???t n???i v???i server th???t b???i")
            });
    }

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    /**
     * H??m xu???t list v??n b???n theo t??y ch???n ng?????i d??ng
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
            alert("X??a v??n b???n th??nh c??ng");
            props.onChangeVanBan();
        }).catch(err=>{
            alert("K???t n???i v???i server th???t b???i");
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
                loaiVanBanLuu : "V??n B???n ?????n"
            })
        };
        fetch(api,requestOptions)
        .then(response => response.json())
        .then(data => {
            alert("L??u v??n b???n th??nh c??ng");
            props.onChangeVanBan();
        }).catch(err=>{
            alert("K???t n???i v???i server th???t b???i");
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
                            <InputLabel >T??m Ki???m</InputLabel>
                            <Select
                                fullWidth
                                label="Lo???i T??m Ki???m"
                                value={loaiTimKiem}
                                onChange={(e)=>setLoaiTimKiem(e.target.value)}
                                >
                                <MenuItem value={0}>Tr???ng Th??i</MenuItem>
                                <MenuItem value={1}>Tr??ch Y???u</MenuItem>
                                <MenuItem value={3}>S??? ?????n</MenuItem>
                                <MenuItem value={2}>S??? K?? Hi???u</MenuItem>
                                <MenuItem value={4}>C???p ?????</MenuItem>
                                <MenuItem value={5}>L??nh V???c</MenuItem>
                                <MenuItem value={6}>Lo???i V??n B???n</MenuItem>
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
                                T??m Ki???m
                            </Button>
                            <Button 
                                fullWidth 
                                variant="contained" 
                                color="secondary" 
                                onClick={() =>{getList(-1,timKiem,setListVanBan)}}
                            >
                                Xem T???t C???
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
                                        <StyledTableCell align="left">Tr??ch Y???u</StyledTableCell>
                                        <StyledTableCell size="small" align="center">S??? ??i</StyledTableCell>
                                        <StyledTableCell size="small" align="center">S??? K?? Hi???u</StyledTableCell>
                                        <StyledTableCell align="center">Tr???ng Th??i</StyledTableCell>
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