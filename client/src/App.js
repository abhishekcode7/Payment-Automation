import "./App.css";
import { useState } from "react";
import axios from "axios";
import { Button } from "@material-ui/core";
function App() {
  const [selectedFile, setSelectedFile] = useState();
  const [selectedFile2, setSelectedFile2] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [isFilePicked2, setIsFilePicked2] = useState(false);
  const changeHandler = (e) => {
    setSelectedFile(e.target.files[0]);
    setIsFilePicked(true);
  };
  const changeHandler2 = (e) => {
    setSelectedFile2(e.target.files[0]);
    setIsFilePicked2(true);
  };
  const handleSubmission = () => {
    const data = new FormData();
    data.append("file", selectedFile);
    data.append("file2", selectedFile2);
    axios.post("/sendFile", data).then((res) => {
      alert(res.data.code);
    });
  };
  const runScript = () => {
    fetch("/status")
      .then((res) => res.json())
      .then((data) => {
        if (data.value === 0) alert(data.code);
        else {
          fetch("/runScript")
            .then((res) => res.json())
            .then((data) => {
              alert(data.code);
            });
        }
      });
    // fetch("/runScript")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     alert(data.code);
    //   });
  };
  const stopScript = () => {
    fetch("/stopScript")
      .then((res) => res.json())
      .then((data) => {
        alert(data.code);
      });
  };
  return (
    <div className="App">
      <div className="d-flex">
        <h5> Select Bill Details ( Excel File )</h5>
        <input
          className="input"
          type="file"
          name="file"
          placeholder="Bill Details (Excel File))"
          onChange={changeHandler}
        />
      </div>
      {isFilePicked ? (
        <div>
          <p>Filename: {selectedFile.name}</p>
        </div>
      ) : (
        <p>Select a file to show details</p>
      )}
      <div>
        <div className="d-flex">
          <h5> Select Card Details ( Excel File )</h5>
          <input
            className="input"
            type="file"
            name="file"
            placeholder="Bill Details (Excel File))"
            onChange={changeHandler2}
          />
        </div>
        {isFilePicked2 ? (
          <div>
            <p>Filename: {selectedFile2.name}</p>
            {/* <p>Filetype: {selectedFile2.type}</p> */}
          </div>
        ) : (
          <p>Select a file to show details</p>
        )}
      </div>
      <div>
        {selectedFile && selectedFile2 && (
          <Button variant="outlined" color="primary" onClick={handleSubmission}>
            Upload Files
          </Button>
        )}
      </div>
      <div className="run">
        <Button variant="outlined" color="primary" onClick={runScript}>
          Run Script
        </Button>
      </div>
      <div style={{ marginTop: "10px" }}>
        <Button variant="outlined" color="primary" onClick={stopScript}>
          Stop Script
        </Button>
      </div>
    </div>
  );
}

export default App;
