
import { authStore } from '~/stores/auth';

export default defineNuxtRouteMiddleware((to, from) => {
  const auth = authStore();
  const { protectedRoutes, unprotectedRoutes } = useAuthorization();
  const user = useCookie("user");

  if (user.value) {
    auth.getUser();
  }

  if (protectedRoutes[to.name] && !protectedRoutes[to.name].includes(auth.user.role)) {
      abortNavigation();
      return navigateTo("/unauthorized");
  }

  if (user.value && unprotectedRoutes.includes(to?.name)) {
    return navigateTo("/");
  }

  if (!user.value && !unprotectedRoutes.includes(to?.name)) {
    abortNavigation();
    return navigateTo("/login");
  }
});
