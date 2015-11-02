import React from '../../node_modules/react';
import uuid from '../../node_modules/uuid-v4';
import Item from './Item';

// https://gist.github.com/jpillora/4435759
var combinations = function(set) {
    return (function acc(xs, set) {
        var x = xs[0];
        if(typeof x === "undefined")
            return set;
        for(var i = 0, l = set.length; i < l; ++i)
            set.push(set[i].concat(x));
        return acc(xs.slice(1), set);
    })(set, [[]]).slice(1);
};

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
            fields: setup
        }
    },
    addField: function(){
        // Limit to max. 15 items because exhaustive algorithm
        if(this.state.fields.length < 15){
            let newState = this.state.fields;
            newState.push({id: uuid(), name: null, value: null, weight: null});
            this.setState({ fields: newState });
        } else{
            alert('Maximum of 15 items.');
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
            console.log(this.state);
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
        this.setState({ fields: newState });
    },
    calculate: function(){
        // Set profit for each item based on value / weight ratio
        const limit = 200; /// !"#=?!)"#?)!?"#=!"#?!")#=?!("#=(!"?#()!=%/)!(#%!?"(=#)) OUTSOURCE THIS !!!
        let newState = this.state.fields;
        for (let i = 0; i < newState.length; i++){
            let item = newState[i];
            item.profit = item.value / item.weight;
        }
        this.setState({ fields: newState }, function(){


            /* TODO:
                1. Make this a callable function
                2. Isolate and componentize limit
                3. Support multiple correct answers (there should be two)
            */

            // Get all possible combinations of items...
            let seeMe = combinations(newState);
            // Calculate total profits and filter any combinations that go over the limit
            let arrayTotals = seeMe.filter(function(arr){
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
            let result;
            for(let k = 0; k < arrayTotals.length; k++){
                let total = 0;
                for(let m = 0; m < arrayTotals[k].length; m++){
                    total = total + Number(arrayTotals[k][m].value);
                }
                if(highest < total){
                    highest = total;
                    result = arrayTotals[k];
                }
            }
            console.log(result.map(function(item){return item.name}) + ': '+ highest);

        });
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
        {fields}
        <button type="button" onClick={this.addField}>Add item</button>
        <button type="button" onClick={this.calculate}>Calculate</button>
      </form>
    );
  }
});

export default KnapsackForm;


// 
        // https://www.npmjs.com/package/knapsack-js