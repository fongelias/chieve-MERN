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
			<div className="goal-list blackground">
				{
					this.props.goals.map(function(item, i){
						if(_this.props.showCompleted) {
							return <Goal 
								goal={item} 
								key={item._id} 
								order={i} 
								update={_this.props.update}/>
						}
						//Only show uncompleted items
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