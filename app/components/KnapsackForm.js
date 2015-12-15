import React from '../../node_modules/react';
import uuid from '../../node_modules/uuid-v4';
import Item from './Item';

// https://gist.github.com/jpillora/4435759
const combinations = function(set) {
    return (function acc(xs, set) {
        let x = xs[0];
        if(typeof x === "undefined")
            return set;
        for(let i = 0, l = set.length; i < l; ++i)
            set.push(set[i].concat(x));
        return acc(xs.slice(1), set);
    })(set, [[]]).slice(1);
};

const initialLimit = 200;

// COMPONENT
const KnapsackForm = React.createClass({
    getInitialState: function(){
        // Initial setup
        let setup = [];
        setup.push({ id: uuid(), name:'Project', value:'20', weight:'200' });
        setup.push({ id: uuid(), name:'Algorithms', value:'2', weight:'40' });
        setup.push({ id: uuid(), name:'Videos', value:'5', weight:'20' });
        setup.push({ id: uuid(), name:'Gig', value:'1', weight:'10' });
        setup.push({ id: uuid(), name:'Programming', value:'9', weight:'90' });
        setup.push({ id: uuid(), name:'Thesis', value:'17', weight:'100' });
        return{
            limit: initialLimit,
            totalValue: null,
            totalWeight: null,
            fields: setup
        }
    },
    reset: function(){
        let newState = this.state;
        for (let i=0; i<newState.fields.length; i++){
            newState.fields[i].chosen = false;
        }
        newState.totalWeight = null;
        newState.totalValue = null;
        this.setState(newState);
    },
    addField: function(){
        // Limit to max. 15 items because exhaustive algorithm
        if(this.state.fields.length < 15){
            let newState = this.state.fields;
            newState.push({id: uuid(), name: null, value: null, weight: null});
            this.setState({ fields: newState }, function(){
                this.reset();
            });
        } else{
            alert('Due to the algorithm being exhaustive, the maximum number of items is 15.');
        }
    },
    handleFieldChange: function(fieldId, name, value, weight) {
        // Get index from fields array
        const index = this.state.fields.map(function(item, index){
            if(item.id == fieldId){
                return index;
            }
        }).filter(isFinite);
        // Set the new state
        let newState = this.state.fields;
        newState[index].name = name;
        newState[index].value = value;
        newState[index].weight = weight;
        this.setState({ fields: newState }, function(){
            this.reset();
        });
    },
    handleLimitChange: function(e) {
        // Proof out negative values and those over maximum
        let val = Number(e.target.value);
        const min = Number(e.target.min);
        const max = Number(e.target.max);
        if(val > max){
            e.target.value = max;
        }else if(val < val){
            val = val;
        }
        this.setState({limit: e.target.value}, function(){
            this.reset();
        });
    },
    removeItem: function(id){
        // Get index from fields array
        const index = this.state.fields.map(function(item, index){
            if(item.id == id){
                return index;
            }
        }).filter(isFinite);
        // Set the new state
        let newState = this.state.fields;
        newState.splice(index, 1);
        this.setState({ fields: newState}, function(){
            this.reset();
        });
    },
    calculate: function(){
        // Set profit for each item based on value / weight ratio
        const limit = this.state.limit;
        let newState = this.state.fields;
        for (let i = 0; i < newState.length; i++){
            let item = newState[i];
            item.profit = item.value / item.weight;
        }

        // Get all possible combinations of items...
        let allCombinations = combinations(newState);
        // Calculate total profits and filter any combinations that go over the limit
        let arrayTotals = allCombinations.filter(function(arr){
            let total = 0;
            for(let j = 0; j < arr.length; j++){
                total = total + Number(arr[j].weight);
            }
            if(total <= limit){
                return arr;
            }
        });
        // Get the highest total value of the surviving arrays
        let highest = 0;
        let weight = 0;
        let result;
        for(let k = 0; k < arrayTotals.length; k++){
            let total = 0;
            for(let m = 0; m < arrayTotals[k].length; m++){
                total = total + Number(arrayTotals[k][m].value);
            }
            if(highest < total){
                highest = total;
                // Get total weight of winning array
                weight = 0;
                for(let n = 0; n < arrayTotals[k].length; n++){
                    weight = weight + Number(arrayTotals[k][n].weight);
                }
                result = arrayTotals[k];
            }
        }
        // Find chosen items and push them into an array for state change

        const chosenById = result.map(function(item){return item.id});
        for (var i = 0; i < newState.length; i++){
            var seen = false;
            for(var j = 0; j != chosenById.length; ++j) {
                if(chosenById[j] == newState[i].id){
                    seen = true;
                }
            }
            if(seen){
                newState[i].chosen = true;
            } else{
                newState[i].chosen = false;
            }
        }
        this.setState({ totalValue: highest, totalWeight: weight, fields: newState });
    },
    render: function() {
        const fields = this.state.fields.map(function(field) {
            const props = {
                key: field.id,
                id: field.id, 
                name: field.name || 'New item',
                value: field.value || '1',
                weight: field.weight || '10',
                chosen: field.chosen || false, // used to see if item chosen for knapsack
                onChange: this.handleFieldChange,
                removeMe: this.removeItem
            }
            return <Item {...props} />
        }, this);

        return (
          <form>
            <div className="limiter">
                <div className="field">
                    <h5 className="label">Weight limit:</h5>
                    <input type="number" min="0" max="9999" defaultValue={initialLimit} value={this.state.limit} onChange={this.handleLimitChange}/>
                </div>
            </div>
            {fields}
            <div className="result">
                <div className="totalWeight">
                    <input type="number" min="0" value={this.state.totalWeight} readOnly='readonly'/>
                </div>
                <div className="totalValue">
                    <input type="number" min="0" value={this.state.totalValue} readOnly='readonly'/>
                </div>
                <h5 className="resultTitle">Result total:</h5>
            </div>
            <button type="button" onClick={this.addField}>Add item</button>
            <button type="button" onClick={this.calculate}>Calculate</button>
          </form>
        );
  }
});

export default KnapsackForm;


// https://www.npmjs.com/package/knapsack-js