//pages/HomePage.jsx
import Bookcard from '../components/BookCard/BookCard'
import { useContext } from "react";
import { FormContext } from '../context/FormProvider';

export default function HomePage(){

    const{filteredBook, setFilteredBook} = useContext(FormContext);
    function debugBooks(){console.log(filteredBook);}

    return (
      <>
        <div className="container my-5">
          <button type='button' onClick={debugBooks}>Check Debug Books</button>
          <h2 className="mb-5 text-center text-muted">All Books</h2>

          {filteredBook.length === 0 ? (
            <div className="text-center py-5">
              <h4>No books available</h4>
            </div>
          ) : (
            <section className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
              {filteredBook.map((item) => (
                <Bookcard key={item.id} data={item} />
              ))}
            </section>
          )}
        </div>
      </>
    );
}

