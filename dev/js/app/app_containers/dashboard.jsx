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
			<div className="flex justify">
				<section>
					<h1 className="text title-header margin-bottom-5">Tasks</h1>
					<TaskList tasks={taskList}/>
				</section>
			</div>
		)
	}
});

ReactDOM.render(
	<DashboardApp />,
	document.getElementById("dashboardApp")
)