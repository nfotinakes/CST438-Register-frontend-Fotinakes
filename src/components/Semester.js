import React, { Component } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import { DataGrid } from "@mui/x-data-grid";
import { SEMESTER_LIST } from "../constants.js";
import AddStudent from "./AddStudent";
import { SERVER_URL } from "../constants.js";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";

// user selects from a list of  (year, semester) values
// also includes AddStudent component which opens dialog to add new student to system
class Semester extends Component {
  constructor(props) {
    super(props);
    this.state = { selected: SEMESTER_LIST.length - 1 };
  }

  onRadioClick = (event) => {
    console.log("Semester.onRadioClick " + JSON.stringify(event.target.value));
    this.setState({ selected: event.target.value });
  };

  // Method for adding a new student by student name and email
  addStudent = (student_name, student_email) => {
    const token = Cookies.get("XSRF-TOKEN");

    // Check for blank name field
    if (student_name == null || student_name == "") {
      toast.error("Name and Email fields must be entered", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      return;
    }

    // Check for blank email field
    if (student_email == null || student_email == "") {
      toast.error("Name and Email fields must be entered", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      return;
    }

    // Perform POST to local server, passing name and email in body
    fetch(`${SERVER_URL}/student`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-XSRF-TOKEN": token },
      body: JSON.stringify({ name: student_name, email: student_email }),
    })
      .then((res) => {
        // Toasts for either successfull add or error messages
        if (res.ok) {
          toast.success("Student successfully added", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
        } else if (res.status == 400) {
          toast.error("That email already exists", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
          console.error("Post http status =" + res.status);
        } else {
          toast.error("Error when adding", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
          console.error("Post http status =" + res.status);
        }
      })
      .catch((err) => {
        toast.error("Error when adding", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        console.error(err);
      });
  };

  render() {
    const icolumns = [
      {
        field: "id",
        headerName: "Year",
        width: 200,
        renderCell: (params) => (
          <div>
            <Radio
              checked={params.row.id == this.state.selected}
              onChange={this.onRadioClick}
              value={params.row.id}
              color="default"
              size="small"
            />
            {SEMESTER_LIST[params.row.id].year}
          </div>
        ),
      },
      { field: "name", headerName: "Semester", width: 200 },
    ];

    return (
      <div>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Schedule - select a term
            </Typography>
          </Toolbar>
        </AppBar>
        <div align="left">
          <div style={{ height: 400, width: "100%", align: "left" }}>
            <DataGrid rows={SEMESTER_LIST} columns={icolumns} />
          </div>
          <div style={{ display: "flex" }}>
            <Button
              component={Link}
              to={{
                pathname: "/schedule",
                year: SEMESTER_LIST[this.state.selected].year,
                semester: SEMESTER_LIST[this.state.selected].name,
              }}
              variant="outlined"
              color="primary"
              style={{ margin: 10 }}
            >
              Get Schedule
            </Button>
            <AddStudent addStudent={this.addStudent} />
          </div>
        </div>
        <ToastContainer autoClose={1500} />
      </div>
    );
  }
}
export default Semester;
