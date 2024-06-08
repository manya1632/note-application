import React, { useState } from 'react'
import ProfileInfo from '../Cards/ProfileInfo';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';

const NavBar = () => {
 
  const[searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {}

  const onClearSearch = () => {
    setSearchQuery("");
    return;
  }

  
  const navigate = useNavigate();

  const onLogout = () => {
    navigate("/signin");
  };

  return (
    <div class="bg-white flex justify-between items-center px-6 py-2 drop-shadow">
        <h2 class="text-2xl font-bold text-black py-2">
            Notes 
        </h2>

        <SearchBar 
        value={searchQuery}
        onChange={(e)=>setSearchQuery(e.target.value)}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
        />

        <ProfileInfo onLogout = {onLogout} ></ProfileInfo>

    </div>
  );
};

export default NavBar;