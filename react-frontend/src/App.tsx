import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ApolloProvider from './ApolloProvider';
import ProfileList from './components/ProfileList';
import CreateProfile from './components/CreateProfile';
import ProfileDetails from './components/ProfileDetails';

const App: React.FC = () => {
  return (
    <ApolloProvider>
      <Router>
        <div className="App">
          <h1>Profile Management</h1>
          <Routes>
            <Route path="/" element={<><CreateProfile /><ProfileList /></>} />
            <Route path="/profile/:id" element={<ProfileDetails />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
};

export default App;
