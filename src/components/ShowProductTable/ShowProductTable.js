import React, { useContext, useEffect } from 'react';
import { Button, Icon, Table } from 'rsuite';
import { ProductContext } from '../../App';
import notify from '../Message/Message';
import { URL } from '../Utility/Utility';


const ShowProductTable = () => {
    const [products, setProducts] =  useContext(ProductContext)
    const { Column, HeaderCell, Cell } = Table;
    
    return (
        
            <Table style={{width:'100%'}} height={400} data={products}>
                <Column width={220} align="center" fixed>
                    <HeaderCell>Product Name</HeaderCell>
                    <Cell dataKey="name"/>
                    
                </Column>
                <Column width={70}>
                    <HeaderCell>Weight</HeaderCell>
                    <Cell dataKey="weight"/>
                    
                </Column>
                <Column width={100}>
                    <HeaderCell>Price</HeaderCell>
                    <Cell dataKey="price"/>
                    
                </Column>
                <Column width={200}>
                    <HeaderCell>Action</HeaderCell>
                    <Cell>
                        {
                            rowData=>{
                                
                                // product delete function by id
                                const handelDelete = ()=>{
                                    console.log(rowData)
                                    fetch(`${ URL}/product/delete`,{
                                        method:"DELETE",
                                        headers:{
                                            'Content-Type':'application/json'
                                        },
                                        body:JSON.stringify({id:rowData._id})
                                    })
                                    .then(res=>res.json())
                                    .then(result=>{
                                        fetch(`${URL}/product/all`)
                                        .then(res=>res.json())
                                        .then(result=>result.error?notify('error', result.error):setProducts(result))
                                        result.success?notify('success', result.success):notify('error', result.error);
                                    })
                                }
                                return(
                                    <span>
                                        <Button color="yellow">
                                            <Icon icon="edit2"/>
                                        </Button>
                                        <Button onClick={handelDelete} className="ms-3" color="red" >
                                        <Icon icon="trash" />
                                        </Button>
                                    </span>
                                )
                            }
                        }
                    </Cell>
                    
                </Column>

            </Table>
       
    );
};

export default ShowProductTable;