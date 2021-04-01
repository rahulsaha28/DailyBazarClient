import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { Panel } from 'rsuite';
import { ProductContext } from '../../App';
import notify from '../Message/Message';
import { URL } from '../Utility/Utility';

const ProductForm = () => {
    const { register, handleSubmit } = useForm();
    const [imageURL, setImageURL] = useState(null);
    const [setProducts] = useContext(ProductContext);
    const history = useHistory();
    // get notification


    const handelProductSubmit = data => {
        if (imageURL) {
            
            const newProduct = {
                name: data.product_name,
                weigth: data.product_weigth,
                price: data.product_price,
                imageURL: imageURL
            }
            fetch(`${URL}/product/create`, {
                method: 'POST',
                body:JSON.stringify(newProduct),
                headers:{
                    'Content-Type': 'application/json'
                }
                
            })
            .then(res=>res.json())
            .then(result=>{
                if(result.success){
                   notify('success', result.success); 
                   fetch(`${ URL }/product/all`)
                   .then(res=>res.json())
                   .then(result=>{
                       setProducts(result)
                       history('/');
                    })
                }
                else{
                    notify('error', result.error); 
                }
            })
            
        }
    }

    // image upload in the server
    const ImgUpload = async (event) => {

        const imgData = new FormData()
        imgData.set('key', 'c4f6603f0e25e4296b5532b45d55de3c')
        await imgData.append('image', event.target.files[0])

        await fetch('https://api.imgbb.com/1/upload', {
            method: "POST",
            body: imgData,
            'Content-Type': 'multipart/form-data'
        })
            .then(res => res.json())
            .then(data => setImageURL(data.data.url))


    }
    return (
        <form layout="inline" onSubmit={handleSubmit(handelProductSubmit)}>
            <Panel bordered>
                <div className="row mb-4">
                    <div className="col">
                        <input type="text" className="form-control" name="product_name" placeholder="Product Name" ref={register({ required: true })} />
                    </div>
                    <div className="col">
                        <input type="number" className="form-control" name="product_wight" placeholder="Product Wight" ref={register({ required: true, min: 1 })} />
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col">
                        <input type="number" className="form-control" name="product_price" placeholder="Product Price" ref={register({ required: true, min: 10 })} />
                    </div>
                    <div className="col">
                        <input type="file" className="form-control" name="product_image" placeholder="Product  Icon" ref={register({ required: true })} onChange={ImgUpload} />
                    </div>
                </div>
            </Panel>

            <button className="btn btn-primary mt-3">Save</button>
        </form>



    );
};

export default ProductForm;