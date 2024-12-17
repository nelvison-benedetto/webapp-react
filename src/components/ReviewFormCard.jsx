//components/ReviewFormCard.jsx
import React, { useState, useEffect } from "react";
import { useParams , useNavigate} from "react-router-dom"; //useParams x get params from url, useNavigate x 

export default function ReviewFormCard({book_id, onSuccess}){

    const REACT_HOST = import.meta.env.VITE_REACT_HOST;
    const REACT_PORT = import.meta.env.VITE_REACT_PORT;
    const url_base = `${REACT_HOST}:${REACT_PORT}`;
    const url= `${url_base}/review`;
    const initialFormData = {  //the key names (i.e. "title") must be exactly the same in the html (i.e. <...name="title">) to link!
        name: '',
        rating: '',
        review: '',
    };
    const [formData, setFormData] = useState(initialFormData);
    function handleFormField(e){
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
          }));
    }
    function handleFormReview(e){
        e.preventDefault();
        const dataToSubmit = {
            book_id : book_id,
            ...formData,
        };
        console.log(dataToSubmit);
        fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(dataToSubmit)
        })
            .then(res => res.json())
            .then(data => {
              console.log("Review added successfully:", data);
              if (onSuccess) onSuccess(); // Aggiorna la lista delle recensioni
              setFormData(initialFormData); // Resetta i campi del form
            })
            .catch(err => console.error('The Error:', err));
    }

    return (
        <>
          <section>
            <form onSubmit={handleFormReview}>
              <div className="form-group">
                <label className='' htmlFor="formName">Name</label>
                <input className='form-control' type="text" id="formName" name="name" placeholder='Name' required value={formData.name} onChange={handleFormField}/> {/* required value= */}
              </div>
              <div className="form-group">
                <label className='' htmlFor="formRating">Rating</label>
                <input className='form-control' type="number" id="formRating" name="rating" placeholder='Rating' required min="1" max="5" value={formData.rating} onChange={handleFormField}/> {/* required value= */}
              </div>
              <div className='form-group'>
                <label htmlFor="formReview">Review</label>
                <textarea className='form-control' type="text" rows='5' id='formReview' name='review' placeholder='Review' value={formData.review} onChange={handleFormField}/>  {/*required value= */}
              </div>
              <button className="btn btn-primary" type='submit'>Submit Review</button>
            </form>
          </section>
        </>
    );
}

