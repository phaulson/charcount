import React from "react";
import "./TextArea.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import FormControl from "react-bootstrap/FormControl";

class TextArea extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			result: "0 words and 0 characters",
			text: ""
		};

		this.textAreaChange = this.textAreaChange.bind(this);
	}

	textAreaChange(event) {
		let text = event ? event.target.value : this.state.text;

		if (text === "") {
			this.setState({
				result: "0 words and 0 characters",
				text: ""
			});
			return;
		}

		let exceptions = this.props.exceptions;
		let textCpy = text;
		let textWord = text;
		exceptions.forEach(ex => {
			text = text.replace(new RegExp(ex, "g"), "");
			if (ex !== " ") textWord = text.replace(new RegExp(ex, "g"), "");
		});

		let words = textWord
			.replace(/\n/g, " ")
			.split(" ")
			.filter(word => word.match(/[0-9a-zA-Z]/g));
		let numberOfWords = words.length;

		let numberOfChars = text.replace(/\n/g, "").length;

		this.setState({
			result: `${numberOfWords} word${
				numberOfWords !== 1 ? "s" : ""
			} and ${numberOfChars} character${numberOfChars !== 1 ? "s" : ""}`,
			text: textCpy
		});
	}

	render() {
		return (
			<div>
				<Container className="textarea-container">
					<Row>
						<Col>
							<Alert variant="primary">{this.state.result}</Alert>
							<FormControl
								as="textarea"
								rows="10"
								placeholder="Start typing, or copy and paste your text here..."
								onChange={this.textAreaChange}
							/>
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}
export default TextArea;
