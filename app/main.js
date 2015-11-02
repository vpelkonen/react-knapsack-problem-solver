import normalize from './normalize.scss';
import style from './style.scss';
import plugins from './plugins';
import React, { Component } from '../node_modules/react';
import ReactDOM from '../node_modules/react-dom';

import KnapsackForm from './components/KnapsackForm';

// Create wrapper for the whole bunch
const App = React.createClass({
	/*getInitialState: function(){
		let fields = [uuid(),uuid(),uuid()];
		return{
			fields: fields
		}
	},
	addField: function(){
		let newFields = this.state.fields;
		newFields.push(uuid());
		this.setState(newFields);
	},*/
	render: function(){
		//let fields = this.state.fields;
		return(
		    <main>
		    	<h1>So, you have a Knapsack Problem...</h1>
				{/*<KnapsackForm fields={fields}/>*/}
				<KnapsackForm/>

		    </main>
		);
	}
});

// Render
ReactDOM.render(
    <App/>,
    document.getElementById('app')
);