import { ErrorHandler, inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AppErrorHandler implements ErrorHandler {
  private readonly router = inject(Router);

  handleError(error: unknown): void {
    console.error('Unhandled application error:', error);

    // Prevent endless redirect loop if the error originates on /error itself.
    if (this.router.url.startsWith('/error')) {
      return;
    }

    void this.router.navigate(['/error'], {
      queryParams: {
        returnUrl: this.router.url || '/'
      }
    });
  }
}
