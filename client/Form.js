import React from "react";
import axios from "axios";

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      host: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }
  async handleSubmit(evt) {
    evt.preventDefault();
    try {
      await axios.post("/api/email", {email: this.state.email, host: this.state.host});
      this.setState({
        email: "",
        host: "Please select a host",
      });
      this.props.onSubmit()
    } catch (err) {
      this.setState({
        errorMessage: `There was a problem storing the email: ${err.message}`,
      });
    }
  }
  render() {
    return (
      <div className="box">
        <form>
          <div className="inputBox">
            <input
              type="text"
              name="email"
              onChange={(event) =>
                this.setState({ ...this.state, email: event.target.value })
              }
              value={this.state.email}
            />
            <label htmlFor="email">Email</label>
          </div>
          <div>
            <select
              name="hosts"
              onChange={(event) =>
                this.setState({ ...this.state, host: event.target.value })
              }
              value={this.state.host}
            >
              <option>Please select a host</option>
              <option>Anyone</option>
              <option>Ben</option>
              <option>Tori</option>
              <option>Finn</option>
              <option>Johnny</option>
              <option>Maddie</option>
              <option>Jolie</option>
              <option>Katie</option>

            </select>
          </div>
          <button type="submit" onClick={this.handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}
