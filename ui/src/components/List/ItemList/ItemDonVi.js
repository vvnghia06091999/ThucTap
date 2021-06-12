import React,{useState} from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ListItem from '@material-ui/core/ListItem';
import ListPhongBan from '../ListPhongBan';
import Typography from '@material-ui/core/Typography';

function ItemDonVi(props){
    const [isCheckAll,setIsCheckAll] = useState(false);
    return (
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
                        label={props.donVi.tenDonVi}
                    /> */}
                    <Typography variant="h5">{props.donVi.tenDonVi}</Typography>
                </Grid>
                <Grid item sm={12}>
                        <ListPhongBan 
                            listPhongBan={props.listPhongBan}
                            listNguoiDung = {props.listNguoiDung}
                            updateNguoiDungCheck={props.updateNguoiDungCheck}
                        />
                </Grid>
            </Grid>
        </ListItem>
    )
}

export default ItemDonVi;