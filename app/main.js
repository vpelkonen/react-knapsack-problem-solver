import normalize from './normalize.scss';
import style from './style.scss';
import plugins from './plugins';
import React, { Component } from '../node_modules/react';
import ReactDOM from '../node_modules/react-dom';

import KnapsackForm from './components/KnapsackForm';

// Create wrapper for the whole bunch
const App = React.createClass({
	render: function(){
		return(
		    <main>
		    	<h1>So, you have a Knapsack Problem...</h1>
		    	<p className="quote">The knapsack problem or rucksack problem is a problem in combinatorial optimization: Given a set of items, each with a weight and a value, determine the number of each item to include in a collection so that the total weight is less than or equal to a given limit and the total value is as large as possible.</p>
		    	<a className="wikiLink" href="https://en.wikipedia.org/wiki/Knapsack_problem">- Wikipedia</a>
				<KnapsackForm/>
		    	<img src="zipper.png" alt="" className="zipper"/>
		    </main>
		);
	}
});

// Render
ReactDOM.render(
    <App/>,
    document.getElementById('app')
);