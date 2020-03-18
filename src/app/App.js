import React from "react";
import Header from "../header/Header";
import TextArea from "../textarea/TextArea";
import ExceptionInput from "../exceptioninput/ExceptionInput";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class App extends React.Component {
	constructor() {
		super();

		this.state = {
			exceptions: []
		};

		this.exceptionChangeCallback = this.exceptionChangeCallback.bind(this);
	}

	exceptionChangeCallback(exs) {
		this.setState(
			{
				exceptions: exs.sort((a, b) => b.length - a.length)
			},
			this.textArea.textAreaChange
		);
	}

	render() {
		return (
			<div>
				<Container>
					<Header />
					<Row>
						<Col xs={12} md={7}>
							<TextArea
								exceptions={this.state.exceptions}
								ref={ta => (this.textArea = ta)}
							/>
						</Col>
						<Col>
							<ExceptionInput
								exceptionChangeCallback={this.exceptionChangeCallback}
							/>
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}
export default App;
