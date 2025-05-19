//context/FormProvider.jsx
import { createContext, useState, useEffect } from "react";
export const FormContext = createContext();

export default function FormProvider({children}){
    const [books, setBooks] = useState([]);
    const [searchedBook, setSearchedBook] = useState('');
    const [searchedBookUrl, setSearchedBookUrl] = useState('');
    const [filteredBook, setFilteredBook] = useState([]);

    const [filteredReview, setFilteredReview] = useState([]);
    const [loading, setLoading] = useState(false);

    const REACT_HOST = import.meta.env.VITE_REACT_HOST;
    const REACT_PORT = import.meta.env.VITE_REACT_PORT;
    const url_base = `${REACT_HOST}:${REACT_PORT}`;

    function handleSearchForm(e){
        e.preventDefault();
        setSearchedBook(e.target.value);
    }
    useEffect(()=>{fetchData()},[]);  //initial fetch to set books


    useEffect(()=>{
        const searchedBook_url = searchedBook.toLowerCase().replace(/\s+/g, '+');  //transforms one or more spaces into a single'+'
        setSearchedBookUrl(searchedBook_url);
    },[searchedBook]); //run each time searchedBook is modified
    useEffect(()=>{
        if(!searchedBookUrl) return;
        //console.log(searchedBookUrl);  //ok non rimane 1character indietro!
        fetchData();
    },[searchedBookUrl]);


    useEffect(()=>{
        const newFilteredBook = books.filter((item,index)=> item.title.toLowerCase().replace(/\s+/g,'+').includes(searchedBook.toLowerCase().replace(/\s+/g,'+')));
            //.trim() bad because donesn't delete the space between the words
        setFilteredBook(newFilteredBook);
      }, [books, searchedBook]  //executed each time mangas or searchText change
      );

      
    function fetchData(){
        const url = `${url_base}/books`;
        setLoading(true);
        fetch(url)
            .then(res=>res.json())
            .then(response=>{
                setBooks(response.data);  //response.data NON INVECE response.result!!
            })
            .catch(error=>{console.error("error fetching data:", error);})
            .finally(() => {
                setLoading(false);  //loading deactivated when fetch is finished
            });
    }


    return(
        <FormContext.Provider
          value={{
            books, setBooks,
            searchedBook, setSearchedBook, handleSearchForm,
            searchedBookUrl, setSearchedBookUrl,
            filteredBook, setFilteredBook,
            loading, setLoading,
            fetchData
          }}
        >
          {children}
        </FormContext.Provider>
    );
}