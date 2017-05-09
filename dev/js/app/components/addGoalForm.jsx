//Dependencies
var React = require('react');
var AddButton = require('../components/buttons/addButton.jsx')

//Module
var AddGoalForm = React.createClass({
	getInitialState: function() {
		return {
			title: '',
			goalFormClass: 'add-goal-form',
			buttonDrawerClass: 'add-button-drawer'
		}	
	},
	updateTitle: function(e) {
		this.setState({
			title: e.target.value
		});
	},
	toggleAddGoalForm: function() {
		if(this.state.buttonDrawerClass.split(" ").indexOf("two-options") != -1) {
			this.setState({
				goalFormClass: 'add-goal-form',
				buttonDrawerClass: 'add-button-drawer'
			})
		} else {
			this.setState({
				goalFormClass: 'add-goal-form open',
				buttonDrawerClass: 'add-button-drawer two-options'
			})
		}
	},
	addGoal: function() {
		var _this = this;
		if(this.state.title != '') {
			//Close form
			this.toggleAddGoalForm();
			//Update DB from state-container
			this.props.addGoal({
				title: this.state.title
			});
			//Clear Form
			setTimeout(function() {
				_this.setState({
					title: ''
				})
			}, 1000);
		}
	},
	render: function() {
		return(
			<div className="flex vertical justify add-goal-container blackground">
				<div className={this.state.goalFormClass}>
					<div className="input-line">
						<input type="text"
							placeholder="add a new goal"
							className="goal-input left"
							value={this.state.title}
							onChange={this.updateTitle}/>
					</div>
				</div>
				<div className={this.state.buttonDrawerClass}>
					<AddButton styleClass="one" action={this.addGoal}/>
					<AddButton styleClass="two" action={this.toggleAddGoalForm}/>
				</div>
			</div>
		)
	}
});

module.exports = AddGoalForm;