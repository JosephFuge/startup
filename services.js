function logout() {
    fetch(`/api/auth/logout`, {
    method: 'delete',
    });
}