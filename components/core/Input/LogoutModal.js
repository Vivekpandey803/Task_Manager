
import React from 'react'

import { icons } from '@/env/icons'

const LogoutModel = ({ closeModel, isAdminLogout = false }) => {

    return (
        <div className='confirmation-prompt'>
            <img src={icons.Icon37} alt='logout' />
            <h1>You are leaving...</h1>
            <h2>Are you sure you want to log out?</h2>
            <div>
                <button onClick={closeModel}>Cancel</button>
                <button onClick={() => logoutHandler(isAdminLogout)} className='confirm'>Yes, Logout</button>
            </div>
        </div>
    )
}

export default LogoutModel