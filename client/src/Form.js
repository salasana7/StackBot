import React from "react";

export default class Form extends React.Component {
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}> Some form</form>
      </div>
    );
  }
}

