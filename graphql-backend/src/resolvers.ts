let profiles = [
    { id: '24', name: 'Jacob Myers', age: 41, email: 'jmyers@email.com' }
  ];
  
  export const resolvers = {
    Query: {
      searchProfiles: (_: any, { query }: { query: string }) => {
        return profiles.filter(profile =>
          profile.name.toLowerCase().includes(query.toLowerCase())
        );
      },
      getProfile: (_: any, { id }: { id: string }) => {
        return profiles.find(profile => profile.id === id);
      },
      listProfiles: () => profiles
    },
    Mutation: {
      createProfile: (_: any, { name, age, email }: { name: string, age: number, email: string }) => {
        const newProfile = { id: `${profiles.length + 1}`, name, age, email };
        profiles.push(newProfile);
        return newProfile;
      },
      updateProfile: (_: any, { id, name, age, email }: { id: string, name?: string, age?: number, email?: string }) => {
        const profile = profiles.find(profile => profile.id === id);
        if (!profile) return null;
  
        if (name !== undefined) profile.name = name;
        if (age !== undefined) profile.age = age;
        if (email !== undefined) profile.email = email;
  
        return profile;
      },
      deleteProfile: (_: any, { id }: { id: string }) => {
        const index = profiles.findIndex(profile => profile.id === id);
        if (index === -1) return null;
  
        const deletedProfile = profiles.splice(index, 1)[0];
        return deletedProfile;
      }
    }
  };
  