import React,{useState,useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import  { Redirect } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },}));

export default function DangNhapView() {
    const classes = useStyles();
    const [tenTaiKhoan,setTenTaiKhoan] = useState();  
    const [matKhau,setMatKhau] = useState();
    const [login,setLogin] = useState(false);
    const [idTaiKhoan,setIdTaiKhoan] = useState(localStorage.getItem('IdTaiKhoan'));

    useEffect(() =>{
      if(idTaiKhoan){
        setLogin(true);
      }else{
        localStorage.clear();
        setLogin(false);
      }
    },[])
      

    function DangNhap(tenTaiKhoan,matKhau){
      const api = process.env.REACT_APP_API+"taikhoan/dangNhap";
      const requestOptions ={
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
              tenTaiKhoan : tenTaiKhoan,
              matKhau : matKhau
           })
      };
      fetch(api,requestOptions)
      .then(response => response.json())
      .then(data => {
          if(data.id){
              setIdTaiKhoan(data.id)
              localStorage.setItem('IdTaiKhoan',data.id)
              setLogin(true)
          }
          else{
            alert("Tên đăng nhập hoặc mật khẩu không chính xác !!!")
          }
      }).catch(err=>{
        alert("Kết nối với sever thất bại");
      })
  }


    if(!login){
      return (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Đăng Nhập
            </Typography>
            <div className={classes.form}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Tên đăng nhập"
                autoFocus
                value = {tenTaiKhoan}
                onChange={(e) => setTenTaiKhoan(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                value = {matKhau}
                onChange={(e) => setMatKhau(e.target.value)}
                label="Password"
                type="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="button"
                fullWidth
                variant="contained" 
                color="primary"
                className={classes.submit}
                onClick={()=>{DangNhap(tenTaiKhoan,matKhau)}}
              >
                Đăng Nhập
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </div>
          </div>
        </Container>
      );
    }else {
      return(
        <Redirect to="/trangChu"/>
      )
    }
  }
