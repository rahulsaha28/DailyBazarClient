import React from 'react';

const CheckEachProduct = (props) => {
    const {name, quantity ,price} = props.checkOutProduct;
    return (
        <div className="d-flex justify-content-around">
            <span>{name}</span>
            <span>{quantity}</span>
            <span>{price}</span>
        </div>
    );
};

export default CheckEachProduct;