import React from "react";
import { Dropdown } from "semantic-ui-react";
import { Image } from "semantic-ui-react";

// const RegisterImage = () => (
//     <Image src='026.png' size='small' />
//   );

const Login = (props) => {
  return (
    <div
      style={{
        marginTop: "5rem",
        marginBottom: "5rem",
        display: "flex",
        width: "100%"
      }}
    >
      <div style={{ width: "30%" , paddingTop: "4rem",}}>
        <h1>Login</h1>
        <form style={{ paddingTop: "2rem" }}>
          <label>Email</label>
          <div class="ui fluid input" style={{ paddingTop: "0.75rem" }}>
            <input type="text" placeholder="example@example.com" />
          </div>

          <br />
          <br />

          <label>Password</label>
          <div class="ui fluid input" style={{ paddingTop: "0.75rem" }}>
            <input type="text" placeholder="*******" />
          </div>

          <div
            class="field"
            style={{ paddingTop: "4rem", paddingBottom: "4rem" }}
          >
            <button class="ui button">Login</button>
          </div>
        </form>
      </div>
      <div style={{ width: "20%" }}>
      </div>
      <div style={{ width: "50%", paddingTop: "0rem"}} class="ui centered image">
        <Image class="ui centered image" src={require("./images/025.png")} size="large" />
      </div>
    </div>
  );
};

export default Login;
