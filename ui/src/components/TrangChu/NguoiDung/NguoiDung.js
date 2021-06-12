import React,{useState} from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';


const styles = {
    cardCategoryWhite: {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    cardTitleWhite: {
      color: "#FFFFFF",
      marginTop: "0px",
      minHeight: "auto",
      fontWeight: "300",
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      marginBottom: "3px",
      textDecoration: "none"
    },
    input: {
        display: 'none',
    }
  };
const useStyles = makeStyles(styles);

function NguoiDung(props){
    const classes = useStyles();
    const [idNguoiDung,setIDNguoiDung] = useState(props.nguoiDung.id);
    const [email,setEmail] = useState(props.nguoiDung.email);
    const [soDienThoai,setSoDienThoai] = useState(props.nguoiDung.soDienThoai);
    const [photo,setPhoto] = useState(props.nguoiDung.photo);

    function updateNguoiDung(idNguoiDung){
        const api = process.env.REACT_APP_API+"nguoidung/capNhatNguoiDung/"+idNguoiDung;
        const requestOptions ={
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                email : email,
                soDienThoai : soDienThoai ,
                photo : photo
            })
        };
        fetch(api,requestOptions)
        .then(response => response.json())
        .then(data => {
            props.setChange();
            alert("Lưu thành công");
        }).catch(err=>{
            alert("Kết nối với sever thất bại")
        })
    }

    return (
        <div>
            <Grid container justify="left" spacing={2}>
                <Grid item sm={7}>
                    <Typography variant="h4" gutterBottom>
                        Thông Tin Người Dùng
                    </Typography>
                </Grid>
                <Grid item sm={4}>
                        <Typography variant="h4" gutterBottom>
                            Ảnh Đại Diện
                        </Typography>
                    </Grid>
                <Grid container justify="center" spacing={2} sm={7}>
                    <Grid item sm={12}>
                        <TextField
                            label="Email"
                            fullWidth
                            variant="outlined"
                            value={email}
                            onChange={(e) =>{setEmail(e.target.value)}}
                        />
                    </Grid>
                    <Grid item sm={12}>
                        <TextField
                            label="Số Điện Thoại"
                            fullWidth
                            variant="outlined"
                            value={soDienThoai}
                            onChange={(e) =>{setSoDienThoai(e.target.value)}}
                        />
                    </Grid>
                    <Grid item sm={3} >
                        <Button variant="contained" color="primary" onClick={() => {updateNguoiDung(idNguoiDung)}}>
                            Lưu
                        </Button>
                    </Grid>
                </Grid>
                <Grid container justify="center" spacing={2} sm={4}>
                    <Grid item sm={9}>
                        <Avatar 
                            style={{ height: '200px', width: '200px' }} 
                            src="https://cover-talk.zadn.vn/1/b/1/1/9/fd5acc4603e57c71a7ad42bb9fc20433.jpg" 
                        />
                    </Grid>
                    <Grid item sm={6}>
                        <input
                            className={classes.input}
                            id="contained-button-file"
                            multiple
                            type="file"
                            onChange={(e)=>{setPhoto(e.target.value)}}
                        />
                        <label htmlFor="contained-button-file">
                            <Button variant="contained" color="primary" component="span" >
                                Thay Đổi Ảnh
                            </Button>
                        </label>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default NguoiDung;