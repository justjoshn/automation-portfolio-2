import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Link } from 'react-router-dom';

const SEARCH_PROFILES = gql`
  query searchProfiles($query: String!) {
    searchProfiles(query: $query) {
      id
      name
      age
      email
    }
  }
`;

const DELETE_PROFILE = gql`
  mutation deleteProfile($id: ID!) {
    deleteProfile(id: $id) {
      id
    }
  }
`;

const ProfileList: React.FC = () => {
  const [query, setQuery] = useState('');
  const { loading, error, data } = useQuery(SEARCH_PROFILES, {
    variables: { query },
    skip: !query
  });
  const [deleteProfile] = useMutation(DELETE_PROFILE);

  const handleDelete = (id: string) => {
    deleteProfile({ variables: { id } });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search profiles"
      />
      <ul>
        {data?.searchProfiles.map((profile: any) => (
          <li key={profile.id}>
            <Link to={`/profile/${profile.id}`}>
              {profile.name} - {profile.age} - {profile.email}
            </Link>
            <button onClick={() => handleDelete(profile.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileList;
