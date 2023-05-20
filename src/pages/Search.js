import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom"

function Search ({ onUserFetch }) {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSearch = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      setUser(response.data);
      onUserFetch(response.data); // Pass the fetched user data to the callback function
      setNotFound(false);
      //console.log(response.data);
      navigate(`user/${username}`);
      setUser('');
    } catch (error) {
      setUser(null);
      setNotFound(true);
      setUsername("");
    }
  };

  return (
    <div className='container home'>
      <section className='search'>
        <div className='title'>
          <h1>GitHub Finder</h1>
        </div>
        <form onSubmit={handleSearch}>
          <input 
            type="text" 
            value={username} 
            onChange={handleInputChange} 
            placeholder='Enter a GitHub username'
          />
          <input 
            type="submit" value="Search"/>
        </form>
        <div className='message'>
          {notFound && <p>User not found.Try again.</p>}
        </div>
      </section>
    </div>
  );
};

export default Search;



