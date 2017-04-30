//Dependencies
var React = require('react');

//Module
var Goal = React.createClass({
	getInitialState: function() {
		return {
			title: this.props.goal.title,
			id: this.props.goal._id,
			containerClass: 'inner-container'
		};
	},
	updateTitle: function(e) {
		this.setState({
			title:e.target.value
		})

		this.props.update({
			title: e.target.value,
			_id: this.state.id
		});
	},
	render: function() {
		return (
			<div className="goal-container" data-id={this.props.order}>
				<div className={this.state.containerClass}>
					<div className="contents">
						<div className="input-line">
							<input type="text"
								placeholder="create a new goal"
								className="goal-input left"
								value={this.props.goal.title}
								onChange={this.updateTitle} />
						</div>
					</div>
				</div>
			</div>
		)
	}
})

module.exports = Goal;