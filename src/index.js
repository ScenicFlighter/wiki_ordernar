import React from "react";
import { render } from "react-dom";

import backlog from "./functions/backlog/index.js";

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";

import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,Row,Col,
  ListGroup, ListGroupItem
} from "shards-react";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { space: { name: "" }, projects: [], wiki: [], open: false, selectedProjectName: "プロジェクトを選択" };
    this.getWikiFromProjectKey = this.getWikiFromProjectKey.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  async componentDidMount() {
    const space = await backlog.getSpace();
    const projects = await backlog.getProjects();

    this.setState({ space, projects });
  }

  async getWikiFromProjectKey(key, selectedProjectName) {
    const wiki = await backlog.getWiki(key);

      this.setState({ wiki, selectedProjectName });
  }

  async handleToggle() {
    this.setState(prevState => {return {open: !prevState.open}});
  }

  render() {
    const { space, projects, wiki, open, selectedProjectName } = this.state;

    return (
	<div style={{marginTop: 30, marginBottom: 30}}>
        <Container>
	    <Row>
		<Col>
	    <Dropdown open={open} toggle={this.handleToggle}>
             <DropdownToggle caret>{selectedProjectName}</DropdownToggle>
             <DropdownMenu>
	      {projects.map(project => (
		  <DropdownItem key={project.id} onClick={() => this.getWikiFromProjectKey(project.id, project.name)}>{project.name}</DropdownItem>	 
	      ))}	
           </DropdownMenu>
           </Dropdown>
		</Col>
		<Col>
	    <ListGroup>
		{wiki.map(wiki => (
		  <ListGroupItem key={wiki.id}>{wiki.name}</ListGroupItem>
		))}
	    </ListGroup>
		</Col>
	    </Row>
	</Container>
	</div>
    );
  }
}

render(<App />, document.getElementById("root"));
