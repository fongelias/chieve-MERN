//Dependencies
var React = require('react');

//Module
var Task = React.createClass({
	getInitialState: function() {
		return {
			containerClass: 'inner-container'
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
		this.setState({
			title: e.target.value
		})
	},
	render: function() {
		console.log(this.state.title)
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
							<textarea className="task-description" ></textarea>
						</div>
					</div>
					<div className="more-options" onClick={this.openOption}>
						<div className="inner-container flex split">
							<div className="option-container option-1">
								<p>FIN</p>
								<div className="circle-option">
									<div className="inner-icon checkmark"></div>
								</div>
							</div>
							<div className="option-container option-2">
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