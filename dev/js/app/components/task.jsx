//Dependencies
var React = require('react');

//Module
var Task = React.createClass({
	getInitialState: function() {
		return {
			containerClass: 'inner-container',
		};
	},
	openOption: function() {
		if (this.state.containerClass == 'inner-container') {
			this.setState({
				containerClass: 'inner-container open-option'
			})
		}
	},
	closeOption: function() {
		if (this.state.containerClass == 'inner-container open-option') {
			this.setState({
				containerClass: 'inner-container'
			})
		}
	},
	updateTitle: function(e) {
		this.props.update({
			title: e.target.value,
			_id: this.props.task._id
		})
	},
	updateDescription: function(e) {
		this.props.update({
			description: e.target.value,
			_id: this.props.task._id
		})
	},
	deleteTask: function() {
		console.log('task.deleteTask()');
		//Added layer of to prevent event bubbling
		if(this.state.containerClass.split(" ").indexOf("open-option") != -1) {
			this.removeTask(false);
		}
	},
	completeTask: function() {
		console.log('task.completeTask()');
		//Added layer of to prevent event bubbling
		if(this.state.containerClass.split(" ").indexOf("open-option") != -1) {
			this.removeTask(true);
		}
	},
	removeTask: function(completedBool) {
		console.log('task.removeTask()');
		var _this = this;
		var actionClass = completedBool ? 'item-completed' : 'item-deleted';
		var confirmMessage = completedBool ? 
			"Complete this task?" :
			"Deleted tasks cannot be recovered! Press OK to continue.";
		if(confirm(confirmMessage)){
			this.setState({
				containerClass: 'inner-container fade transition ease ' + actionClass
			})

			//Fade from UI
			setTimeout(function(){
				_this.setState({
					containerClass: 'inner-container ease fade ' + actionClass
				})
			}, 1000);

			//Remove from State
			setTimeout(function(){
				_this.props.removeTask({
					completed: completedBool,
					_id: _this.props.task._id
				});
			}, 3000);
		}
	},
	render: function() {
		return (
			<div className="task-container" data-id={this.props.order}>
				<div className={this.state.containerClass}>
					<div className="contents">
						<div className="input-line">
							<input type="text" 
								placeholder="create a new task" 
								className="task-input left"
								value={this.props.task.title} 
								onChange={this.updateTitle} />
						</div>
						<div className="expanded-info">
							<textarea className="task-description"
								value={this.props.task.description}
								onChange={this.updateDescription}>
								</textarea>
						</div>
					</div>
					<div className="more-options" 
						onClick={this.openOption}>
						<div className="inner-container flex split">
							<div className="option-container option-1" onClick={this.completeTask}>
								<p>FIN</p>
								<div className="circle-option">
									<div className="inner-icon checkmark"></div>
								</div>
							</div>
							<div className="option-container option-2" onClick={this.deleteTask}>
								<p>DEL</p>
								<div className="circle-option">
									<div className="inner-icon x-cross"></div>
								</div>
							</div>
							<div className="option-container option-3" onClick={this.closeOption}>
								<p>HID</p>
								<div className="inner-icon circle-option">
									<div className="inner-icon chevron"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
})

module.exports = Task;