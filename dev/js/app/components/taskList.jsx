//Dependencies
var React = require('react');
var Task = require('../components/task.jsx');


//Module
var TaskList = React.createClass({
	getInitialState: function() {
		return {
			tasks: this.props.tasks
		}
	},
	componentDidMount: function() {
		var _this = this;
		$('.task-list').sortable({
			axis: 'y',
			update: function(event, ui){
				//Update when an element is moved
			}
		})
	},
	noResultsHTML : function() {
		return <h1>No Tasks</h1>
	},
	render: function() {
		console.log(this.state.tasks);
		return (
			<div className="task-list">
				{
					this.state.tasks.map(function(item, i){
						return <Task task={item} order={i}/>
					})
				}
			</div>
		)
	}
})

module.exports = TaskList;