import React, { Component } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import AddStudent from './components/AddTutorial';
import Student from './components/Tutorial';
import StudentList from './components/TutorialsList';
import Delete from './components/delete'

class App extends Component {
  render() {
    return (
      <>
        <nav className='navbar navbar-expand navbar-dark bg-dark'>
          <Link to="/students" className='navbar-brand'>
          Project ITD102
          </Link>
          <div className='navbar-nav mr-auto'>
            <li className='nav-item'>
              <Link to="/students" className='nav-link'>
              all student
              </Link>
            </li>
            <li className='nav-item'>
              <Link to="/add" className='nav-link'>
              add student
              </Link>
            </li>
            <li className="nav-item">
                <Link to="/delete" className="nav-link">
                  delete student
                </Link>
              </li>
          </div>
        </nav>

        <div className='container mt-3'>
          <Routes>
            <Route path='/' element={<StudentList />} />
            <Route path='/students' element={<StudentList />} />
            <Route path='/add' element={<AddStudent />} />
            <Route path='/student/:id' element={<Student />} />
            <Route path='/Delete' element={<Delete />}/>
          </Routes>
        </div>
      </>
    )
  }
}

export default App;