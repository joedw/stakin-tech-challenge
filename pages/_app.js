import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import 'styles/globals.css';

import { userService } from 'services';
import { Nav, Alert } from 'components';

export default App;

function App({ Component, pageProps }) {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        // on initial load - run auth check 
        authCheck(router.asPath);

        // on route change start - hide page content by setting authorized to false  
        const hideContent = () => setAuthorized(false);
        router.events.on('routeChangeStart', hideContent);

        // on route change complete - run auth check 
        router.events.on('routeChangeComplete', authCheck)

        // unsubscribe from events in useEffect return function
        return () => {
            router.events.off('routeChangeStart', hideContent);
            router.events.off('routeChangeComplete', authCheck);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function authCheck(url) {
        // redirect to login page if accessing a private page and not logged in 
        setUser(userService.userValue);
        const publicPaths = ['/account/login', '/account/register'];
        const path = url.split('?')[0];
        if (!userService.userValue && !publicPaths.includes(path)) {
            setAuthorized(false);
            router.push({
                pathname: '/account/login',
                query: { returnUrl: router.asPath }
            });
        } else {
            setAuthorized(true);
        }
    }

    return (
        <>
            <Head>
                <title>Stakin Delegation Management</title>
                
                {/* eslint-disable-next-line @next/next/no-css-tags */}
                {/* <link href="//netdna.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet" /> */}
                <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto|Varela+Round"></link>
                <link href="//stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" rel="stylesheet" /> 
                <link rel="stylesheet" href="//fonts.googleapis.com/icon?family=Material+Icons"></link>
                <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
                <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
<                script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
                
            </Head>

            <div className={`app-container ${user ? 'bg-light' : ''}`}>
                <Nav />
                <Alert />
                {authorized &&
                    <Component {...pageProps} />
                }
            </div>

         
        </>
    );
}
