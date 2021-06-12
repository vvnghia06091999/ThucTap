import React,{useState} from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListNguoiDung from '../ListNguoiDung';
import Typography from '@material-ui/core/Typography';

function ItemPhongBan(props){
    const [phongBan] = useState(props.phongBan);
    const [isCheckAll,setIsCheckAll] = useState(false);
    return(
        <ListItem>
            <Grid container spacing={0}>
                <Grid item sm={12}>
                    {/* <FormControlLabel
                        control={
                            <Checkbox
                                checked={isCheckAll}
                                onChange={()=>{setIsCheckAll(!isCheckAll)}}
                                color="primary"
                            />
                        }
                        label={props.phongBan.tenPhongBan}
                    /> */}
                    <Typography variant="h6">{props.phongBan.tenPhongBan}</Typography>
                </Grid>
                <Grid item sm={12}>
                        <ListNguoiDung 
                            listNguoiDung={props.listNguoiDung}
                            updateNguoiDungCheck={props.updateNguoiDungCheck}
                        />             
                </Grid>
            </Grid>
        </ListItem>
    )
}

export default ItemPhongBan;