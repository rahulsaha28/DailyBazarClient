import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Divider, Loader, Panel } from 'rsuite';
import { ProductContext } from '../../App';
import CheckEachProduct from '../CheckEachProduct/CheckEachProduct';
import notify from '../Message/Message';
import { URL } from '../Utility/Utility';

const CheckOut = () => {
    const [user, products, checkOutProducts, setCheckOutProducts] = useContext(ProductContext);
    const { id } = useParams()
    const history = useHistory();
    // const [checkButton, setCheckButton] = useState(false);
    useEffect(() => {

        

        let newproduct = products.find(product => product._id == id)
        if (checkOutProducts.length > 0) {

            let checkSameProduct = checkOutProducts.find(checkOutProduct => checkOutProduct._id == id) || false

            if (checkSameProduct === false) {

                setCheckOutProducts([...checkOutProducts, { ...newproduct, quantity: 1 }]);

            }
            else {
                let notMatchNewProduct = checkOutProducts.filter(checkOutProduct => checkOutProduct._id != checkSameProduct._id)
                
                setCheckOutProducts([...notMatchNewProduct, { ...checkSameProduct, quantity: checkSameProduct.quantity + 1 }]);

            }
            

        }
        else {

            setCheckOutProducts([{ ...newproduct, quantity: 1 }]);

        }
        

    }, [id])

    const calculateTotalPrice = ()=>{
        if(checkOutProducts.length>0){
            return checkOutProducts.reduce((sum, currentProduct)=>sum+(currentProduct.price*currentProduct.quantity),0)
        }
        return 0;
    }

    // check out
    const handelCheckOut = ()=>{

       
        const newOrder  = {
            email:user.email,
            products:checkOutProducts
        }
        fetch(`${URL}/order/create`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(newOrder)

        })
        .then(res=>res.json())
        .then(result=>{
            if(result.success){
              setCheckOutProducts([]);
              notify('success', result.success); 
              history.replace('/orders');

            }
            else{
                notify('error', result.error);
            }
            
        })
        
    }

    return (
        <div className="row">
            <div className="col-md-12">
                {checkOutProducts.length>0?
                <>
                <Panel header="CheckOut" shaded>
                    <div className="d-flex justify-content-around">
                        <span>Description</span>
                        <span>Quantity</span>
                        <span>Price</span>
                    </div>
                    <Divider />
                    {checkOutProducts.map(checkOutProduct => <CheckEachProduct key={Math.random()} checkOutProduct={checkOutProduct}/>)}
                    <Divider/>
                    <div className="d-flex justify-content-around">
                        <span>Total</span>
                        <span>{calculateTotalPrice()}</span>
                    </div>
                </Panel>
                <div className="d-flex justify-content-end mt-3">
                    <Button color="cyan" onClick={()=>handelCheckOut()} >Check Out</Button>
                </div>
                </>
                :
                <Loader size="lg" content="Loading" center />
                }
            </div>
        </div>
    );
};

export default CheckOut;