//pages/layout.jsx
import { Outlet } from "react-router-dom";
import AppHeader from '../components/AppHeader'
import AppFooter from '../components/AppFooter'

export default function Layout(){
    return (
      <>
        <div className="layout-wrapper d-flex flex-column min-vh-100">
          <AppHeader />
          <main className="flex-grow-1">
            <Outlet /> {/* Qui viene caricata la pagina corrente */}
          </main>
          <AppFooter />
        </div>
      </>
    );
}