export default function AppFooter(){
    return(
        <footer className="bg-dark text-light py-3 mt-4">
          <div className="container">
            <span>&#169; {new Date().getFullYear()} - All Rights Reserved</span>
          </div>
        </footer>
    );
}