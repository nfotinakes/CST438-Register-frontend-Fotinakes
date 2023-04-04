import React, { Component } from "react";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

// This component handles the add new student feature using a Dialog by name and email
// properties addStudent is required, function called when Add clicked.
class AddStudent extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false, name: "", email: "" };
  }

  // Handle Dialog open
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  // Handle dialog close, clear the student name and email state
  handleClose = () => {
    this.setState({ name: "", email: "" });
    this.setState({ open: false });
  };

  // Save changes in student name dialog text field
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // Save student call the addStudent method passed from prop with student name and email as params, and close modal form
  handleAdd = () => {
    this.props.addStudent(this.state.name, this.state.email);
    this.handleClose();
  };

  render() {
    return (
      <div>
        <Button
          id = "addStudentButton"
          variant="outlined"
          color="primary"
          style={{ margin: 10 }}
          onClick={this.handleClickOpen}
        >
          Add Student
        </Button>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>Add Student</DialogTitle>
          <DialogContent style={{ paddingTop: 20 }}>
            <TextField
              autoFocus
              style={{ margin: 3 }}
              label="Student Name"
              name="name"
              onChange={this.handleChange}
            />
            <TextField
              style={{ margin: 3 }}
              label="Student Email"
              name="email"
              onChange={this.handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button color="secondary" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button id="Add" color="primary" onClick={this.handleAdd}>
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

// required property:  addStudent is a function to call to perform the Add Student action
AddStudent.propTypes = {
  addStudent: PropTypes.func.isRequired,
};

export default AddStudent;
