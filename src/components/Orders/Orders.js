import React, { useContext, useEffect, useState } from 'react';
import { Placeholder, Table } from 'rsuite';
import { ProductContext } from '../../App';
import notify from '../Message/Message';
import { URL } from '../Utility/Utility';

const Orders = () => {
    const { Column, Cell, HeaderCell } = Table;
    const [user] = useContext(ProductContext);
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        fetch(`${URL}/order/search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: user.email })
        })
            .then(res => res.json())
            .then(result => {
                result.error ? notify('info', result.error) : setOrders(result)
            });

    }, [user.email])


    let month = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct',
        'Nov', 'Dec'
    ]
    return (
        <div className="row">
            <div className="col-md-12">
                {orders.length > 0 ?
                    <Table
                        data={orders}
                        style={{ width: '100%' }}
                        height={500}

                    >
                        <Column width={120} sortable={true}>
                            <HeaderCell>INVOICE NO</HeaderCell>
                            <Cell>{colData => {
                                return `#${colData._id.slice(0, 7)}`
                            }}</Cell>
                        </Column>
                        <Column width={250}>
                            <HeaderCell>Date</HeaderCell>
                            <Cell>
                                {colData => {
                                    let date = new Date(colData.date);
                                    let d = <span style={{color:'gray'}}>{`${date.getDate()}  ${month[date.getMonth()]}  ${date.getFullYear()}`}</span>
                                    return (
                                        d
                                    )
                                }}
                            </Cell>
                        </Column>
                        <Column width={220}>
                            <HeaderCell>Email</HeaderCell>
                            <Cell dataKey="email" />
                        </Column>
                        <Column width={300}>
                            <HeaderCell>Product</HeaderCell>
                            <Cell>
                                {colData => {
                                    return colData.products.reduce((pre, product) => pre + product.name + ` ( ${product.quantity} ) `, ' ')
                                }}
                            </Cell>
                        </Column>
                        <Column width={120}>
                            <HeaderCell>Total</HeaderCell>
                            <Cell>{colData => {
                                return colData.products.reduce((sum, product) => sum + product.price, 0)

                            }}</Cell>
                        </Column>

                    </Table>
                    :
                    <Placeholder.Graph active />
                }

            </div>
        </div>
    );
};

export default Orders;