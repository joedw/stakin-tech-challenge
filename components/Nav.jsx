import { useState, useEffect } from 'react';

import { NavLink } from '.';
import { userService,delegationService } from 'services';

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
    function editProfile(id){
        userService.editprofile(id);
       // /users/edit/1
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
                <NavLink href="/delegation" className="nav-item nav-link">Accounts</NavLink>
                <div className="nav-item dropdown">
                <a href="#" data-toggle="dropdown" className="nav-item nav-link dropdown-toggle user-action"><img src="/avatar.png" className="avatar" alt="Avatar" /> 
                {userService.userValue?.firstName + ' ' + userService.userValue?.lastName}<b className="caret"></b>
                </a>
                <div className="dropdown-menu">
					<a href={"/users/edit/" + user.id} className="dropdown-item"><i className="fa fa-user-o"></i> Profile</a>
                <div className="divider dropdown-divider"></div>
					<a onClick={logout} href="#" className="dropdown-item"><i className="material-icons">&#xE8AC;</i> Logout</a>
                </div>
                </div>
            
            </div>
        </nav>
    );
}