//components/BookCard/BookCard.jsx
import { useContext } from "react";
import { FormContext } from "../../context/FormProvider";

export default function BookCard({data}){
    return(
        <div className="col">
          <div className="card">
            <h2>{data.title}</h2>
            <h3>{data.author}</h3>
            <h3>{data.genre}</h3>
          </div>
        </div>
    );
}