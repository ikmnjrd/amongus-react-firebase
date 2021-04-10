import React, { useState } from 'react';
import MainContent from "./MainContent";


const App = () => {
  
  

  return (
    <div className="App">
      <header className="ly_header" id="header">
        <div className="ly_header_inner">
          <div className="bl_header_title">
            <span data-text="ikeMemo for Among Us">Memo Among Us</span>
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
