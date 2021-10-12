import React from 'react';


const DocumentCreateForm = ({handleSubmit, handleChange, values}) => {

  // destructure
  let {
    title
  } = values;

  return (
        <>
         <form onSubmit={handleSubmit}>
            <label>Name your PDF document</label>
            <input
              type="string"
              name="title"
              className="form-control"
              value={title}
              onChange={handleChange}
            />
          <button
            className="btn btn-outline-info">
            Save
          </button>
        </form>
      </>
  );
};

export default DocumentCreateForm;
