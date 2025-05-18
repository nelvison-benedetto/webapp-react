//components/BookCard/BookCard.jsx
import { useContext } from "react";
import { FormContext } from "../../context/FormProvider";
import { Link } from "react-router-dom";

export default function BookCard({data}){
    return (
      <>
        <div className="col">
          <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden book-card">
            <Link
              to={`/books/${data.id}`}
              className="text-decoration-none text-dark"
            >
              {/* {data.cover_image && (
                <img
                  src={`http://localhost:3001/${data.cover_image}`}
                  className="card-img-top"
                  alt={data.title}
                  style={{ objectFit: "cover", height: "200px" }}
                />
              )} */}
              <div className="card-body">
                <h5 className="card-title fw-bold">{data.title}</h5>
                <p className="card-text mb-1">
                  <strong>Author:</strong> {data.author}
                </p>
                <p className="card-text">
                  <strong>Genre:</strong> {data.genre}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </>
    );
}