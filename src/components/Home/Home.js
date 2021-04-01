import React, { useContext } from 'react';
import { ProductContext } from '../../App';
import 'rsuite/dist/styles/rsuite-default.css';
import { Panel, Placeholder } from 'rsuite';
import EditCard from '../EditCard/EditCard';


const Home = () => {

    const [products] = useContext(ProductContext)

    

    return (
        <div className="row">
            {(products.length > 0) ? products.map(product => <EditCard key={Math.random()} product={product} />) :
                <>
                    <Panel className="col-md-4">
                        <Placeholder.Graph active></Placeholder.Graph>
                    </Panel>
                    <Panel className="col-md-4">
                        <Placeholder.Graph active></Placeholder.Graph>
                    </Panel>
                    <Panel className="col-md-4">
                        <Placeholder.Graph active></Placeholder.Graph>
                    </Panel>
                    <Panel className="col-md-4">
                        <Placeholder.Graph active></Placeholder.Graph>
                    </Panel>
                    <Panel className="col-md-4">
                        <Placeholder.Graph active></Placeholder.Graph>
                    </Panel>
                    <Panel className="col-md-4">
                        <Placeholder.Graph active></Placeholder.Graph>
                    </Panel>
                </>
            }
        </div>
    );
};

export default Home;