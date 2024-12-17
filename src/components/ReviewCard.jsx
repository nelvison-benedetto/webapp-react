//components/ReviewCard.jsx

export default function ReviewCard({data}){
    return(
        <>
          <div className="col">
            <div className="card">
              <h3>{data.name}</h3>
              <h4><strong>{data.rating}</strong></h4>
              <h4>{data.review}</h4>
            </div>
          </div>
        </>
    );
}