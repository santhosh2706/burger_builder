import React from 'react';

import classes from './Input.css';

const input = ( props ) => {
    let inputElement = null;
    let inputClass=[classes.InputElement]

    if(props.invalid&& props.validation&& props.touched){
        inputClass.push(classes.Invalid)
    }

    switch ( props.elementType ) {
        case ( 'input' ):
            inputElement = <input
        onClick={props.clicked}
                className={inputClass.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ( 'textarea' ):
            inputElement = <textarea
        onClick={props.clicked}
                className={inputClass.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ( 'select' ):
            inputElement = (
                <select
                    className={inputClass.join(' ')}
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input
                onClick={props.clicked}
                className={inputClass.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );

};

export default input;