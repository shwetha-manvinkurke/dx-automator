import React, { Component } from 'react';
import axios from 'axios';
import ContentClassTabs from "./components/ContentClassTabs";
import TasksList from "./components/TasksList";
import AddTask from "./components/AddTask";
import Header from "./components/Header";
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Home from './components/Home';

class App extends Component {
  constructor() {
    super();
    this.state = {
      tasks: []
    };
  }

  componentDidMount() {
    this.getTasks();
  };

  // Adds a task to the db
  addTask = (creator, link) => {
    return axios.post(`${process.env.REACT_APP_TASKS_SERVICE_URL}/tasks`,
      {creator, link}).then((res) => {this.getTasks()})
      .catch((err) => { console.log(err); });
  };

  // Gets all the tasks in the db
  getTasks(){
    return axios.get(`${process.env.REACT_APP_TASKS_SERVICE_URL}/tasks`)
    .then((res) => {this.setState({tasks: res.data.data.tasks});})
    .catch((err) => { console.log(err); });
  };



  render() {
    return (
      <BrowserRouter>
      <div className="App" id="app-maindiv">
        {/* Header with the title and settings button */}
        <div className="Header">
          <Header/>
        </div>
        <div className="ContentClassTabs" id="tabs-container">
        <ContentClassTabs/>
        <div id="add-task-button-conatiner">
        {/* TODO: define dynamic input fields */}
          <AddTask call={this.addTask}/>
        </div>
      </div>
      <div className="Body">
      <TasksList tasks={this.state.tasks}/>
    </div>
        <main>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/dashboard/triage' component={Dashboard}/>
      </Switch>
    </main>
        </div>

      </BrowserRouter>
    );
  }
}

export default App; 
