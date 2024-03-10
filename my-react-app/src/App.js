import React, {useState, useRef} from "react";
// import {GoogleAuth} from "google-auth-library";
// import google from "googleapis";
import neswpaper_image from './newspaper.svg';
import upload_image from './cloud-upload.svg'
import summarize_image from './pencil.svg'
import axios from 'axios';
import './App.css';
import ReactMarkdown from 'react-markdown';

 function App() {
  const sampleData = {"message":"# Summary of the Universal Declaration of Human Rights\n\n## Preamble\nThe preamble presents the foundational beliefs underpinning the declaration, such as the inherent dignity and equal rights of all human beings, the necessity of protecting human rights by law, the promotion of friendly relations between nations, and the commitment of Member States to achieve universal respect and observance of human rights.\n\n## Articles\nThe subsequent articles outline specific rights and freedoms, such as the right to life, liberty, and security, prohibition of slavery and torture, equal protection before the law, the right to an effective remedy, freedom of movement and residence, the right to seek asylum, the right to own property, freedom of thought, conscience, and religion, freedom of opinion and expression, right to work and to rest, the right to education, and the duty to the community along with prescribed limitations.\n\n## Conclusion \nThe declaration concludes by asserting that nothing in the declaration should be interpreted as granting any entity the right to engage in activities aimed at destroying any of the rights and freedoms outlined.\n\nThis summary covers the main points and provisions of the Universal Declaration of Human Rights."}

  const [url, setURL] = React.useState("");
  const [display, setDisplay] = React.useState("");
  const [textbox, setBox] = React.useState(false);
  const ref = useRef();

  var inputText = "";
  const serverURL = "http://localhost:3001/api"
  
  const fetchInfo = () => { 
    return axios({
      method: "POST",
      url: serverURL,
      headers: { 'Content-Type': 'application/json;charset=UTF-8', "Access-Control-Allow-Origin": "*", "Accept": "application/json" },
      data: {
          url : url
      }
    }) 
             .then((response) => setDisplay(response.data.message))
             .catch(error => console.log(error));
  }

  React.useEffect(() => {
    fetchInfo(); 
  }, [url])

  const handleClick = (e) => {
    var inputText = document.getElementById('textInput').value;
    setURL(inputText);
  }

  const onClick = (e) => {
    setBox(true);
  }
  

  return (
    <div className="App">
      <div className="App-background">
        <div className='App-template'>
          <div className='child1'>
            <div className='logo-header'>
              <img src={neswpaper_image}/>
              <div className='logo-text'>ClearSpeak</div>
            </div>
            <div className='catchphrase'>Condense & Comprehend Knowledge</div>

            <div className='note'>URL must be a link to a PDF</div>
            {
              textbox == false &&
              <button onClick={onClick} className="upload-button">
                <img src={upload_image}/> Upload URL
              </button> 
            }

            {
              textbox == true &&
              <input ref={ref} className="text-field" type="text" id="textInput"></input>
            }

            <button onClick={handleClick} className="summarize-button">
              <img src={summarize_image}/> Summarize
            </button> 

          </div>
          <div className='child2'>
            <div className="text-title">Summarized Text</div>
            <div className="text-box">
              <div className="summary-text">
                <ReactMarkdown>
                 {sampleData.message}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;

