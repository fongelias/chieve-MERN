//Dependencies
var React = require('react');
var AddButton = require('../components/buttons/addButton.jsx');

//Module
var AddTaskForm = React.createClass({
	getInitialState: function() {
		return {
			goal: 0,
			title: '',
			taskFormClass: 'add-task-form',
			buttonDrawerClass: 'add-button-drawer'
		}
	},
	updateGoal: function(e) {
		this.setState({
			goal: parseInt(e.target.value)
		});
	},
	updateTitle: function(e) {
		this.setState({
			title: e.target.value
		});
	},
	toggleAddTaskForm: function() {
		if(this.state.buttonDrawerClass.split(" ").indexOf("two-options") != -1) {
			this.setState({
				taskFormClass: 'add-task-form',
				buttonDrawerClass: 'add-button-drawer'
			})
		} else {
			this.setState({
				taskFormClass: 'add-task-form open',
				buttonDrawerClass: 'add-button-drawer two-options'
			})
		}
	},
	addTask: function() {
		var _this = this;
		if(this.state.title != '') {
			//Close form
			this.toggleAddTaskForm();
			//Update DB from state-container
			this.props.addTask({
				title: this.state.title,
				goal: this.props.goals[this.state.goal]._id
			});
			//Clear Form
			setTimeout(function() {
				_this.setState({
					title: ''
				})
			},1000);
		} else {
			//Notify user of missing fields
		}
	},
	render: function() {
		console.log(this.state);
		return (
			<div className="flex vertical justify add-task-container">
				<div className={this.state.taskFormClass}>
					<div className="input-line">
						<input type="text"
							placeholder="choose a task title"
							className="task-input left"
							value={this.state.title}
							onChange={this.updateTitle}/>
					</div>
					<select onChange={this.updateGoal} value={this.state.goal}>
						{
							this.props.goals.map(function(item, i){
								return <option 
									value={i} 
									key={item._id}>
									{item.title}
									</option>
							})
						}
					</select>
					<p className="text mini light-grey">You can add a new objective on the objectives page</p>
				</div>
				<div className={this.state.buttonDrawerClass}>
					<AddButton styleClass="one" action={this.addTask}/>
					<AddButton styleClass="two" action={this.toggleAddTaskForm}/>
				</div>
			</div>
		)
	}
})

module.exports = AddTaskForm;