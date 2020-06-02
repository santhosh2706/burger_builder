import React from 'react';
import classes from './Order.css';

const order =(props)=>{
    let ingredients=Object.keys(props.ingredients)
                    .map(igKey=>(
                        props.ingredients[igKey]!==0 ?
                            <span 
                            style={{
                                fontSize:'15px',
                                color:'white',
                                textTransform:"capitalize",
                                margin:'0 8px'
                            }}
                            key={igKey}>
                                {igKey} ({props.ingredients[igKey]})</span> :null
                        
                    ))

    return(
        <div className={classes.Order}>
            <p>Ingredients: {ingredients}</p>
                
            <p>Price: Rs {props.price}</p>
        </div>
    );
    
};

export default order;