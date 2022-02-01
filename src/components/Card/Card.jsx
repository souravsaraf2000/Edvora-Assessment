import React from 'react';
import styles from './Card.module.css'

function Card(props) {
    return ( 
        <div className={styles.container}>
            <div className={styles.info}>
                <div className={styles.imageContainer}>
                    <img src={props.data.image} alt="item" className={styles.image}/>
                </div>
                <div className={styles.productInfo}>
                    <p className={styles.pname}>
                        {props.data.product_name}
                    </p>
                    <p className={styles.bname}>
                        {props.data.brand_name}
                    </p>
                    <p className={styles.price}>
                        $ {props.data.price}
                    </p>
                </div>
            </div>
            <div className={styles.moreInfo}>
                <div className={styles.upperDiv}>
                    <div>
                        <p className={styles.location}>{props.data.address.state},{props.data.address.city}</p>
                    </div>
                    <div>
                        <p className={styles.date}>Date: {props.data.date.substring(8,10)}/{props.data.date.substring(5,7)}/{props.data.date.substring(0,4)}</p>
                    </div>
                </div>
                <div>
                    <p className={styles.des}>{props.data.discription}</p>
                </div>
            </div>
        </div>
     );
}

export default Card;