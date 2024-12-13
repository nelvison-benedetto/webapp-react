//components/AppHeader.jsx
import { useContext } from "react";
import { FormContext } from "../context/FormProvider";

export default function AppHeader(){
    return(
        <header>
          <div  className="container-fluid d-flex align-items-center justify-content-around">
            <h1>Books</h1>
          </div>
        </header>
    );
}