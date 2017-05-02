//Dependencies
var React = require('react');
var Task = require('../components/task.jsx');


//Module
var TaskList = React.createClass({
	getInitialState: function() {
		return {}
	},
	noResultsHTML : function() {
		return <h1>No Tasks</h1>
	},
	render: function() {
		var _this = this;
		return (
			<div className="task-list">
				{
					this.props.tasks.map(function(item, i){
						return <Task 
							task={item} 
							key={item._id} 
							order={i}
							update={_this.props.update}
							removeTask={_this.props.removeTask}/>
					})
				}
			</div>
		)
	}
})

module.exports = TaskList;