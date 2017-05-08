//Dependencies
var React = require('react');

//Module
var AddButton = React.createClass({
	getInitialState: function() {
		return {
			containerClass: this.props.styleClass ? 'add-button ' + this.props.styleClass : 'add-button'
		}
	},
	render: function() {
		return (
			<div className={this.state.containerClass} onClick={this.props.action}>
				<div className="line-1"></div>
				<div className="line-2"></div>
			</div>
		)
	}
})

module.exports = AddButton;