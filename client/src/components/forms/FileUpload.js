import React, { useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';


const FileUpload = ({ values, setValues, setLoading }) => {
  const { user } = useSelector(state => ({ ...state }));
  const [ file, setFile ] = useState(null)
  const [ fileName, setFileName ] = useState(null)


  const fileToBase64 = (file, cb) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
      cb(null, reader.result)
    }
    reader.onerror = function (error) {
      cb(error, null)
    }
  }
  const handleFileUpload = async ({ target }) => {
    if (target.files < 1 || !target.validity.valid) {
      return
    }
    fileToBase64(target.files[0], (err, result) => {

      if (result) {
        setFile(result)
        setFileName(target.files[0])
        axios
          .post(
          `${process.env.REACT_APP_API}/upload/documents/`,
            {result:result}
          ,
            {
              headers: {
                authtoken: user ? user.token : '',
              "Content-Type": "application/json",
              }
            }
          )
          .then(res => {
            console.log('Document UPLOAD RES DATA', res);
            setValues({ ...values, documents: res.data }); //put it into  state
            setLoading(false);

          })
          .catch(err => {
            setLoading(false);
            console.log('AWS UPLOAD ERR', err);
          });
      }
    })
  }

  return (
    <>
    <div className="App">
   <div className="upload-area">
     { fileName && <p className="filename">{fileName.name}</p> }
     <input type="file" name="filetobase64" onChange={handleFileUpload} accept="application/pdf" />
   </div>
   <br/>

 </div>
    </>
  );
};

export default FileUpload;
