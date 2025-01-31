import { Component, ChangeDetectionStrategy, inject, HostListener, ElementRef } from '@angular/core';
import { NgClass } from '@angular/common';
import { AuthService } from '@chat-app/web/shared/util/auth';
import { ButtonComponent } from '@chat-app/ui-button';
import { Router } from '@angular/router';
import { routing } from '@chat-app/util-routing';
import { UiDropdownComponent } from '@chat-app/ui-dropdown';

@Component({
  selector: 'mg-account-widget',
  templateUrl: './account-widget.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass, ButtonComponent, UiDropdownComponent]
})
export class AccountWidgetComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  readonly user = this.authService.user;


  dropdownItems: any = [
    { type: 'button', text: 'Add Conversation' },
    { type: 'link', text: 'Account Settings', href: 'account' },
    { type: 'button', text: 'Change Account', href: 'auth' }
  ];

  async onItemClick($event: any): Promise<void> {
    if($event.text === 'Change Account') {
      await this.authService.logOut();
    }
  }
}
