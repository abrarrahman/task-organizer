import React from 'react';

import Tasks from './components/Tasks/Tasks';
import Timer from './components/Timer/Timer';

function App() {
  return (
    <div style={styles.container}>
      <Timer/>
      <Tasks/>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
  }
}

export default App;
