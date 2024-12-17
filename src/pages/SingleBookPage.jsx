import { useParams , useNavigate} from "react-router-dom"; //useParams x get params from url, useNavigate x 
import { useEffect, useState } from "react";
import ReviewCard from "../components/ReviewCard";

export default function SingleBookPage(){
    const navigate = useNavigate();
    const {id} = useParams();   //get the id when you insert in url ...book/2 get 2
    const [book, setBook] = useState(null);
    const url = `http://localhost:3001/book/${id}`;
    
    useEffect(()=>{
        fetch(url)
            .then(res=>res.json())
            .then(response=>{
                const keys = Object.keys(response); //recupera tutte le chiavi dell'oggetto restituito
                if(keys.includes('error')) {
                    navigate('*'); //se c'è un errore reindirizza alla pagina 404
                }
                else{setBook(response.data);}
            })
            .catch(err=>{console.log(err);})
    },[url]);

    const [reviews, setReviews] = useState([]);
    const url_getreviews= `http://localhost:3001/review/${id}`;  //id of the book
    useEffect(()=>{
      fetch(url_getreviews)
        .then(res=>res.json())
        .then(response=>{
          setReviews(response.data);
        })
        .catch(err=>{console.log(err)})
    });

    return(
      <>
          <h1>Book id: {id}</h1>
          {
          book? (
            <section className="book_details">
              <div className="container">
                <div className="row">
                  <div className="col">
                    <div className="card border-0 rounded-4 shadow-lg">
                      <img className="card-img-top rounded-4" 
                          src={book.cover_image ? `http://localhost:3001/${book.cover_image}` : '/path/to/default/image.jpg'} 
                          alt={book.title || 'book cover'} />
                    </div>
                  </div>
                  <div className="col">
                    <h3>{book.title}</h3>
                    <h3>{book.author}</h3>
                    <div>
                      <p>
                        {book.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ) : (<div>Loading book details...</div>)
          }
          <section className='reviews'>
            <div className="container">
              {
                reviews[0]?
                  reviews.map((item,index)=><ReviewCard key={item.id} data={item}/> ) : (<div>No reviews found</div>)
              }
            </div>
          </section>
      </>
    );
}

