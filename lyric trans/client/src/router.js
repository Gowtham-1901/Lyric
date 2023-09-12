import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Admin from "./pages/admin";
import App from './App';

const Routing = ()=> {
    return(
        <div>
            <BrowserRouter>
            <Routes>
                <Route path='/' element={<App/>}/>
                <Route path='/admin_page' element={<Admin/>}/>
            </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Routing;