import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls=[
	{label:'Cheese',type:'cheese'},
	{label:'Salad',type:'salad'},
	{label:'Meat',type:'meat'},
	{label:'Bacon',type:'bacon'}

];

const buildControls = (props) =>(
	<div className={classes.BuildControls}>
		<p>Current Price: Rs.{props.price}</p>
		{
			controls.map(ctrl=>(
				<BuildControl 
					key={ctrl.label} 
					label={ctrl.label}
					add={()=>props.add(ctrl.type)}
					remove={()=>props.remove(ctrl.type)}
					disabled={props.disabled[ctrl.type]}
				/>
			))
		}
		<button className={classes.OrderButton} 
				disabled={!props.purchasable} 
				onClick={props.orderPlaced}>{props.isAuth?"PLACE ORDER":"SIGN UP TO ORDER"}
		</button>
	</div>
);

export default buildControls;