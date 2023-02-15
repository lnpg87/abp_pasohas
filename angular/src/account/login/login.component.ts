import { Component, Injector } from '@angular/core';
import { AbpSessionService } from 'abp-ng2-module';
import { AppComponentBase } from '@shared/app-component-base';
import { accountModuleAnimation } from '@shared/animations/routerTransition';
import { AppAuthService } from '@shared/auth/app-auth.service';
import { LayoutService } from '@app/layout/service/app.layout.service';

@Component({
  templateUrl: './login.component.html',
  animations: [accountModuleAnimation()],
  styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent extends AppComponentBase {
  submitting = false;
  valCheck: string[] = ['remember'];
  password!: string;

  constructor(
    injector: Injector,
    public authService: AppAuthService,
    private _sessionService: AbpSessionService,
    public layoutService: LayoutService
  ) {
    super(injector);
  }

  get multiTenancySideIsTeanant(): boolean {
    return false;
  }

  get isSelfRegistrationAllowed(): boolean {
    if (!this._sessionService.tenantId) {
      return false;
    }

    return true;
  }

  login(): void {
    this.submitting = true;
    this.authService.authenticate(() => (this.submitting = false));
  }
}
