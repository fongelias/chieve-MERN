//Dependencies
var React = require('react');
var Task = require('../components/task.jsx');

//Placeholder HTML for Dragging/Dropping
var placeholder = document.createElement("div");
placeholder.className = "placeholder";

//Helper Functions
function updateOrder() {
	console.log("updateOrder");
	var list = $('.task-list').children('.task-container');
	return list.map(function(){ 
			return Number($(this).attr('data-id'));
		});
}

//Module
var TaskList = React.createClass({
	getInitialState: function() {
		return {
			tasks: this.props.tasks
		}
	},
	componentDidMount: function() {
		var _this = this;
		$('.task-list').sortable({
			axis: 'y',
			update: function(event, ui){
				//Update Scope when an element is moved
				//moveTask_scope($(ui.item).find(".drag-drop-container"));
				//console.log(_this.state);
				/*_this.setState({
					tasks: updateOrder().map(function(value){
								console.log(_this.state.tasks[value]);
								return _this.state.tasks[value];
							})
				});*/
				
			}
		})
	},
	returnTasksHTML : function() {
		if(true/*this.props.tasks*/) {
			/*this.props.tasks.map(function(item){
				return <Task task={item} 
				dragEnd={this.dragEnd}
				dragStart={this.dragStart}/>
			})
			var item = {
				title: "title1"
			}

			return <Task task={item} 
				dragEnd={this.dragEnd}
				dragStart={this.dragStart}/>
		} else {
			return this.noResults();*/
		}
	},
	noResultsHTML : function() {
		return <h1>No Tasks</h1>
	},
	render: function() {
		console.log(this.state.tasks);
		return (
			<div className="task-list">
				{
					this.state.tasks.map(function(item, i){
						return <Task task={item} order={i}/>
					})
				}
			</div>
		)
	}
})

module.exports = TaskList;