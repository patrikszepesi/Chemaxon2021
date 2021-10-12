import React, { useEffect, useState } from 'react';
import { getMyDocuments } from '../../../services/document';
import UserDocumentCard from '../../../components/cards/UserDocumentCard';
import { removeDocument } from '../../../services/document';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';


const AllDocuments = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  // redux
  const { user } = useSelector(state => ({ ...state }));

  useEffect(() => {
    loadAllDocuments();
  }, []);

  const loadAllDocuments = () => {
    setLoading(true);
    getMyDocuments(user._id)
      .then(res => {
        setDocuments(res.data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  };
  //
  const handleRemove = slug => {
    // let answer = window.confirm("Delete?");
    if (window.confirm('Delete?')) {
      // console.log("send delete request", slug);
      removeDocument(slug, user.token)
        .then(res => {
          loadAllDocuments(); //load all documents  updated
          toast.error(`${res.data.title} is deleted`);
        })
        .catch(err => {
          if (err.response.status === 400) toast.error(err.response.data);
          console.log(err);
        });
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">


        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>All Documents</h4>
          )}
          <div className="row">
            {documents.map(document => (
              <div key={document._id} className="col-md-4 pb-3">
                <UserDocumentCard
                  document={document}
                  handleRemove={handleRemove}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllDocuments;
