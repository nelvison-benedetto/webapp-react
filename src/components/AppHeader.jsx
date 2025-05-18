//components/AppHeader.jsx
import { useContext } from "react";
import { FormContext } from "../context/FormProvider";
import { NavLink } from "react-router-dom";

export default function AppHeader(){
    const {searchedBook, handleSearchForm} = useContext(FormContext);

    return(
        <header>
          <div  className="container-fluid d-flex align-items-center justify-content-between py-2 px-4 c-brown1">
            <NavLink to='/' style={{textDecoration: 'none'}}> 
              <h1 className='text-gold1'>YIELD Library</h1>
            </NavLink>
            <form className="formsearch ">
              <input 
                type="text"
                className='rounded-2'
                name='searchText'
                id='searchText'
                aria-describedby='search helper' //add this when there is no Label x this input
                placeholder='  ... search book 📚'
                value={searchedBook}
                onChange={handleSearchForm}
              />
            </form>
          </div>
        </header>
    );
}