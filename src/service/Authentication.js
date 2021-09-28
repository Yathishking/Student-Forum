const isAuthenticated = () => {
    if(sessionStorage.getItem('isAuthenticated') === 'true'){
            return true;
    }else{
        return false;
    }

}
const authenticate = (id) => {
    sessionStorage.setItem('isAuthenticated', 'true');
    sessionStorage.setItem('uid', id);
}

const logout = () => {
    sessionStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('uid');
    window.location.assign('/')
    return true;
}

export {isAuthenticated, logout, authenticate};