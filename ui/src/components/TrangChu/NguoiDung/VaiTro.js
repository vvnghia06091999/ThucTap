import React,{useState} from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

function VaiTro(props) {
    const[vaiTro,setVaiTro] = useState(props.vaiTro);
    return(
        <Select
            fullWidth
            value = {vaiTro}
            onChange={(e)=>{props.updateVaiTroNguoiDung(e.target.value);setVaiTro(e.target.value)}}
            >
            <MenuItem value={"Xem Để Biết"}>Xem Để Biết</MenuItem>
            <MenuItem value={"Xử Lý Chính"}>Xử Lý Chính</MenuItem>
            <MenuItem value={"Đồng Xử Lý"}>Đồng Xử Lý</MenuItem>
        </Select>
    )
}

export default VaiTro;