import React from 'react'

function Header({searchQuery, handleSearch}) {
  return (
    <div>
       <header>
        <h1>Search Photos</h1>
        <input
          type="text"
          placeholder="Search images..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </header>
    </div>
  )
}

export default Header