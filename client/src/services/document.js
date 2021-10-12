import axios from 'axios';

export const createDocument = async (document, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/document-user`, document, {
    headers: {
      authtoken
    }
  });

export const getMyDocuments = async user =>
  await axios.get(`${process.env.REACT_APP_API}/my-documents/${user}`);

export const removeDocument = async (slug, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/document/${slug}`, {
    headers: {
      authtoken
    }
  });
