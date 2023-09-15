import { Routes as RoutesComponent, Route } from 'react-router-dom'

import { Dashboard } from './pages/dashboard/Dashboard'
import { Login } from './pages/login/Login'

const Routes = () => {
    return (
        <RoutesComponent>
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Dashboard />} />
        </RoutesComponent>
    )
}

export default Routes