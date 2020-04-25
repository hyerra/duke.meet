import React from "react";
import { Dropdown } from "semantic-ui-react";
import { Image } from "semantic-ui-react";

// const RegisterImage = () => (
//     <Image src='026.png' size='small' />
//   );

const options = [
  {
    key: "2020",
    text: "2020",
    value: "2020",
  },
  {
    key: "2021",
    text: "2021",
    value: "2021",
  },
  {
    key: "2022",
    text: "2022",
    value: "2022",
  },
  {
    key: "2023",
    text: "2023",
    value: "2023",
  },
  {
    key: "2024",
    text: "2024",
    value: "2024",
  },
];

const Register = (props) => {
  return (
    <div
      style={{
        marginTop: "3rem",
        marginBottom: "5rem",
        display: "flex",
        width: "100%"
      }}
    >
      <div style={{ width: "30%" , paddingTop: "2rem",}}>
        <h1>Sign Up</h1>
        <form style={{ paddingTop: "2rem" }}>
          <label>Name</label>
          <div class="ui fluid input" style={{ paddingTop: "0.75rem" }}>
            <input type="text" placeholder="Jane Doe" />
          </div>

          <br />
          <br />

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

          <br />
          <br />
          <div style={{ display: "flex" }}>
            <div style={{ width: "35%" }}>
              <label>Year</label>
              <div style={{ paddingTop: "0.75rem" }}>
                <Dropdown
                  placeholder="Year"
                  fluid
                  selection
                  options={options}
                />
              </div>
            </div>

            <div style={{ width: "65%", paddingLeft: "3rem" }}>
              <label>Major</label>
              <div class="ui fluid input" style={{ paddingTop: "0.75rem" }}>
                <input type="text" placeholder="Major" />
              </div>
            </div>
          </div>

          <div
            class="field"
            style={{ paddingTop: "4rem", paddingBottom: "4rem" }}
          >
            <button class="ui button">Sign Up</button>
          </div>
        </form>
      </div>
      <div style={{ width: "22%" }}>
      </div>
      <div style={{ width: "48%", paddingTop: "4rem"}} class="ui centered image">
        <Image class="ui centered image" src={require("./images/026.png")} size="large" />
      </div>
    </div>
  );
};

export default Register;
