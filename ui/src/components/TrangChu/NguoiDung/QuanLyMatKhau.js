import React,{useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';


function QuanLyMatKhau(props){
    const [taiKhoan] = useState(props.taiKhoan);
    const [matKhau,setMatKhau] = useState();
    const [matKhauMoi,setMatKhauMoi] = useState();
    const [nhapLaiMatKhauMoi,setNhapLaiMatKhauMoi] = useState();

    function capNhatMatKhau(matKhau,matKhauMoi,nhapLaiMatKhauMoi){
        if(matKhau !== taiKhoan.matKhau){
            alert("Mật khẩu cũ không chính xác");
        }else if(matKhauMoi !== nhapLaiMatKhauMoi){
            alert("Nhập lại mật khẩu không trùng khớp với mật khẩu mới");
        }else{
            const api = process.env.REACT_APP_API+"taikhoan/capNhatMatKhau/"+taiKhoan.id;
            const requestOptions ={
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    matKhau : matKhauMoi
                })
            };
            fetch(api,requestOptions)
        .then(response => response.json())
        .then(data => {
            alert("Bạn đã thay đổi mật khẩu cần phải đăng nhập lại");
            localStorage.clear();
            props.setLogout(true);
        }).catch(err=>{
            alert("Kết nối với sever thất bại")
        })
        }
    }

    return(
        <div>
            <Grid container justify="center" spacing={2}>
                <Grid container justify="center" sm={12}>
                    <Typography variant="h4" gutterBottom>
                        Thay Đổi Mật Khẩu
                    </Typography>
                </Grid>
                <Grid container justify="center" sm={12}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        label="Nhập Mật Khẩu Cũ"
                        type="password"
                        autoComplete="current-password"
                        value = {matKhau}
                        onChange={(e) => setMatKhau(e.target.value)}
                    >
                    </TextField>
                </Grid>
                <Grid container justify="center" sm={12}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        label="Nhập Mật Khẩu Mới"
                        type="password"
                        autoComplete="current-password"
                        value = {matKhauMoi}
                        onChange={(e) => setMatKhauMoi(e.target.value)}
                    >
                    </TextField>
                </Grid>
                <Grid container justify="center" sm={12}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        label="Nhập Lại Mật Khẩu Mới"
                        type="password"
                        autoComplete="current-password"
                        value = {nhapLaiMatKhauMoi}
                        onChange={(e) => setNhapLaiMatKhauMoi(e.target.value)}
                    >
                    </TextField>
                </Grid>
                <Grid container justify="center" sm={12}>
                    <Button variant="contained" color="primary" onClick={() => {capNhatMatKhau(matKhau,matKhauMoi,nhapLaiMatKhauMoi)}}>
                        Lưu
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default QuanLyMatKhau;