import "./App.css";
import { useState } from "react";
import axios from 'axios'
function App() {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const changeHandler = (e) => {
    setSelectedFile(e.target.files[0]);
    setIsFilePicked(true);
  };
  const handleSubmission = () => {
    console.log(selectedFile);
    const data = new FormData() 
    data.append('file', selectedFile)
    axios.post('/sendFile',data)
    .then(function (response) {
      console.log(response);
    })
  };
  return (
    <div className="App">
      <input type="file" name="file" onChange={changeHandler} />
      {isFilePicked ? (
        <div>
          <p>Filename: {selectedFile.name}</p>
          <p>Filetype: {selectedFile.type}</p>
        </div>
      ) : (
        <p>Select a file to show details</p>
      )}
      <div>
        <button onClick={handleSubmission}>Submit</button>
      </div>
    </div>
  );
}

export default App;
