import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';

const GET_PROFILE = gql`
  query getProfile($id: ID!) {
    getProfile(id: $id) {
      id
      name
      age
      email
    }
  }
`;

const UPDATE_PROFILE = gql`
  mutation updateProfile($id: ID!, $name: String, $age: Int, $email: String) {
    updateProfile(id: $id, name: $name, age: $age, email: $email) {
      id
      name
      age
      email
    }
  }
`;

const ProfileDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_PROFILE, { variables: { id } });
  const [updateProfile] = useMutation(UPDATE_PROFILE);

  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (data) {
      setName(data.getProfile.name);
      setAge(data.getProfile.age);
      setEmail(data.getProfile.email);
    }
  }, [data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ variables: { id, name, age, email } });
    navigate('/');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

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
      <button type="submit">Update Profile</button>
    </form>
  );
};

export default ProfileDetails;
