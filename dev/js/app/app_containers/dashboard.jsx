//Dependencies
var React = require('react');
var ReactDOM = require('react-dom');
var TaskList = require('../components/taskList.jsx');
var GoalList = require('../components/goalList.jsx');
var AddTaskForm = require('../components/addTaskForm.jsx');
var AddGoalForm = require('../components/addGoalForm.jsx');

//Helper Functions
/*----------------------------------------
----Visual Delimiter Between Functions----
----------------------------------------*/
function indexOfObjWithIdInArr(arr, id) {
	var index = -1;
	
	for(var i = 0; i < arr.length; i++) {
		if(arr[i]._id == id) {
			index = i;
			break;
		}
	}

	return index;
}

/*----------------------------------------
----Visual Delimiter Between Functions----
----------------------------------------*/
function updateObjInArr(arr, obj) {
	var id = obj._id;
	console.log("updateObjInArr(" + id + ")");
	var resultArr = arr;
	var index = indexOfObjWithIdInArr(arr, id);

	if(index == -1) {
		console.log("No Such Object Exists");	
	} else {
		resultArr[index] = obj;
	}

	return resultArr;
}

/*----------------------------------------
----Visual Delimiter Between Functions----
----------------------------------------*/
function removeObjInArr(arr, obj) {
	var id = obj._id;
	console.log("removeObjInArr(" + id + ")");
	var resultArr = arr;
	var index = indexOfObjWithIdInArr(arr, id);

	if(index == -1) {
		console.log("No Such Object Exists");	
	} else {
		resultArr.splice(index, 1);
	}

	return resultArr;
}


//Module
var DashboardApp = React.createClass({
	getInitialState: function() {

		return {
			stateClass: "",
			goalList: [],
			taskList: []
		}
	},
	componentDidMount: function() {
		var _this = this;

		//Fetch GoalList and setState
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
		});

		//Fetch TaskList and setState
		fetch('user/tasks', {
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
				taskList: json
			})
		});
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
	removeGoal: function(obj) {
		var _this = this;
		var newGoals = removeObjInArr(this.state.goalList, obj);
		console.log(newGoals);
		this.setState({
			goalList: newGoals
		});

		console.log(JSON.stringify(obj));
		if(obj.completed) {
			//Update DB
			fetch('/api/goals/' + obj._id, {
				credentials: 'same-origin',
				method: 'put',
				headers: {
					'Content-Type' : 'application/json',
					'Accept' : 'application/json'
				},
				body: JSON.stringify(obj)
			}).then(function(response) {
				_this.updateStateFromDB();
			});
		} else {
			//Remove Task from DB
			fetch('/api/goals/' + obj._id, {
				credentials: 'same-origin',
				method: 'delete',
				headers:{
					'Content-Type' : 'application/json',
					'Accept' : 'application/json'
				}
			}).then(function(response){
				_this.updateStateFromDB();
			});
		}
	},
	updateTask: function(obj) {
		var newTasks = updateObjInArr(this.state.taskList, obj);
		this.setState({
			taskList: newTasks
		});

		console.log(JSON.stringify(obj));
		//Update DB
		fetch('/api/tasks/' + obj._id, {
			credentials: 'same-origin',
			method: 'put',
			headers: {
				'Content-Type' : 'application/json',
				'Accept' : 'application/json'
			},
			body: JSON.stringify(obj)
		});
	},
	removeTask: function(obj) {
		var newTasks = removeObjInArr(this.state.taskList, obj);
		console.log(newTasks);
		this.setState({
			taskList: newTasks
		});

		console.log(JSON.stringify(obj));
		if(obj.completed) {
			//Update DB
			fetch('/api/tasks/' + obj._id, {
				credentials: 'same-origin',
				method: 'put',
				headers: {
					'Content-Type' : 'application/json',
					'Accept' : 'application/json'
				},
				body: JSON.stringify(obj)
			});
		} else {
			//Remove Task from DB
			fetch('/api/tasks/' + obj._id, {
				credentials: 'same-origin',
				method: 'delete',
				headers:{
					'Content-Type' : 'application/json',
					'Accept' : 'application/json'
				}
			});
		}
	},
	updateStateFromDB: function() {
		var _this = this;

		//Fetch GoalList and setState
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
		});

		//Fetch TaskList and setState
		fetch('user/tasks', {
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
				taskList: json
			})
		});
	},
	addTask: function(obj) {
		var _this = this;
		//Update DB
		fetch('/api/tasks/', {
			credentials: 'same-origin',
			method: 'post',
			headers: {
				'Content-Type' : 'application/json',
				'Accept' : 'application/json'
			},
			body: JSON.stringify(obj)
		}).then(function(response){
			_this.updateStateFromDB();
		});
	},
	addGoal: function(obj) {
		var _this = this;
		//Update DB
		fetch('/api/goals/', {
			credentials: 'same-origin',
			method: 'post',
			headers: {
				'Content-Type' : 'application/json',
				'Accept' : 'application/json'
			},
			body: JSON.stringify(obj)
		}).then(function(response) {
			_this.updateStateFromDB();
		});
	},
	render: function() {
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
							<TaskList tasks={this.state.taskList}
								update={this.updateTask}
								removeTask={this.removeTask}
								showCompleted={false}/>
							<AddTaskForm goals={this.state.goalList}
								addTask={this.addTask}/>
						</section>
						<section className="objective-view">
							<h1 className="text white objective-title margin-bottom-5">Objectives</h1>
							<a className="tasks-link" 
								onClick={function(){
									this.updateStateClass("")
								}.bind(this)} 
								>Tasks</a>
							<GoalList goals={this.state.goalList} 
								update={this.updateGoal}
								removeGoal={this.removeGoal}
								showCompleted={false}/>
							<AddGoalForm addGoal={this.addGoal}/>
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