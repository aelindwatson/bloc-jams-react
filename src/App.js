import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <nav className="link">
            <Link to='/'style={{ textDecoration: 'none', color: '#76ff03'}}>HOME  </Link>
            <Link to='/library'style={{ textDecoration: 'none', color: '#76ff03'}}>  LIBRARY</Link>
          </nav>
          <h1 className='font-effect-anaglyph'>BLOC JAMS</h1>
        </header>
        <main>
          <Route exact path="/" component={Landing} />
          <Route path="/library" component={Library} />
          <Route path="/album/:slug" component={Album} />
        </main>
      </div>
    );
  }
}

export default App;
