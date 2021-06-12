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
  // Sử dụng style
  const classes = useStyles();

  // Tạo Nedb
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

  const [open, setOpen] = useState(true); // Điều chỉnh kích thước
  const [logout,setLogout] = useState(false); // Điều kiện để logout
  const [idTaiKhoan] = useState(localStorage.getItem('IdTaiKhoan')) // Lấy id Tài Khoản từ localStorage
  const [numberPage,setNumberPage] = useState(0); // số Page
  const [nguoiDung,setNguoiDung] = useState(''); // người dùng
  const [change,setChange] = useState(1);
  const [taiKhoan,setTaiKhoan] = useState();
  
  // Hàm chỉnh kích thước
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
   * Tải các dữ liệu liên quan và lưu vào NeDB khi khởi động
   * Xóa database của NeDB khi tắt trang
   * Sau này sẽ tách ra để dễ đồng bộ cơ sở dữ liệu
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
      alert("Kết nối với sever thất bại");
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
   *Tìm Người Dùng theo ID tài khoản đã đăng nhập
   *Lấy danh sách văn bản của người dùng
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
            alert("Không thể lấy dữ liệu tài khoản");
            localStorage.clear();
            setLogout(true);
          }
      }).catch(err => {
        alert("Không thể lấy dữ liệu tài khoản");
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
   * Hàm lấy danh sách văn bản lưu theo người dùng
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
   * Hàm lấy danh sách nhóm của người dùng
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
   * Lấy danh sách chi tiết nhóm 
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
   * Lấy danh sách văn bản gửi theo id người gửi
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
   * Lấy danh sách văn bản đến theo id với điều kiện id người gửi khác id người dùng
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
   * lấy danh sách chi tiết id văn bản đến
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
   * lấy văn bản theo id 
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
   * Hàm lấy danh sách phòng ban theo đơn vị
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
   * Xuất ra màn hình tương ứng theo số trang
   * @param {number} num số trang 
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
   * xuất Title theo số trang
   * @param {number} num số trang
   */
  function getTitle(num){
    switch (num) {
      case 1:
        return "Thêm văn bản"
      case 2:
        return "Văn Bản Đến"
      case 3:
        return "Văn Bản Gửi Đi"
      case 4: 
        return "Văn Bản Gửi Lưu"
      case 5: 
        return "Văn Bản Đến Lưu"
      case 6: 
        return "Thông Tin Người Dùng"
      case 7: 
        return "Đổi Mật Khẩu"
      case 8: 
        return "Nhóm"
      default:
        return "Quản lý văn bản"
    }
  }
  /**
   * Xét nếu logout = true thì sẽ chuyển hướng về trang đăng nhập
   * logout = false thì sẽ xuất ra giao diện trang chủ
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