import React, { usestate } from 'react';

const ErrorPage = () => {


  return (
    <div style={{ paddingTop: '30vh', height: '100vh', backgroundColor: 'lightgray', fontSize: 40, color: 'red', fontWeight: 'bolder', textAlign: 'center' }}>
      404 ERROR: This site doesn't exist. Please double check your url.
    </div>
  );
}

export default ErrorPage;
