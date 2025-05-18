//components/ReviewCard.jsx

export default function ReviewCard({data}){
    return (
      <>
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-sm h-100 border-0 rounded-4 p-3" style={{backgroundColor: "#f8f9fa"}}>
            <div className="card-body">
              <h5 className="card-title text-primary">{data.name}</h5>
              <h6 className="card-subtitle mb-2 text-warning">
                ⭐ {data.rating} / 5
              </h6>
              <p className="card-text">{data.review}</p>
            </div>
          </div>
        </div>
      </>
    );
}