//Dependencies
var React = require('react');

//Module
var Task = React.createClass({
	getInitialState: function() {
		return {
			title: this.props.task.title
		};
	},
	updateTitle: function(e) {
		this.setState({
			title: e.target.value
		})
	},
	render: function() {
		console.log(this.state.title)
		return (
			<div className="task-container">
				<div className="inner-container">
					<div className="contents">
						<div className="input-line">
							<input type="text" 
								placeholder="create a new task" 
								className="task-input left"
								value={this.state.title} 
								onChange={this.updateTitle} />
						</div>
						<div className="expanded-info">
							<textarea className="task-description" ></textarea>
						</div>
					</div>
				</div>
			</div>
		)
	}
})

module.exports = Task;