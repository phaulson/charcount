import React from "react";
import "./Header.css";

import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";

class Header extends React.Component {
	render() {
		return (
			<div className="div-header">
				<Container>
					<Jumbotron>
						<h1>Word and Character Counter</h1>
					</Jumbotron>
				</Container>
			</div>
		);
	}
}
export default Header;
