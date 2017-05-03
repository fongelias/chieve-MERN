//Dependencies
var React = require('react');
var Goal = require('../components/goal.jsx');

//Module
var GoalList = React.createClass({
	getInitialState: function() {
		return {}
	},
	render: function() {
		var _this = this;
		return (
			<div className="goal-list">
				{
					this.props.goals.map(function(item, i){
						if(!item.completed){
							return <Goal 
								goal={item} 
								key={item._id} 
								order={i} 
								update={_this.props.update}/>
						}
					})
				}
			</div>
		)
	}
})

module.exports = GoalList;