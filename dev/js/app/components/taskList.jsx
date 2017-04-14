//Dependencies
var React = require('react');
var Task = require('../components/task.jsx');

//Placeholder HTML for Dragging/Dropping
var placeholder = document.createElement("div");
placeholder.className = "placeholder";


//Module
var TaskList = React.createClass({
	getInitialState: function() {
		return {
			tasks: this.props.tasks
		}
	},
	dragStart : function(e) {
		console.log("dragStart");
		console.log(this);
		this.dragged = e.currentTarget;
		e.dataTransfer.effectAllowed = 'move';
		//For firefox, additional call required:
		e.dataTransfer.setData("text/html", e.currentTarget);
	},
	dragEnd : function(e) {
		this.dragged.style.display = "block";
		console.log("dragEnd");
		console.log(this);
		console.log(this.dragged);
		console.log(this.dragged.parentNode);
		this.dragged.parentNode.removeChild(placeholder);

		//Update State
		var taskList = this.state.tasks;
		var fromIndex = Number(this.dragged.dataset.id);
		var toIndex = Number(this.over.dataset.id);
		if (fromIndex < toIndex) {
			//Ensure splicing on top
			toIndex--;
		}
		taskList.splice(toIndex, 0, taskList.splice(fromIndex, 1)[0]);
		this.setState({
			tasks: taskList
		});
	},
	dragOver : function(e) {
		e.preventDefault();
		console.log("dragOver");
		console.log(this);
		console.log(this.dragged);
		this.dragged.style.display = "none";
		if(e.target.className == "placeholder") {
			return;
		}
		this.over = e.target;
		e.target.parentNode.insertBefore(placeholder, e.target);
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
		return (
			<div onDragOver={this.dragOver}
				draggable="false">
				{
					this.props.tasks.map(function(item){
						return <Task task={item} 
							dragEnd={this.dragEnd}
							dragStart={this.dragStart}/>
					})
				}
			</div>
		)
	}
})

module.exports = TaskList;