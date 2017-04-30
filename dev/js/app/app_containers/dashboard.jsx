//Dependencies
var React = require('react');
var ReactDOM = require('react-dom');
var TaskList = require('../components/taskList.jsx');
var GoalList = require('../components/goalList.jsx');

//Helper Functions
function updateObjInArr(arr, obj) {
	var id = obj._id;
	console.log("updateObjInArr(" + id + ")");
	var index = -1;
	var resultArr = arr;
	for(var i = 0; i < arr.length; i++) {
		if(arr[i]._id == id) {
			index = i;
			break;
		}
	}

	if(index == -1) {
		console.log("No Such Object Exists");	
	} else {
		resultArr[i] = obj;
	}

	return resultArr;
}




//Module
var DashboardApp = React.createClass({
	getInitialState: function() {

		return {
			stateClass: "",
			goalList: []
		}
	},
	componentDidMount: function() {
		var _this = this;

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
			_this.setState({
				goalList: json
			})
		})
	},
	updateStateClass: function(classStr) {
		this.setState({
			stateClass: classStr
		})
	},
	updateGoal: function(obj) {
		var newGoals = updateObjInArr(this.state.goalList, obj);
		this.setState({
			goalList: newGoals
		});

		console.log(JSON.stringify(obj));
		//Update DB
		fetch('/api/goals/' + obj._id, {
			credentials: 'same-origin',
			method: 'put',
			headers: {
				'Content-Type' : 'application/json',
				'Accept' : 'application/json'
			},
			body: JSON.stringify(obj)
		});
	},
	render: function() {
		var taskList = [
			{title: "title1"},
			{title: "title2"},
			{title: "title3"}
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
							<GoalList goals={this.state.goalList} update={this.updateGoal}/>
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