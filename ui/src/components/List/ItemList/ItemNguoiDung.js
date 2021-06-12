import React,{useState} from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';

function ItemNguoiDung(props){
    const [nguoiDung] = useState(props.nguoiDung);
    const [isCheck,setIsCheck] = useState(props.nguoiDung.isCheck);

    if(props.checkNhom)
        return(
            <ListItem>
                <Typography variant="h7">
                    {nguoiDung.tenNguoiDung}
                </Typography>
            </ListItem>
        )
    else
        return(
            <ListItem>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={isCheck}
                            onChange={()=>{props.updateNguoiDungCheck(nguoiDung.id);setIsCheck(!isCheck)}}
                            color="primary"
                        />
                    }
                    label={nguoiDung.tenNguoiDung}
                />
            </ListItem>
        )
}

export default ItemNguoiDung;