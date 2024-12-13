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
    useEffect(()=>{fetchData()},[]);
    useEffect(()=>{
        const searchedBook_url = searchedBook.toLowerCase().replace(/\s+/g, '+');  //transforms one or more spaces into a single'+'
        setSearchedBookUrl(searchedBook_url);
    },[searchedBook]); //run each time searchedBook is modified
    useEffect(()=>{
        if(!searchedBookUrl) return;
        fetchData();
    },[searchedBookUrl]);

    function fetchData(){
        const url = 'http://localhost:3001/something';
        fetch(url)
            .then(res=>res.json())
            .then(response=>{
                setFilteredBook(response.results);
                console.log("fetching data");
            })
            .catch(error=>{console.error("error fetching data:", error);})
        console.log(filteredBook);
    }


    return(
        <FormContext.Provider
          value={{
            searchedBook, setSearchedBook,
            searchedBookUrl, setSearchedBookUrl,
            filteredBook, setFilteredBook
          }}
        >
          {children}
        </FormContext.Provider>
    );
}