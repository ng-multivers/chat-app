import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonRemoveComponent, ButtonComponent } from '@chat-app/ui-button';
import { UiDropdownComponent } from '@chat-app/ui-dropdown';

@Component({
  selector: 'mg-conversation-details',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonRemoveComponent, UiDropdownComponent, ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col w-96 h-full bg-white border-l border-gray-200">
      <header class="flex items-center justify-between h-16 px-6 border-b border-gray-200">
        <h2 class="text-lg font-semibold text-gray-800">{{ conversationName }} Details</h2>
        <button (click)="closeDetails.emit()" class="text-gray-400 hover:text-gray-600 transition-colors duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </header>

      <div class="flex-1 overflow-y-auto">
        <div class="p-6 space-y-8">
          <!-- Conversation Settings -->
          <section>
            <h3 class="text-sm font-medium text-gray-500 uppercase mb-4">Settings</h3>
            <div class="space-y-6">
              <!-- Change Name -->
              <div>
                <label for="conversationName" class="block text-sm font-medium text-gray-700 mb-2">Conversation Name</label>
                <div class="flex items-center space-x-2">
                  <div class="flex-1 bg-gray-100 rounded-md px-4 py-2 focus-within:ring-2 focus-within:ring-primary-500">
                    <input
                      type="text"
                      id="conversationName"
                      [(ngModel)]="editedName"
                      class="w-full bg-transparent focus:outline-none text-gray-700"
                      placeholder="Enter conversation name..."
                      (keyup.enter)="updateConversationName()"
                    >
                  </div>
                  <button
                    (click)="updateConversationName()"
                    class="bg-primary-500 text-white rounded-md p-2 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Mute Notifications -->
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium text-gray-700">Mute Notifications</span>
                <button
                  (click)="toggleMute()"
                  class="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  [ngClass]="isMuted ? 'bg-primary-600' : 'bg-gray-200'"
                >
                  <span
                    class="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                    [ngClass]="isMuted ? 'translate-x-5' : 'translate-x-0'"
                  ></span>
                </button>
              </div>

              <!-- Theme Selector -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                <mg-ui-dropdown
                  [buttonText]="selectedTheme"
                  [items]="themeOptions"
                  (itemClick)="onThemeSelect($event)"
                ></mg-ui-dropdown>
              </div>
            </div>
          </section>

          <div class="border-t border-gray-200"></div>

          <!-- Actions -->
          <section>
            <h3 class="text-sm font-medium text-gray-500 uppercase mb-4">Actions</h3>
            <div class="space-y-6">
              <!-- Search -->
              <div>
                <label for="conversationSearch" class="block text-sm font-medium text-gray-700 mb-2">Search in Conversation</label>
                <div class="bg-gray-100 rounded-md px-4 py-2 focus-within:ring-2 focus-within:ring-primary-500">
                  <input
                    type="text"
                    id="conversationSearch"
                    [(ngModel)]="searchQuery"
                    class="w-full bg-transparent focus:outline-none text-gray-700"
                    placeholder="Type to search..."
                  >
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

<!--      <div class="border-t border-gray-200"></div>-->

      <!-- Remove Conversation -->
      <div class="p-6">
        <mg-button class="w-full" (click)="removeConversation()">
          Remove Conversation
        </mg-button>
      </div>
    </div>
  `
})
export class ConversationDetailsComponent {
  @Input() conversationName: string = 'Conversation';
  @Output() closeDetails = new EventEmitter<void>();

  editedName: string = '';
  isMuted: boolean = false;
  selectedTheme: string = 'System';
  searchQuery: string = '';

  themeOptions: Array<{ type: 'link' | 'button', text: string, href?: string }>  = [
    { type: 'button', text: 'Light' },
    { type: 'button', text: 'Dark' },
    { type: 'button', text: 'System' }
  ];

  ngOnInit() {
    this.editedName = this.conversationName;
  }

  updateConversationName() {
    // Implement logic to update conversation name
    console.log('Updating conversation name to:', this.editedName);
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    // Implement logic to mute/unmute notifications
    console.log('Mute status:', this.isMuted);
  }

  onThemeSelect(item: any) {
    this.selectedTheme = item.text;
    // Implement logic to change theme
    console.log('Selected theme:', this.selectedTheme);
  }

  removeConversation() {
    // Implement logic to remove conversation
    console.log('Removing conversation');
  }
}
