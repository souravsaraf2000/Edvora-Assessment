import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';
import LandingPage from './components/landingPage/landingPage';

function App() {
  const [data, setData] = useState([])
  const [details, setDetails] = useState({
    products:[],
    state: [],
    city: [],
    filterData : {},
    productData : {},
    stateWiseData : {},
    cityWiseData: {},
    stateCityMap : {},
    productCityMap : {}
  })
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('https://assessment-edvora.herokuapp.com/');
      setData(res.data);
      let allProducts = [];
      let allState = [];
      let allCity = [];
      let stateWise = {};
      let cityWise = {};
      let filterData = {};
      let productData = {};
      let stateCityMap = {};
      let productCityMap = {};
      if(res.data.length>0)
      {
        for(let i=0;i<res.data.length;i++)
        {
          allProducts.push(res.data[i].product_name)
          allState.push(res.data[i].address.state)
          allCity.push(res.data[i].address.city)
          filterData[res.data[i].product_name] = {}
          productData[res.data[i].product_name] = []
          stateWise[res.data[i].address.state] = []
          cityWise[res.data[i].address.city] = []
          stateCityMap[res.data[i].address.state] = []
          productCityMap[res.data[i].product_name] = []
        }
        for(let i=0;i<res.data.length;i++)
        {
          filterData[res.data[i].product_name][res.data[i].address.state] = []
          productData[res.data[i].product_name].push(res.data[i])
          stateWise[res.data[i].address.state].push(res.data[i]);
          cityWise[res.data[i].address.city].push(res.data[i]);
          stateCityMap[res.data[i].address.state].push(res.data[i].address.city);
          productCityMap[res.data[i].product_name].push(res.data[i].address.city);
        }
        for(let i=0;i<res.data.length;i++)
        {
          filterData[res.data[i].product_name][res.data[i].address.state].push(res.data[i].address.city)
          filterData[res.data[i].product_name][res.data[i].address.state] = [...new Set(filterData[res.data[i].product_name][res.data[i].address.state])]
          stateCityMap[res.data[i].address.state] = [...new Set(stateCityMap[res.data[i].address.state])]
          productCityMap[res.data[i].product_name] = [...new Set(productCityMap[res.data[i].product_name])]
        }
        allProducts = [...new Set(allProducts)]
        allState = [...new Set(allState)]
        allCity = [...new Set(allCity)]
        setDetails({
          products: allProducts,
          state: allState,
          city: allCity,
          filterData: filterData,
          productData: productData,
          stateWiseData: stateWise,
          cityWiseData: cityWise,
          stateCityMap: stateCityMap,
          productCityMap: productCityMap
        })
      }
      else
      {
        fetchData();
      }
    };
    fetchData();
    },
    []
  );
  console.log('Data:-',data)
  return (
    <div className="App">
      <LandingPage details={details} data={data}/>
    </div>
  );
}

export default App;
