//Dependencies
var React = require('react');
var Task = require('../components/task.jsx');

//Module
var TaskList = React.createClass({
	getInitialState: function() {
		return {
			goals: this.props.goals
		}
	},
	render: function() {
		console.log(this.state.goals);
		return (
			<div className="goal-list">
			</div>
		)
	}
})