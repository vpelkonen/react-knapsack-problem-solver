import React from '../../node_modules/react';

const Item = React.createClass({
    getInitialState: function(){
        return{
            name: null,
            value: null,
            weight: null
        }
    },
    componentDidMount: function(){
        this.setState({name: this.props.name, value: this.props.value, weight: this.props.weight }, function(){
        this.props.onChange(this.props.id, this.state.name, this.state.value, this.state.weight)});
    },
    handleChangeName: function(e) {
        const newName = e.target.value;
        this.setState({name: newName}, function(){
        this.props.onChange(this.props.id, this.state.name, this.state.value, this.state.weight)});
    },
    handleChangeValue: function(e) {
        const newValue = e.target.value;
        this.setState({value: newValue}, function(){
        this.props.onChange(this.props.id, this.state.name, this.state.value, this.state.weight)});
    },
    handleChangeWeight: function(e) {
        const newWeight = e.target.value;
        this.setState({weight: newWeight}, function(){
        this.props.onChange(this.props.id, this.state.name, this.state.value, this.state.weight)});
    },
    getFocus: function(e){
        if(e.target.value === e.target.defaultValue){
            e.target.value = '';
        }
    },
    nameLoseFocus: function(e){
        if (e.target.value === ''){
            e.target.value = e.target.defaultValue;
            this.setState({name: e.target.defaultValue }); // to fix potential empty name in state
        }
    },
    callRemoveMe: function(){
        this.props.removeMe(this.props.id);
    },
	render: function() {
		return(
			<div className="item">
				<div className="field">
					<h5 className="label">Item</h5>
					<input type="text" defaultValue={this.props.name} onFocus={this.getFocus} onBlur={this.nameLoseFocus} onChange={this.handleChangeName}/>
				</div>
				<div className="field">
					<h5 className="label">Value</h5>
					<input type="number" min="0" defaultValue={this.props.value} onChange={this.handleChangeValue}/>
				</div>
				<div className="field">
					<h5 className="label">Weight</h5>
					<input type="number" min="0" defaultValue={this.props.weight} onChange={this.handleChangeWeight}/>
				</div>
				<div className="removeMe" onClick={this.callRemoveMe}>x</div>
			</div>
		);
	}
});

export default Item;
