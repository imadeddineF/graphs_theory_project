// import { useState } from "react";
import Main from "./components/Main";
// import Tutorial from "./components/Tutorial";
import "./App.css";

function App() {
  // const [showTutorial, setShowTutorial] = useState(true);
  return (
    <div className="min-h-screen">
      {/* {showTutorial ? (
        <Tutorial close={() => setShowTutorial(false)} />
      ) : (
        
      )} */}
      <Main />
    </div>
  );
}

export default App;
