import React, { Component } from 'react';

import Skipnav from './components/shared/Skipnav/Skipnav';
import Sidebar from './containers/Sidebar/Sidebar';
import Topbar from './containers/Main/Topbar/Topbar';
import Content from './containers/Main/Content/Content';
import Footer from './components/shared/Footer/Footer';

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
