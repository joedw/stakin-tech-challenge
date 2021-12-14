import { useState, useEffect } from 'react';

import { NavLink } from '.';
import { userService } from 'services';

export { Nav };

function Nav() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const subscription = userService.user.subscribe(x => setUser(x));
        return () => subscription.unsubscribe();
    }, []);

    function logout() {
        userService.logout();
    }

    // only show nav when logged in
    if (!user) return null;
    
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="navbar-nav">
             <img  src="/stakinglogo.small.png" alt="Stakin " className=" logo img-fluid"
          alt="Stakin Logo" />
            </div>
            <div className="navbar-nav ml-auto">
                <NavLink href="/" exact className="nav-item nav-link">Home</NavLink>
                <NavLink href="/users" className="nav-item nav-link">Users</NavLink>
                <a onClick={logout} className="nav-item nav-link">Logout</a>
                <div className="nav-item dropdown">
                <a href="#" data-toggle="dropdown" className="nav-item nav-link dropdown-toggle user-action"><img src="avatar.png" className="avatar" alt="Avatar" /> 
                {userService.userValue?.firstName + ' ' + userService.userValue?.lastName}<b className="caret"></b>
                </a>
                <div className="nav-item dropdown">
                <div className="divider dropdown-divider"></div>
					<a href="#" className="dropdown-item"><i className="material-icons">&#xE8AC;</i> Logout</a>
                </div>
                </div>
            
            </div>
        </nav>
    );
}