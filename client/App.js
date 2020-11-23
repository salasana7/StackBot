import React from "react";
import "./App.css";
import Typical from "react-typical";
import Form from "./Form";

function App() {
  const [submited, setSubmited] = React.useState(false);
  const onSubmit = () => {
    setSubmited(true);
  };
  return (
    <div className="App">
      <div id="header">
        <img src="robotic.svg" alt="robot" />
        {submited ? (
          <div id="thx">Thank you! Now go do something fun, or don't.</div>
        ) : (
          <Typical
            steps={[
              "Hola Fullstack student, your journey to office hours ends here!",
              2000,
              "All I need is your soul...",
              4000,
              "jk just drop me your email and select your favorite host",
              2000,
              "I'll get in touch as soon as they post new office hours",
            ]}
            loop={1}
            wrapper="p"
          />
        )}
      </div>
      <div id="container">{!submited && <Form onSubmit={onSubmit} />}</div>
    </div>
  );
}

export default App;
