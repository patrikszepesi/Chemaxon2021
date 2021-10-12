import React from 'react';
import Jumbotron from '../components/cards/Jumbotron';

const Home = () => {

  return (
      <div className="jumbotron text-danger h1 font-weight-bold text-center">
        <Jumbotron
          text={['Upload documents', 'Download documents ', 'Share Documents']}
        />
      </div>
      
  );
};

export default Home;
