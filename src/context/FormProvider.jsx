//context/FormProvider.jsx
import { createContext, useState, useEffect } from "react";
export const FormContext = createContext();

export default function FormProvider({children}){
    const [searchedBook, setSearchedBook] = useState('');
    const [searchedBookUrl, setSearchedBookUrl] = useState('');
    const [filteredBook, setFilteredBook] = useState([]);

    const REACT_HOST = import.meta.env.VITE_REACT_HOST;
    const REACT_PORT = import.meta.env.VITE_REACT_PORT;
    const url_base = `${REACT_HOST}:${REACT_PORT}`;

    function handleSearchForm(e){
        e.preventDefault();
        setSearchedBook(e.target.value);
    }
    useEffect(()=>{fetchData()},[]);  //run at the start 
    useEffect(()=>{
        const searchedBook_url = searchedBook.toLowerCase().replace(/\s+/g, '+');  //transforms one or more spaces into a single'+'
        setSearchedBookUrl(searchedBook_url);
        console.log(searchedBookUrl);
    },[searchedBook]); //run each time searchedBook is modified
    useEffect(()=>{
        if(!searchedBookUrl) return;
        fetchData();
    },[searchedBookUrl]);

    function fetchData(){
        const url = `${url_base}/book`;
        fetch(url)
            .then(res=>res.json())
            .then(response=>{
                setFilteredBook(response.data);  //response.data NON INVECE response.result!!
            })
            .catch(error=>{console.error("error fetching data:", error);})
    }

    return(
        <FormContext.Provider
          value={{
            searchedBook, setSearchedBook, handleSearchForm,
            searchedBookUrl, setSearchedBookUrl,
            filteredBook, setFilteredBook
          }}
        >
          {children}
        </FormContext.Provider>
    );
}