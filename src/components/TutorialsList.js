import React, { Component } from 'react';
import StudentDataService from '../services/tutorial.service.js';
import { Link } from 'react-router-dom';

export default class StudentsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveStudents = this.retrieveStudents.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveStudent = this.setActiveStudent.bind(this);
    this.removeAllStudents = this.removeAllStudents.bind(this);
    this.searchName = this.searchName.bind(this);

    this.state = {
      students: [],
      currentStudent: null,
      currentIndex: -1,
      searchName: ""
    };
  }

  componentDidMount() {
    this.retrieveStudents();
  }

  onChangeSearchName(e){
    const searchName = e.target.value;
    this.setState({
      searchName: searchName
    });
  }

  retrieveStudents(){
    StudentDataService.getAll()
      .then(response => {
        this.setState({
          students: response.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  refreshList(){
    this.retrieveStudents();
    this.setState({
      currentStudent: null,
      currentIndex: -1
    });
  }

  setActiveStudent(student, index){
    this.setState({
      currentStudent: student,
      currentIndex: index
    });
  }

  removeAllStudents(){
    StudentDataService.deleteAll()
    .then(response => {
      this.refreshList();
    })
    .catch(err => {
      console.log(err);
    });
  }

  searchName(){
    StudentDataService.findByName(this.state.searchName)
      .then(response => {
        this.setState({
          students: response.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const {searchName, students, currentStudent, currentIndex} = this.state;

    return (
      <div className='list row'>
        <div className='col-md-8'>
          <div className='input-group mb-3'>
              <input
                type="text"
                className="form-control"
                placeholder="Search by name"
                value={searchName}
                onChange={this.onChangeSearchName}
              />
            <div className='input-group-append'>
              <button
                className='btn btn-outline-secondary'
                type='button'
                onClick={this.searchName}
              >Search</button>
            </div>
          </div>
        </div>
        <div className='col-md-6'>
          <h4>Students List</h4>

          <div class="list-group">
            {students && students.map((student, index) => (
              <li className={"list-group-item list-group-item-action list-group-item-dark" + (index === currentIndex ? "active " : "")} 
              onClick={() => this.setActiveStudent(student, index)}
              key={index}>
                {student.name}
              </li>
            ))}
          </div>

          <button
            className='btn btn-outline-danger m-3'
            onClick={this.removeAllStudents}
          >
            Remove All
          </button>
        </div>
        <h4>Student Detail</h4>
        <div className='col-md-6'>
              {currentStudent ? (
              <table class='table'>
                <thead class="table-dark">
                  <tr>
                    <th>Name</th>
                    <th>Lastname</th>
                    <th>University</th>
                    <th>Graduated</th>
                    <th>Date</th>
                  </tr>
                </thead>
              <tbody>
              <tr>
                <td>{" " + currentStudent.name}</td>
                <td>{" " + (currentStudent.lastname)}</td>
                <td>{" " + currentStudent.university}</td>
                <td>{" " + (currentStudent.graduated ? "Yes" : 'NO')}</td>
                <td>{" " + currentStudent.date}</td>
              </tr>
              </tbody>
              </table>
              ) : (
              <div>
                <br />
                <p>Please click on a student ...</p>
              </div>
              )}
        </div>
      </div>
      
    )
  }
}

    