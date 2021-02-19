import React, { useState } from 'react';
import MainContent from "./MainContent";


const App = () => {
  
  

  return (
    <div className="App">
      <header className="ly_header">
        <div className="ly_header_inner">
          <div className="bl_header_title">
            ikeMemo for Among Us
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
