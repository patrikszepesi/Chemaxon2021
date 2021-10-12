import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { createDocument } from '../../../services/document';
import DocumentCreateForm from '../../../components/forms/DocumentCreateForm';
import FileUpload from '../../../components/forms/FileUpload';
import { LoadingOutlined } from '@ant-design/icons';


const DocumentCreate = () => {
  const { user } = useSelector(state => ({ ...state }));

  const initialState = {
    title: '',
    documents: [],
    email:'',
    user: user,

  };

  const [values, setValues] = useState(initialState); //you can pass in an object
  const [loading, setLoading] = useState(false);


  const handleSubmit = e => {
    e.preventDefault();
    createDocument(values, user.token)
      .then(res => {
        console.log(res);
        window.alert(`"${res.data.title}" is created`);
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
        toast.error(err.response.data.err);
      });
  };

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value }); //spread in all previous values in state  and add the new ones one by one seperately

  };


  return (

    <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            {loading ? (
              <LoadingOutlined className="text-danger h1" />
            ) : (
              <h4>Upload your PDF document</h4>
            )}
            <hr />
            {/* {JSON.stringify(values.images)} */}
            <div className="p-3">
              <FileUpload
                values={values}
                setValues={setValues}
                setLoading={setLoading}
              />
            </div>

            <DocumentCreateForm
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              setValues={setValues}
              values={values}
            />
          </div>
        </div>

    </div>
  );
};

export default DocumentCreate;
