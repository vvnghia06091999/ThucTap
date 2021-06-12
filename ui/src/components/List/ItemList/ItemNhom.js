import React,{useState} from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ListItem from '@material-ui/core/ListItem';
import ListCTNhom from '../ListCTNhom';

function ItemNhom(props){
    const [isCheckAll,setIsCheckAll] = useState(false);

    return (
        <ListItem>
            <Grid container spacing={0}>
                <Grid item sm={12}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={isCheckAll}
                                onChange={()=>{setIsCheckAll(!isCheckAll)}}
                                color="primary"
                            />
                        }
                        label={props.nhom.tenNhom}
                    />
                </Grid>
                <Grid item sm={12}>
                    <ListCTNhom 
                        isCheckAll = {isCheckAll}
                        listCTNhom={props.listCTNhom}
                        listNguoiDung = {props.listNguoiDung}
                        updateNguoiDungCheck={props.updateNguoiDungCheck}
                    />
                </Grid>
            </Grid>
        </ListItem>
    )
}

export default ItemNhom;