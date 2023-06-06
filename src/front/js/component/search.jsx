import React from 'react'
import "../../styles/search.css";

const Search = ({setSearch}) => {

    const handleChange = (e) =>{
        setSearch(e.target.value)
    }

  return (
    <form className="d-flex justify-content-center m-2">
        <input className="search"  type="text" placeholder='Búsqueda' onChange={handleChange} />
        <button type="submit"className='btn btn-success'>Buscar</button>
    </form>
  )
}

export default Search