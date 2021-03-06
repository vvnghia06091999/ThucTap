import React,{useEffect, useState} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Avatar from '@material-ui/core/Avatar';
import  { Redirect } from 'react-router-dom';
import NguoiDungMenu from './NguoiDung/NguoiDungMenu';
import VanBanMenu from './VanBan/VanBanMenu';
import ThemVanBan from './VanBan/ThemVanBan';
import VanBanGui from './VanBan/VanBanGui';
import VanBanDen from './VanBan/VanBanDen';
import VanBanGuiLuu from './VanBan/VanBanGuiLuu';
import VanBanDenLuu from './VanBan/VanBanDenLuu';
import NguoiDung from './NguoiDung/NguoiDung';
import QuanLyMatKhau from './NguoiDung/QuanLyMatKhau';
import Nhom from './NguoiDung/Nhom';


const Datastore = require('nedb');
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: "auto",
  },
}));

export default function TrangChu() {
  // S??? d???ng style
  const classes = useStyles();

  // T???o Nedb
  const donViDB = new Datastore('donViDB.db');
  const phongBanDB = new Datastore('phongBanDB.db');
  const nguoiDungDB = new Datastore('nguoiDungDB.db');
  const loaiVanBanDB = new Datastore('loaiVanDB.db');
  const linhVucVanBanDB = new Datastore('linhVucVanBanDB.db');
  const nhomDB = new Datastore('nhomDB.db');
  const chiTietNhomDB = new Datastore('chiTietNhomDB.db');
  const vanBanGuiDB = new Datastore('vanBanGuiDB.db');
  const chiTietVanBanGuiDB = new Datastore('chiTietVanBanGuiDB.db');
  const vanBanDenDB = new Datastore('vanBanDenDB.db');
  const vanBanDB = new Datastore('vanBanDB.db');
  const vanBanLuuDB = new Datastore('vanBanLuuDB.db');
  
  // Load Nedb
  donViDB.loadDatabase();
  phongBanDB.loadDatabase();
  nguoiDungDB.loadDatabase();
  loaiVanBanDB.loadDatabase();
  linhVucVanBanDB.loadDatabase(); 
  nhomDB.loadDatabase();
  chiTietNhomDB.loadDatabase();
  vanBanGuiDB.loadDatabase();
  vanBanDenDB.loadDatabase();
  vanBanDB.loadDatabase();
  chiTietVanBanGuiDB.loadDatabase();
  vanBanLuuDB.loadDatabase();

  const [open, setOpen] = useState(true); // ??i???u ch???nh k??ch th?????c
  const [logout,setLogout] = useState(false); // ??i???u ki???n ????? logout
  const [idTaiKhoan] = useState(localStorage.getItem('IdTaiKhoan')) // L???y id T??i Kho???n t??? localStorage
  const [numberPage,setNumberPage] = useState(0); // s??? Page
  const [nguoiDung,setNguoiDung] = useState(''); // ng?????i d??ng
  const [change,setChange] = useState(1);
  const [taiKhoan,setTaiKhoan] = useState();
  
  // H??m ch???nh k??ch th?????c
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  function onChangeVanBan(){
    setChange(change+1);
  }

   /**
   * T???i c??c d??? li???u li??n quan v?? l??u v??o NeDB khi kh???i ?????ng
   * X??a database c???a NeDB khi t???t trang
   * Sau n??y s??? t??ch ra ????? d??? ?????ng b??? c?? s??? d??? li???u
   */
  useEffect(() =>{
    donViDB.remove({}, { multi: true }, function (err, numRemoved) {
    });
    phongBanDB.remove({}, { multi: true }, function (err, numRemoved) {
    });
    nguoiDungDB.remove({}, { multi: true }, function (err, numRemoved) {
    });
    loaiVanBanDB.remove({}, { multi: true }, function (err, numRemoved) {
    });
    linhVucVanBanDB.remove({}, { multi: true }, function (err, numRemoved) {
    });
    const apiTaiKhoan = process.env.REACT_APP_API+"taikhoan/timTaiKhoanTheoID/"+idTaiKhoan;
    fetch(apiTaiKhoan)
    .then(response => response.json())
    .then(data => {
      setTaiKhoan(data);
    }).catch(err => {
      alert("K???t n???i v???i sever th???t b???i");
    });
    const apiDonVi = process.env.REACT_APP_API+"donvi/xuatTatCaDonVi";
    fetch(apiDonVi)
    .then(response => response.json())
    .then(data => {
      donViDB.insert(data);
      data.map((item)=>{
        getPhongBan(item.id);
      })
    }).catch(err => {
      alert(err);
    });
    const apiNguoiDung = process.env.REACT_APP_API+"nguoidung/xuatTatCaNguoiDung";
    fetch(apiNguoiDung)
    .then(response => response.json())
    .then(data => {
      nguoiDungDB.insert(data);
    }).catch(err => {
      alert(err);
    });
    const apiLinhVucVanBan = process.env.REACT_APP_API+"linhvucvanban/xuatTatCaLinhVucVanBan";
    fetch(apiLinhVucVanBan)
    .then(response => response.json())
    .then(data => {
      linhVucVanBanDB.insert(data);
    }).catch(err => {
      alert(err);
    });
    const apiLoaiVanBan = process.env.REACT_APP_API+"loaivanban/xuatTatCaLoaiVanBan";
    fetch(apiLoaiVanBan)
    .then(response => response.json())
    .then(data => {
      loaiVanBanDB.insert(data);
    }).catch(err => {
      alert(err);
    });
  return ()=>{
    donViDB.remove({}, { multi: true }, function (err, numRemoved) {
    });
    phongBanDB.remove({}, { multi: true }, function (err, numRemoved) {
    });
    nguoiDungDB.remove({}, { multi: true }, function (err, numRemoved) {
    });
    loaiVanBanDB.remove({}, { multi: true }, function (err, numRemoved) {
    });
    linhVucVanBanDB.remove({}, { multi: true }, function (err, numRemoved) {
    });
    vanBanGuiDB.remove({}, { multi: true }, function (err, numRemoved) {
    });
    vanBanDenDB.remove({}, { multi: true }, function (err, numRemoved) {
    });
    vanBanDB.remove({}, { multi: true }, function (err, numRemoved) {
    });
  }
},[]);

  /**
   *T??m Ng?????i D??ng theo ID t??i kho???n ???? ????ng nh???p
   *L???y danh s??ch v??n b???n c???a ng?????i d??ng
   */
  useEffect(() => {
    chiTietVanBanGuiDB.remove({}, { multi: true }, function (err, numRemoved) {
    });
    vanBanGuiDB.remove({}, { multi: true }, function (err, numRemoved) {
    });
    vanBanDenDB.remove({}, { multi: true }, function (err, numRemoved) {
    });
    vanBanDB.remove({}, { multi: true }, function (err, numRemoved) {
    });
    nhomDB.remove({}, { multi: true }, function (err, numRemoved) {
    });
    chiTietNhomDB.remove({}, { multi: true }, function (err, numRemoved) {
    });
    vanBanLuuDB.remove({}, { multi: true }, function (err, numRemoved) {
    });
    
    if(logout===false){
      const api = process.env.REACT_APP_API+"nguoidung/timNguoiDungTheoIDTaiKhoan/"+idTaiKhoan;
      fetch(api)
      .then(response => response.json())
      .then(data => {
          if(data.id){
            setNguoiDung(data);
            getVanBanGui(data.id);
            getChiTietVanBanDen(data.id);
            getNhom(data.id);
            getVanBanLuu(data.id);
          }else{
            alert("Kh??ng th??? l???y d??? li???u t??i kho???n");
            localStorage.clear();
            setLogout(true);
          }
      }).catch(err => {
        alert("Kh??ng th??? l???y d??? li???u t??i kho???n");
        localStorage.clear();
        setLogout(true);
      })
    }
    return ()=>{
      chiTietVanBanGuiDB.remove({}, { multi: true }, function (err, numRemoved) {
      });
      vanBanGuiDB.remove({}, { multi: true }, function (err, numRemoved) {
      });
      vanBanDenDB.remove({}, { multi: true }, function (err, numRemoved) {
      });
      vanBanDB.remove({}, { multi: true }, function (err, numRemoved) {
      });
      nhomDB.remove({}, { multi: true }, function (err, numRemoved) {
      });
      chiTietNhomDB.remove({}, { multi: true }, function (err, numRemoved) {
      });
      vanBanLuuDB.remove({}, { multi: true }, function (err, numRemoved) {
      });
    }
  },[change]);

  /**
   * H??m l???y danh s??ch v??n b???n l??u theo ng?????i d??ng
   * @param {number} idNguoiDung 
   */
  function getVanBanLuu(idNguoiDung) {
    const apiNhom = process.env.REACT_APP_API+"vanbanluu/timVanBanLuuTheoNguoiDung/"+idNguoiDung;
    fetch(apiNhom)
    .then(response => response.json())
    .then(data => {
      vanBanLuuDB.insert(data);
    }).catch(err => {
      alert(err);
    });
  }

  /**
   * H??m l???y danh s??ch nh??m c???a ng?????i d??ng
   * @param {number} idNguoiTao 
   */
  function getNhom(idNguoiTao){
    const apiNhom = process.env.REACT_APP_API+"nhom/timNhomTheoIDNguoiTao/"+idNguoiTao;
    fetch(apiNhom)
    .then(response => response.json())
    .then(data => {
      nhomDB.insert(data);
      data.map((item)=>{
        getCTNhom(item.id);
      })
    }).catch(err => {
      alert(err);
    });
  }

  /**
   * L???y danh s??ch chi ti???t nh??m 
   * @param {number} idNhom 
   */
  function getCTNhom(idNhom){
    const apiCTNhom = process.env.REACT_APP_API+"chitietnhom/timChiTietNhomTheoIDNhom/"+idNhom;
    fetch(apiCTNhom)
    .then(response => response.json())
    .then(data => {
      chiTietNhomDB.insert(data);
    }).catch(err => {
      alert(err);
    });
  }

  /**
   * L???y danh s??ch v??n b???n g???i theo id ng?????i g???i
   * @param {number} idNguoiGui 
   */
  function getVanBanGui(idNguoiGui){
    const apiVanBanGui = process.env.REACT_APP_API+"vanbanguinhan/timVanBanGuiNhanTheoNguoiGui/"+idNguoiGui;
          fetch(apiVanBanGui)
          .then(response => response.json())
          .then(data => {
            vanBanGuiDB.insert(data);
            data.map((item)=>{
              getVanBan(item.idVanBan);
            });
          }).catch(err => {
            alert(err);
          });
  }
  
  /**
   * L???y danh s??ch v??n b???n ?????n theo id v???i ??i???u ki???n id ng?????i g???i kh??c id ng?????i d??ng
   * @param {number} idVanBanGui 
   * @param {number} idNguoiDung 
   */
  function getVanBanDen(idVanBanGui,idNguoiDung){
    const apiVanBanDen = process.env.REACT_APP_API+"vanbanguinhan/timVanBanGuiNhanTheoID/"+idVanBanGui;
              fetch(apiVanBanDen)
              .then(response => response.json())
              .then(data =>{
                vanBanDenDB.insert(data);
                if(data.idNguoiGui!==idNguoiDung){
                  getVanBan(data.idVanBan);
                }
              })
              .catch(err =>{
                alert(err);
              })
  }
  /**
   * l???y danh s??ch chi ti???t id v??n b???n ?????n
   * @param {number} idNguoiNhan 
   */
  function getChiTietVanBanDen(idNguoiNhan){
    const apiCTVanBanDen = process.env.REACT_APP_API+"chiTietVanBanGuiNhan/timVanBanGuiNhanTheoNguoiNhan/"+idNguoiNhan;
          fetch(apiCTVanBanDen)
          .then(response => response.json())
          .then(data =>{
            chiTietVanBanGuiDB.insert(data);
            data.map((item)=>{
              getVanBanDen(item.idVanBanGuiNhan,idNguoiNhan);
            });
          }).catch(err =>{
            alert(err+"-ChiTietVanBanDen");
          });
  }

  /**
   * l???y v??n b???n theo id 
   * @param {number} idVanBan 
   */
  function getVanBan(idVanBan){
    vanBanDB.count({id : idVanBan},function(err,count){
      if(count === 0){
        const apiVanBan = process.env.REACT_APP_API+"vanban/timVanBanTheoID/"+idVanBan;
        fetch(apiVanBan)
        .then(response => response.json())
        .then(data => {
          vanBanDB.insert(data);
        })
        .catch(err=>{
          alert(err+"-GetVanBan");
        })
      }
    });
  }

  /**
   * H??m l???y danh s??ch ph??ng ban theo ????n v???
   * @param {number} idDonVi 
   */
  function getPhongBan(idDonVi){
    const apiPhongBan = process.env.REACT_APP_API+"phongban/xuatPhongBanTheoDonVi/"+idDonVi;
      fetch(apiPhongBan)
      .then(response => response.json())
      .then(data => {
        phongBanDB.insert(data);
      }).catch(err => {
        alert(err);
      });
  }

  /**
   * Xu???t ra m??n h??nh t????ng ???ng theo s??? trang
   * @param {number} num s??? trang 
   */
  function getPage(num){
    switch (num) {
      case 1:
        return <ThemVanBan 
        setNumberPage={setNumberPage} 
        loaiVanBanDB={loaiVanBanDB} 
        linhVucVanBanDB ={linhVucVanBanDB}
        donViDB={donViDB}
        phongBanDB={phongBanDB}
        nguoiDungDB={nguoiDungDB}
        onChangeVanBan={onChangeVanBan}
        nguoiDung={nguoiDung}
        nhomDB={nhomDB}
        chiTietNhomDB={chiTietNhomDB}/>
      
      case 2:
        return <VanBanDen
          setNumberPage={setNumberPage} 
          loaiVanBanDB={loaiVanBanDB} 
          linhVucVanBanDB ={linhVucVanBanDB}
          donViDB={donViDB}
          phongBanDB={phongBanDB}
          vanBanDB = {vanBanDB}
          vanBanDenDB ={vanBanDenDB}
          nguoiDungDB={nguoiDungDB}
          vanBanLuuDB={vanBanLuuDB}
          nhomDB={nhomDB}
          chiTietNhomDB={chiTietNhomDB}
          nguoiDung= {nguoiDung}
          onChangeVanBan={onChangeVanBan}
        />

      case 3:
        return <VanBanGui
          setNumberPage={setNumberPage} 
          loaiVanBanDB={loaiVanBanDB} 
          linhVucVanBanDB ={linhVucVanBanDB}
          donViDB={donViDB}
          phongBanDB={phongBanDB}
          vanBanDB = {vanBanDB}
          vanBanGuiDB ={vanBanGuiDB}
          nguoiDungDB={nguoiDungDB}
          vanBanLuuDB={vanBanLuuDB}
          nhomDB={nhomDB}
          chiTietNhomDB={chiTietNhomDB}
          nguoiDung= {nguoiDung}
          onChangeVanBan={onChangeVanBan}
        />
      case 4: 
        return <VanBanGuiLuu
          vanBanLuuDB={vanBanLuuDB}
          vanBanDB={vanBanDB}
          vanBanGuiDB={vanBanGuiDB}
        />
      case 5:
        return <VanBanDenLuu
          vanBanLuuDB={vanBanLuuDB}
          vanBanDB={vanBanDB}
          vanBanDenDB={vanBanDenDB}
        />
      case 8:
        return <Nhom
          nguoiDung = {nguoiDung}
          nhomDB={nhomDB}
          chiTietNhomDB={chiTietNhomDB}
          donViDB={donViDB}
          phongBanDB={phongBanDB}
          nguoiDungDB={nguoiDungDB}
          onChangeVanBan={onChangeVanBan}
        />
      case 6: 
        return <NguoiDung 
          nguoiDung = {nguoiDung}
          setChange = {setChange}
        />
      case 7: 
        return <QuanLyMatKhau
          taiKhoan={taiKhoan}
          setLogout={setLogout}
        />
      default:
        return <div></div>
    }
  }
  /**
   * xu???t Title theo s??? trang
   * @param {number} num s??? trang
   */
  function getTitle(num){
    switch (num) {
      case 1:
        return "Th??m v??n b???n"
      case 2:
        return "V??n B???n ?????n"
      case 3:
        return "V??n B???n G???i ??i"
      case 4: 
        return "V??n B???n G???i L??u"
      case 5: 
        return "V??n B???n ?????n L??u"
      case 6: 
        return "Th??ng Tin Ng?????i D??ng"
      case 7: 
        return "?????i M???t Kh???u"
      case 8: 
        return "Nh??m"
      default:
        return "Qu???n l?? v??n b???n"
    }
  }
  /**
   * X??t n???u logout = true th?? s??? chuy???n h?????ng v??? trang ????ng nh???p
   * logout = false th?? s??? xu???t ra giao di???n trang ch???
   */
  if(logout){
    return(
      <Redirect to="/"/>
    )
  }else{
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
            >
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              {getTitle(numberPage)}
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={10} color="secondary"> 
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <Avatar src="https://cover-talk.zadn.vn/1/b/1/1/9/fd5acc4603e57c71a7ad42bb9fc20433.jpg" />
            <h2>{nguoiDung.tenNguoiDung}</h2>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List><VanBanMenu setNumberPage={setNumberPage}/></List>
          <Divider />
          <List><NguoiDungMenu setLogout={setLogout} setNumberPage={setNumberPage} setOpen={setOpen}/></List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={0}>
              <Grid item xs={12} md={8} lg={12}>
                <Paper className={fixedHeightPaper}>
                  {getPage(numberPage)}
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </main>cd
      </div>
    );
  }
}