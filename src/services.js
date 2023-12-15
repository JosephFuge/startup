async function logout() {
    
    await fetch(`/api/auth/logout`, {
        method: 'delete',
    });
}

export { logout };