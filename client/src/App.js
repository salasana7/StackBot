import "./App.css";
import Typical from "react-typical";
import Form from "./Form";
import Stats from "./Stats";

function App() {
  return (
    <div className="App">
      <div id="header">
        <img src="robotic.svg" alt="robot" />
        <Typical
          steps={[ "Hello Fullstack student, your journey for office hours ends here!", 3000, "All I need is your soul...", 1000, "jk drop me your email :)"
          ]}
          loop={1}
          wrapper="p"
        />
      </div>
      <div id="container">
        <Form />
        <Stats />
      </div>
    </div>
  );
}

export default App;
