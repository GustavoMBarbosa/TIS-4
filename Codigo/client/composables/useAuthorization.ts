export const useAuthorization = () => {
  const protectedRoutes = {
    agenda: ['admin', 'secretary'],
    diseases: ['admin'],
    generate: ['admin'],
    medications: ['admin'],
    pacients: ['admin', 'secretary'],
    'pacient-id': ['admin'],
    receipts: ['admin', 'accountant'],
    users: ['admin'],
  };

	const unprotectedRoutes = ['login', 'register', 'recovery-password', 'recovery-password-id'];

	const roles = {
		admin: 'Administrador',
		secretary: 'Secretário',
		accountant: 'Contador',
		basic: 'Sem Permissão',
	};

	return { protectedRoutes, unprotectedRoutes, roles };
};
