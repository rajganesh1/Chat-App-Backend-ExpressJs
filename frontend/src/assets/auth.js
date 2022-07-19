import Cookies from 'universal-cookie'


export const useAuth = () => {
    const cookie = new Cookies();
    return cookie.get('access_token') ? true: false
}