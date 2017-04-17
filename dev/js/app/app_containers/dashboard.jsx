//Dependencies
var React = require('react');
var ReactDOM = require('react-dom');
var TaskList = require('../components/taskList.jsx');
var GoalList = require('../components/goalList.jsx');


//Module
var DashboardApp = React.createClass({
	getInitialState: function() {

		fetch('/user/goals', {
			credentials: 'same-origin',
			headers: {
				'Content-Type' : 'application/json',
				'Accept' : 'application/json'
			}
		}).then(function(response) {
			return response.json();
		}).then(function(json) {
			console.log(json);
		})


		return {
			stateClass: ""
		}
	},
	updateStateClass: function(classStr) {
		this.setState({
			stateClass: classStr
		})
	},
	render: function() {
		var taskList = [
			{title: "title1"},
			{title: "title2"},
			{title: "title3"}
		]

		var goalList = [
			{title: "titlea"},
			{title: "titleb"},
			{title: "titlec"}
		]



		return (
			<div className={this.state.stateClass}>
				<div className="flex justify">
					<div className="position-foundation">
						<section>
							<div className="position-foundation">
								<h1 className="text title-header margin-bottom-5">Tasks</h1>
								<a className="objective-link" 
									onClick={function(){
										this.updateStateClass("open-objective-view")
									}.bind(this)} 
									>Objectives</a>
								<div id="dashboard-objective-overlay" 
									className="black-overlay-expanding circle"></div>
							</div>
							<TaskList tasks={taskList}/>
						</section>
						<section className="objective-view">
							<h1 className="text white objective-title margin-bottom-5">Objectives</h1>
							<a className="tasks-link" 
								onClick={function(){
									this.updateStateClass("")
								}.bind(this)} 
								>Tasks</a>
							<GoalList goals={goalList}/>
						</section>
					</div>
				</div>
			</div>
		)
	}
});

ReactDOM.render(
	<DashboardApp />,
	document.getElementById("dashboardApp")
)