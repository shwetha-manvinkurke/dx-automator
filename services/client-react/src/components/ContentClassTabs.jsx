import React from 'react';
import {Tabs, Tab} from "@sendgrid/ui-components"
import {Link, Route} from 'react-router-dom';
import Dashboard from './Dashboard';


const ContentClassTabs = () => {
  return (
    <Tabs id="tabs" zeroBorder centered>
        <Tab active><Link to="/">Tasks</Link></Tab>
        <Tab><Link to="/">Coming</Link></Tab>
        <Tab><Link to="/">Soon</Link></Tab>
        <Tab><Link to="/dashboard/triage">Dashboard</Link></Tab>
    </Tabs>
  )
};

export default ContentClassTabs