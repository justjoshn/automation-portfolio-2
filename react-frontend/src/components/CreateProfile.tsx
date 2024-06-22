import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const CREATE_PROFILE = gql`
  mutation createProfile($name: String!, $age: Int!, $email: String!) {
    createProfile(name: $name, age: $age, email: $email) {
      id
      name
      age
      email
    }
  }
`;

const LIST_PROFILES = gql`
  query listProfiles {
    listProfiles {
      id
      name
      age
      email
    }
  }
`;

const CreateProfile: React.FC = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState('');
  const [createProfile] = useMutation(CREATE_PROFILE, {
    refetchQueries: [{ query: LIST_PROFILES }]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createProfile({ variables: { name, age, email } });
    setName('');
    setAge(0);
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(parseInt(e.target.value))}
        placeholder="Age"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <button type="submit">Create Profile</button>
    </form>
  );
};

export default CreateProfile;
