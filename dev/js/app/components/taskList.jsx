//Dependencies
var React = require('react');
var Task = require('../components/task.jsx');

//Placeholder HTML for Dragging/Dropping
var placeholder = document.createElement("div");
placeholder.className = "placeholder";


//Module
var TaskList = React.createClass({
	getInitialState: function() {
		return {
			tasks: this.props.tasks
		}
	},
	render: function() {
		return (
			<div onDragOver={this.dragOver}
				draggable="false">
				{
					this.props.tasks.map(function(item){
						return <Task task={item} />
					})
				}
			</div>
		)
	}
})

module.exports = TaskList;