import React from "react";
import ReactDOM from "react-dom";
import "./ExceptionInput.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

class ExceptionInput extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			exceptions: []
		};

		this.alertStyles = [
			"primary",
			"secondary",
			"success",
			"danger",
			"warning",
			"info",
			"dark"
		];

		this.inputKeyPress = this.inputKeyPress.bind(this);
		this.buttonAddClick = this.buttonAddClick.bind(this);
		this.buttonClearClick = this.buttonClearClick.bind(this);
		this.alertDismiss = this.alertDismiss.bind(this);
		this.sendExceptions = this.sendExceptions.bind(this);
		this.getRandomAlertStyle = this.getRandomAlertStyle.bind(this);
	}

	inputKeyPress(target) {
		if (target.charCode === 13) {
			this.buttonAddClick();
		}
	}

	buttonAddClick() {
		let text = this.refs.input.value;

		if (text === "" || this.state.exceptions.some(ex => ex.exception === text))
			return;

		let newEx = { exception: text, alertStyle: this.getRandomAlertStyle() };

		this.setState(
			prevState => ({
				exceptions: [...prevState.exceptions, newEx]
			}),
			this.sendExceptions
		);

		ReactDOM.findDOMNode(this.refs.input).value = "";
	}

	buttonClearClick() {
		this.setState(
			{
				exceptions: []
			},
			this.sendExceptions
		);
	}

	alertDismiss(ex) {
		this.setState(
			prevState => ({
				exceptions: prevState.exceptions.filter(e => e !== ex)
			}),
			this.sendExceptions
		);
	}

	sendExceptions() {
		let exceptions = this.state.exceptions.map(ex => ex.exception);
		this.props.exceptionChangeCallback(exceptions);
	}

	getRandomAlertStyle() {
		return this.alertStyles[
			Math.floor(Math.random() * this.alertStyles.length)
		];
	}

	render() {
		return (
			<div>
				<Container>
					<Row>
						<Col>
							<InputGroup>
								<FormControl
									ref="input"
									placeholder="Word or character not to be counted..."
									aria-label="Word or character not to be counted..."
									aria-describedby="basic-addon2"
									onKeyPress={this.inputKeyPress}
								/>
								<InputGroup.Append>
									<Button
										variant="outline-primary"
										onClick={this.buttonAddClick}
									>
										Add
									</Button>
									<Button
										variant="outline-danger"
										onClick={this.buttonClearClick}
									>
										Clear
									</Button>
								</InputGroup.Append>
							</InputGroup>
						</Col>
					</Row>
					<Row className="alert-row">
						{this.state.exceptions.map(ex => {
							return (
								<Col key={ex.exception}>
									<Alert
										variant={ex.alertStyle}
										className="exception-alert"
										onClose={() => this.alertDismiss(ex)}
										dismissible
									>
										{ex.exception === " " ? "~blank~" : ex.exception}
									</Alert>
								</Col>
							);
						})}
					</Row>
				</Container>
			</div>
		);
	}
}
export default ExceptionInput;
