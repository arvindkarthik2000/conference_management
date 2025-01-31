
import { useRouter } from 'next/router';
import { parseCookies, destroyCookie } from 'nookies';



const logout = (ctx = null) => {

    const router = useRouter();
    const allCookies = parseCookies(ctx);
    Object.keys(allCookies).forEach((cookieName) => {
        destroyCookie(ctx, cookieName, { path: '/' });
    });
    

    const handleRedirect = () => {
        router.push('/'); // Redirect to '/new-page'
    };

    handleRedirect()
};

export default logout;