//Dependencies
var React = require('react');
var ReactDOM = require('react-dom');
var TaskList = require('../components/taskList.jsx');


//Module
var DashboardApp = React.createClass({
	getInitialState: function() {
		return {

		}
	},
	render: function() {
		var taskList = [
			{title: "title1"},
			{title: "title2"},
			{title: "title3"}
		]

		return (
			<div>
				<TaskList tasks={taskList}/>
			</div>
		)
	}
});

ReactDOM.render(
	<DashboardApp />,
	document.getElementById("dashboardApp")
)