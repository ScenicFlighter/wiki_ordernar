import React from "react";
import { render } from "react-dom";

import backlog from "./functions/backlog/index.js";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { space: { name: "" }, projects: [], wiki: [] };
    this.getWikiFromProjectKey = this.getWikiFromProjectKey.bind(this);
  }

  async componentDidMount() {
    const space = await backlog.getSpace();
    const projects = await backlog.getProjects();

    this.setState({ space, projects });
  }

  async getWikiFromProjectKey(key) {
    const wiki = await backlog.getWiki(key);

    this.setState({ wiki });
  }

  render() {
    const { space, projects, wiki } = this.state;

    return (
      <>
	  <h1>{space.name}</h1>


	  <div style={{float: "left"}}>
	      <h3>プロジェクト</h3>
        {projects.map(project => (
	    <div key={project.id} style={{padding: 5}}>
            <button
		style={{fontSize: 16, fontWeight: "bold", cursor: "pointer"}}
              onClick={() => this.getWikiFromProjectKey(project.projectKey)}
            >
		{project.name}
            </button>
          </div>
        ))}
	  </div>
	  <div style={{float: "left"}}>
	      <h3>Wiki</h3>
        {wiki.map(wikiData => (
	    <div style={{fontSize: 16, fontWeight: "bold", padding: 10}}>{wikiData.name}</div>
        ))}
	  </div>
      </>
    );
  }
}

render(<App />, document.getElementById("root"));
