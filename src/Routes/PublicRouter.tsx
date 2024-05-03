import { Header } from '../components/Header';
import { Outlet } from 'react-router-dom';

const PublicRouter = () => {
  return (
        <>
            <Header/>
            <Outlet/>
        </>
    )
}

export default PublicRouter;