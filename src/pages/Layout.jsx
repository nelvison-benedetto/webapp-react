//pages/layout.jsx
import { Outlet } from "react-router-dom";
import AppHeader from '../components/AppHeader'
import AppMain from '../components/AppMain'
import AppFooter from '../components/AppFooter'

export default function Layout(){
    return (
        <>
          <AppHeader/>
          <main id="">
            <Outlet/> {/*load the page here depending on the url*/}
          </main>
          <AppFooter/>
        </>
    );
}