import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import styles from './FilterComponent.module.css'

function Filter(props) {
    const [selectedProduct, setselectedProduct] = useState('');
    const [selectedState, setselectedState] = useState('');
    const [selectedCity, setselectedCity] = useState('');
    const productChange = (e) => {
        setselectedProduct(e.target.value);
        setselectedState('');
        setselectedCity('');
        props.handleProduct(e.target.value);
    }

    const stateChange = (e) => {
        setselectedState(e.target.value);
        setselectedCity('');
        props.handleState(selectedProduct,e.target.value,selectedCity);
    }

    const cityChange = (e) => {
        setselectedCity(e.target.value)
        props.handleCity(selectedProduct,selectedState,e.target.value)
    }

    const handleReset = () => {
        props.handleReset();
        setselectedProduct('');
        setselectedState('');
        setselectedCity('')
    }
    const {productList,city,state} = props;
    return ( 
        <div className={styles.container}>
            <h1 className={styles.header}>
                Filters
            </h1>
            <div className={styles.filters}>
                <div>
                    <FormControl sx={{ minWidth: 120 }} fullWidth size="small">
                        <InputLabel id="demo-simple-select-helper-label" style={{
                            color: selectedProduct.length===0 && (selectedState.length>0 || selectedCity.length>0)?'#646464':'#fff'
                        }}>Product</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            label="Product"
                            style={{
                                backgroundColor:'#848484',
                                color: 'white'
                            }}
                            value = {selectedProduct}
                            disabled = {selectedProduct.length===0 && (selectedState.length>0 || selectedCity.length>0)}
                            onChange = {(e)=>productChange(e)}
                        >
                            {
                                productList.map((item,index)=><MenuItem value={item} key={index}>{item}</MenuItem>)
                            }
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <FormControl sx={{ minWidth: 120 }} fullWidth size="small">
                        <InputLabel id="demo-simple-select-helper-label" style={{
                            color: selectedState.length===0 && selectedCity.length>0?'#646464':'#fff'
                        }}>State</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            label="State"
                            value = {selectedState}
                            disabled={selectedState.length===0 && selectedCity.length>0}
                            style={{
                                backgroundColor:'#848484',
                                color: 'white'
                            }}
                            onChange = {(e)=>stateChange(e)}
                        >
                            {
                                state.map((item,index)=><MenuItem value={item} key={index}>{item}</MenuItem>)
                            }
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <FormControl sx={{ minWidth: 120 }} fullWidth size="small">
                        <InputLabel id="demo-simple-select-helper-label" style={{
                            color:'#fff'
                        }}>City</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            label="City"
                            value = {selectedCity}
                            style={{
                                backgroundColor:'#848484',
                                color: 'white'
                            }}
                            onChange = {(e)=>cityChange(e)}
                        >
                            {
                                city.map((item,index)=><MenuItem value={item} key={index}>{item}</MenuItem>)
                            }
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <button className="btn btn-secondary" onClick={handleReset}>Reset</button>
                </div>
            </div>
        </div>
     );
}

export default Filter;