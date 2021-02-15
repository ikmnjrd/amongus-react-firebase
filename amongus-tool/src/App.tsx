import React, { useState } from 'react';
import Slider from '@material-ui/core/Slider';
import Divider from '@material-ui/core/Divider';
import MainContent from "./MainContent";


const App = () => {
  
  

  return (
    <div className="App">
      <header className="ly_header">
        <div className="ly_header_inner">
          <div className="bl_header_title">
            among us tool by ikeda
          </div>

        </div>
        {/* ly_header_inner --> */}
      </header>
      {/* ly_header --> */}
      

      <MainContent />
    </div>
  );
}

export default App;
