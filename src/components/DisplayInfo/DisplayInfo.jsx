import React from 'react';
import Card from '../Card/Card';
import styles from './DisplayInfo.module.css';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function DisplayInfo(props){
    const processData = () => {
        const companyWise = {}
        for(let i=0;i<props.data.length;i++)
        {
            companyWise[props.data[i].product_name] = []
        }
        for(let i=0;i<props.data.length;i++)
        {
            companyWise[props.data[i].product_name].push(props.data[i])
        }
        return companyWise;
    }
    const data = processData();
    const keys = Object.keys(data);
    const settings={
        infinite: true,
        speed: 400,
        slidesToShow: props.data.length>2?2:1,
        slidesToScroll: props.data.length>2?2:1,
        prevArrow: <img src="https://img.icons8.com/external-those-icons-fill-those-icons/24/ffffff/external-left-arrows-those-icons-fill-those-icons-4.png" alt="prev"/>,
        nextArrow: <img src="https://img.icons8.com/ios-filled/50/ffffff/chevron-right.png" alt="next"/>,
        responsive: [
            {
                breakpoint: 1260,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                }
            }
        ]
    }
    return(
        <div className={styles.container}>
            <div>
                <h1 className={styles.header}>
                    Edvora
                </h1>
                <h4 className={styles.subHeader}>
                    Products
                </h4>
            </div>
            <div className={styles.content}>
            {
                keys.map((item,idx)=>
                    <div key={idx} className={styles.cardContainer}>
                        <h5 key={idx} className={styles.productHeaders}>{item}</h5>
                        <div className={styles.slider}>
                            <Slider {...settings}>
                            {
                                data[item].map((i,idx)=><Card data={i} key={idx}/>)
                            }
                            </Slider>
                        </div>
                    </div>
                )
            }
            </div>
        </div>
    )
}

export default DisplayInfo;