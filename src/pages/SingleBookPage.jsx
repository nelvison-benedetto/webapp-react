//pages/SingleBookPage.jsx
import { useParams , useNavigate} from "react-router-dom"; //useParams x get params from url, useNavigate x 
import { useEffect, useState , useContext} from "react";
import { FormContext } from "../context/FormProvider";
import ReviewCard from "../components/ReviewCard";
import ReviewFormCard from "../components/ReviewFormCard";
import Loader from "../components/Loader";

export default function SingleBookPage(){
    const navigate = useNavigate();
    const {id} = useParams();   //get the id when you insert in url ...book/2 get 2
    const [book, setBook] = useState(null);
    const [reviews, setReviews] = useState([]);
    const {loading, setLoading, fetchData} = useContext(FormContext);

    function debugBook(){console.log(book);}

    const handleDeleteBook = () => {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this book?"
      );
      if (!confirmDelete) return;
      setLoading(true);
      fetch(`http://localhost:3001/books/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.message) {
            alert("Book deleted successfully.");
            fetchData(); // 🔄 forza il refresh dei dati nel context
            navigate("/"); // ⬅️ poi torna alla HomePage
          } else {
            alert("Error deleting book.");
          }
        })
        .catch((err) => {
          console.error(err);
          alert("An error occurred while deleting the book.");
        })
        .finally(() => {
          setLoading(false);
        });
    };

    //FETCH SINGLE BOOK
    const url = `http://localhost:3001/books/${id}`;
    useEffect(()=>{
        setLoading(true);
        fetch(url)
            .then(res=>res.json())
            .then(response=>{
                const keys = Object.keys(response); //recupera tutte le chiavi dell'oggetto restituito
                if(keys.includes('error')) {
                    navigate('*'); //se c'è un errore reindirizza alla pagina 404
                }
                else{
                  setBook(response.data);
                }
            })
            .catch(err=>{console.log(err);})
            .finally(() => {
              setLoading(false);
          });
    },[url]);  //x security

    //FETCH BOOK REVIEWS
    const url_getreviews= `http://localhost:3001/reviews/${id}`;  //id of the book
    const fetchReviews= ()=>{
      setLoading(true);
      fetch(url_getreviews)
        .then(res=>res.json())
        .then(response=>{
          setReviews(response.data);
        })
        .catch(err=>{console.log(err)})
        .finally(() => {
          setLoading(false);
      });
    }
    useEffect(()=>{
      fetchReviews();
    },[id]);

    return (
      <>
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="container mt-5">

              {/* <button type='button' onClick={debugBook}>Check Debug Books</button> */}

              {book ? (
                <div className="row align-items-start g-4">
                  
                  {book.cover_image && (
                    <div className="col-md-4">
                      <div className="card shadow border-0 rounded-4">
                        <img
                          src={
                            book.cover_image
                              ? `http://localhost:3001/${book.cover_image}`
                              : "/default_cover.jpg"
                          }
                          className="img-fluid rounded-4"
                          alt={book.title}
                        />
                      </div>
                    </div>
                  )}

                  <div className={`${book.cover_image ? "col-md-8" : "col-md-12"}  `}>
                    
                    <div className="d-flex justify-content-between align-items-center">
                      <h1 className="display-5 fw-bold">{book.title}</h1>
                      <button className="btn btn-danger" onClick={handleDeleteBook}>Delete Book</button>
                    </div>

                    <h4 className="text-muted mb-3">by {book.author}</h4>
                    <p className="lead">{book.description}</p>
                    <p className="text-secondary">
                      <strong>Genre:</strong> {book.genre || "N/A"}
                      <br />
                      <strong>Published:</strong> {book.publication_year}
                    </p>
                  </div>
                </div>
              ) : (
                <div>Loading book details...</div>
              )}

              <hr className="my-5" />

              <section className="mb-5">
                {/* <h3 className="mb-4">Add a Review</h3> */}
                <ReviewFormCard book_id={id} onSuccess={fetchReviews} />
              </section>

              <section className="mb-5">
                <h3 className="mb-4">User Reviews</h3>
                <div className="row g-4">
                  {reviews.length > 0 ? (
                    reviews.map((item) => (
                      <ReviewCard key={item.id} data={item} />
                    ))
                  ) : (
                    <div className="text-muted">
                      No reviews yet for this book.
                    </div>
                  )}
                </div>
              </section>
            </div>
          </>
        )}
      </>
    );
}

