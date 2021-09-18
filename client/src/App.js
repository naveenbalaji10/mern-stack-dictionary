import './App.css'
import React from 'react'
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import CardScreen from './screens/CardScreen'

function App() {
  return (
    <Router>
      <div className='App' style={{ backgroundColor: '#eee' }}>
        <Switch>
          <Route exact path='/' component={HomeScreen} />
          <Route path='/word/:id' component={CardScreen} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
