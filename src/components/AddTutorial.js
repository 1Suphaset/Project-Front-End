import React, { Component } from 'react';
import StudentDataService from '../services/tutorial.service.js';

export default class AddStudent extends Component {
  constructor(props){  //ทำทันที
    super(props);  // ส่งให้คลาสแม่

    this.onChangeStuId = this.onChangeStuId.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeLastname = this.onChangeLastname.bind(this);
    this.onChangeUniversity = this.onChangeUniversity.bind(this);
    this.onChangeGraduated = this.onChangeGraduated.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.saveStudent = this.saveStudent.bind(this);
    this.newStudent = this.newStudent.bind(this);

    this.state = {
      id: null,
      stu_id: "",
      name: '',
      lastname: '',
      university: '',
      graduated: null,
      date: '',
      submitted: false
    }
  }

  onChangeStuId(e) {
    this.setState({
      stu_id: e.target.value
    });
  }

  onChangeName(e){
    this.setState({
      name: e.target.value
    });
  }
  onChangeLastname(e){
    this.setState({
      lastname: e.target.value
    });
  }
  onChangeUniversity(e){
    this.setState({
      university: e.target.value
    });
  }
  onChangeGraduated(e){
    this.setState({
      graduated: e.target.value
    });
  }
  onChangeDate(e){
    this.setState({
      date: e.target.value
    });
  }
  saveStudent() {
    var data = {
      stu_id: this.state.stu_id,
      name: this.state.name,
      lastname: this.state.lastname,
      university: this.state.university,
      graduated: this.state.graduated,
      date: this.state.date
    };

    StudentDataService.create(data)
      .then( response => {
        this.setState({
          stu_id: this.state.stu_id,
          name: response.data.name,
          lastname: response.data.lastname,
          university: response.data.university,
          graduated: response.data.graduated,
          date: response.data.date,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  newStudent(){
    this.setState({
      id: null,
      stu_id: "",
      name: "",
      lastname: "",
      university: "",
      graduated: null,
      date: "",

      submitted: false
    });
  }

  render() {
    return (
      <div className='submit-form'>
        {this.state.submitted ? (
          <>
            <h4>You submitted successfully</h4>
            <button className='btn btn-success' onClick={this.newStudent}>Add</button>
          </>
        ) : (
          <>
            <div className='form-group'>
              <label htmlFor='Stu_id'>id:</label>
              <input type='text' 
                className='form-control' 
                id='stu_id' value={this.state.stu_id}
                onChange={this.onChangeStuId}
                name='name'
                required />
            </div>
            <div className='form-group'>
              <label htmlFor='name'>Name</label>
              <input type='text' 
              className='form-control'
              no='name' 
              value={this.state.name}
              onChange={this.onChangeName}
              name='name'
              required />
            </div>
            <div className='form-group'>
              <label htmlFor='lastname'>Lastname</label>
              <input type='text' 
              className='form-control'
              id='lastname' 
              value={this.state.lastname}
              onChange={this.onChangeLastname}
              name='lastname'
              required />
            </div>
            <div className='form-group'>
              <label htmlFor='university'>University</label>
              <input type='text' 
              className='form-control'
              id='university' 
              value={this.state.university}
              onChange={this.onChangeUniversity}
              name='university'
              required />
            </div>
            <div className='form-group'>
              <label htmlFor='graduated'>Graduated</label>
              <select 
              className='form-control'
              id='graduated' 
              value={this.state.graduated}
              onChange={this.onChangegraduated}
              name='graduated'
              required >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
              </select>
            </div>
            <div className='form-group'>
              <label htmlFor='date'>Date:</label>
              <input type='text' 
              className='form-control'
              id='date' 
              value={this.state.date}
              onChange={this.onChangeDate}
              name='date'
              required />
            </div>

            <button onClick={this.saveStudent} 
              className="btn btn-outline-success">
                Submit
            </button>
          </>
        )}
      </div>
    )
  }
}
