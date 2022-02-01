import React, { useState } from 'react';
import DisplayInfo from '../DisplayInfo/DisplayInfo';
import Filter from '../Filter/FilterComponent';
import styles from './landingPage.module.css'

function LandingPage(props) {
    const [state,setState] = useState([])
    const [city,setCity] = useState([])
    const [data,setData] = useState([])
    const handleProduct = (product) => {
        setData(props.details.productData[product]);
        setState(Object.keys(props.details.filterData[product]))
        setCity(props.details.productCityMap[product])
    }
    const handleState = (product,state) =>{
        if(product!=='')
        {
            const newData = props.details.productData[product].filter(item=>item.address.state===state)
            setData(newData)
            setCity(props.details.filterData[product][state])
        }
        else
        {
            setCity(props.details.stateCityMap[state])
            setData(props.details.stateWiseData[state])
        }
    }
    const handleCity = (product,state,city) => {
        if(product!=='' && state!=='')
        {
            const newData = props.details.productData[product].filter(item=>item.address.state===state && item.address.city===city)
            setData(newData)
        }
        else if(product!=='')
        {
            const newData = props.details.productData[product].filter(item=>item.address.city===city)
            setData(newData)
        }
        else
        {
            setData(props.details.cityWiseData[city])
        }
    }

    const handleReset = () => {
        setCity('')
        setState('')
        setData([])
    }
    // console.log('Data:-',props.details)
    return ( 
        <div className={styles.container}>
            <div className={styles.filterDiv}>
                <Filter handleReset={handleReset} handleCity={handleCity} handleState = {handleState} handleProduct = {handleProduct} productList={props.details.products} city={city.length>0?city:props.details.city} state={state.length>0?state:props.details.state}/>
            </div>
            <div className={styles.productDiv}>
                <DisplayInfo data = {data.length>0?data:props.data}/>
            </div>
        </div>
     );
}

export default LandingPage;