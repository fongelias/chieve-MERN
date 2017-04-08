//Require react and react dom


class HelloWorld extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			color: "pink"
		}
	}

	toggleColor() {
		this.setState({
			color: "yellow"
		})
	}


	render() {
		console.log(this);

		const styleObj = {
			backgroundColor: "red",
			fontSize: 30 / 2,
		}

		return (
			<section style={styleObj} id="hello-world">
				<h2 onClick={this.toggleColor.bind(this)}>{this.props.name}</h2>
			</section>
		);
	}
}


ReactDOM.render(
	<HelloWorld name="Elias"/>, 
	document.getElementById("app")
);