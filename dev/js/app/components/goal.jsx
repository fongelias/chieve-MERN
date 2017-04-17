//Dependencies
var React = require('react');

//Module
var Task = React.createClass({
	getInitialState: function() {
		return {
			title: this.props.goal.title,
			containerClass: 'inner-container'
		};
	},
	render: function() {
		return (
			<div></div>
		)
	}
})