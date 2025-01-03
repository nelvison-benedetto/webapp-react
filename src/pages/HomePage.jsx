//pages/HomePage.jsx
import Bookcard from '../components/BookCard/BookCard'
import { useContext } from "react";
import { FormContext } from '../context/FormProvider';

export default function HomePage(){

    const{filteredBook, setFilteredBook} = useContext(FormContext);
    function showBooks(){console.log(filteredBook);}
    return (
        <div className="container">
          <button type='button' onClick={showBooks}>Check Books</button>
          <section className='row row-cols-1 row-cols-sm-1 row-cols-md-3 row-cols-lg-4 g-5'>
            {filteredBook.map((item,index)=><Bookcard key={item.id} data={item}/>)}
          </section>
        </div>
    );
}

