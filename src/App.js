import React, { Component } from 'react';

import Skipnav from './components/Skipnav';
import Sidebar from './containers/Sidebar';
import Topbar from './containers/Topbar';
import Content from './containers/Content';
import Footer from './components/Footer';

class App extends Component {
  render() {
    return (
      <>
        <Skipnav />
        <Sidebar />
        <main id="main" className="main">
          <Topbar />
          <Content />
        </main>
        <Footer />
      </>
    );
  }
}

export default App;
