import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService)
  if (!authService.isAuthenticated()) {
    return true;
  } else {
    return false;
  }
};
