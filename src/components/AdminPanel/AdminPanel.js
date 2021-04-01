import React, { useState } from 'react';
import { Icon, Nav, Sidenav } from 'rsuite';
import ProductForm from '../ProductForm/ProductForm';
import ShowProductTable from '../ShowProductTable/ShowProductTable';


const AdminPanel = () => {
    const [isform, setForm] =   useState(true)

    const handelManageProduct = ()=>{
        setForm(true);
    }
    const handelAddProduct = ()=>{
        setForm(false)
    }
    return (
        <div className="row">
            <div className="col-md-12 d-flex">
                <div style={{width:250}}>
                    <Sidenav defaultOpenKeys={['1','2','3']}>
                        <Sidenav.Body>
                            <Nav>
                                <Nav.Item eventKey="1" icon={<Icon icon="gear-circle"/>} onSelect={()=>handelManageProduct()}>
                                    Manage Product 
                            </Nav.Item>
                                <Nav.Item onSelect={()=>handelAddProduct()} eventKey="2" icon={<Icon icon='plus' />}>
                                    Add Product
                            </Nav.Item>
                                <Nav.Item eventKey="3" icon={<Icon icon="edit2"/>}>
                                    Edit Product
                            </Nav.Item>
                            </Nav>

                        </Sidenav.Body>
                    </Sidenav>
                </div>
                <div className="ms-2 col-md-8">
                    { !isform && <ProductForm/>}
                    { isform && <ShowProductTable/>}
                   
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;