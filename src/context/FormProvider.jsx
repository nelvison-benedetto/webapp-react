//context/FormProvider.jsx
import { createContext, useState, useEffect } from "react";
export const FormContext = createContext();

export default function FormProvider({children}){
    const [searchedBook, setSearchedBook] = useState('');
    const [searchedBookUrl, setSearchedBookUrl] = useState('');
    const [filteredBook, setFilteredBook] = useState([]);

    function handleSearchForm(e){
        e.preventDefault();
        setSearchedBook(e.target.value);
    }
    useEffect(()=>{
        const searchedBook_url = searchedBook.toLowerCase().replace(/\s+/g, '+');  //transforms one or more spaces into a single'+'
        setSearchedBookUrl(searchedBook_url);
    },[searchedBook]); //run each time searchedBook is modified
    useEffect(()=>{
        if(!searchedBookUrl) return;
        fetchData();
    },[searchedBookUrl]);

    function fetchData(){
        
    }


    return(
        <FormContext.Provider
          value={{}}
        >
          {children}
        </FormContext.Provider>
    );
}