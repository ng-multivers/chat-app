import { Injectable, NgZone, inject, OnDestroy } from '@angular/core';
import { MessageSend, ReceivedMessage } from '@chat-app/domain';
import { fromEvent, Subject, BehaviorSubject } from 'rxjs';
import { NetworkService } from '../to-be-separated/network.service';
import { PageVisibilityService } from '../to-be-separated/page-visibility.service';
import { BroadcastChannelService, BroadcastMessage } from '../to-be-separated/broadcastChannel.service';
<<<<<<< HEAD
import { MessageService } from '../to-be-separated/message.service';
=======
>>>>>>> 84750c1 (feat(chat): add broadcast service)

/**
 * Enum-like object representing the different types of messages
 * that can be sent through the BroadcastChannel for chat synchronization.
 */
const BROADCAST_CHANNEL_TYPES = {
  /**
   * Type for requesting synchronization of messages.
   */
  REQUEST_SYNC: 'request_sync',

  /**
   * Type for sending the current queue of messages to be synchronized.
   */
  SYNC_QUEUE_DATA: 'sync_queue_data',

  /**
   * Type for notifying that a message has been sent.
   */
  NOTIFY_MESSAGE_SENT: 'notify_message_sent'
};

/**
 * The `ChatSync` class is responsible for managing the synchronization of chat messages
 * across different instances of the application. It uses a `BroadcastChannel` to communicate
 * between different tabs or windows and ensures that messages are synced when the application
 * goes online or becomes visible.
 */
@Injectable()
export class ChatSync implements OnDestroy {
  /**
   * Observable that emits when a message is sent.
   */
  readonly sendMessage$ = new Subject<MessageSend>();

  /**
   * Observable that emits the current queue of messages to be sent.
   */
  private readonly queueSubject = new BehaviorSubject<MessageSend[]>([]);
  readonly queue$ = this.queueSubject.asObservable();

  private messageSentSubject = new Subject<ReceivedMessage>();
  readonly messageSent$ = this.messageSentSubject.asObservable();

  private readonly networkService = inject(NetworkService);
  private readonly pageVisibilityService = inject(PageVisibilityService);
  private readonly broadcastChannelService = inject(BroadcastChannelService);
<<<<<<< HEAD
  private readonly messageService = inject(MessageService);
=======
>>>>>>> 84750c1 (feat(chat): add broadcast service)

  constructor() {
    this.networkService.getOnlineStatus().subscribe((isOnline) => {
      if (isOnline) {
        this.syncMessages();
      }
    });

    this.broadcastChannelService.onMessage().subscribe((message: BroadcastMessage) => this.handleBroadcastMessage(message));
    this.pageVisibilityService.onPageVisible().subscribe(() => this.onPageVisible());

<<<<<<< HEAD
    this.messageService.onMessageSend().subscribe(message => {
      this.handleMessageSend(message);
    });

    this.messageService.onMessageReceived().subscribe(message => {
      this.handleMessageReceived(message);
    });
  }

  // /**
  //  * Adds a message to the queue and broadcasts the updated queue.
  //  * @param message The message to be added to the queue.
  //  */
  // addMessage(message: MessageSend) {
  //   const updatedQueue = [...this.queueSubject.value, message];
  //   this.queueSubject.next(updatedQueue);
  //   this.broadcastSyncData();
  // }

=======
  /**
   * Adds a message to the queue and broadcasts the updated queue.
   * @param message The message to be added to the queue.
   */
  addMessage(message: MessageSend) {
    const updatedQueue = [...this.queueSubject.value, message];
    this.queueSubject.next(updatedQueue);
    this.broadcastSyncData();
  }

>>>>>>> 84750c1 (feat(chat): add broadcast service)
  /**
   * Removes a message from the queue and broadcasts the updated queue.
   * @param message The message to be removed from the queue.
   */
  removeMessage(message: ReceivedMessage) {
    const updatedQueue = this.queueSubject.value.filter((msg: any) => msg.localMessageId !== message.localMessageId);
    this.queueSubject.next(updatedQueue);
    this.broadcastSyncData();
  }

  /**
   * Handles a message that has been sent by removing it from the queue and notifying observers.
   * @param message The message that has been sent.
   */
  private handleMessageSent(message: ReceivedMessage) {
    this.removeMessage(message);
    this.messageSentSubject.next(message);
  }

  /**
   * Requests synchronization of messages when the page becomes visible.
   */
  private onPageVisible() {
    console.log('Page is now visible');
    this.requestSync();
  }

  /**
  //  * Receives and updates the queue of messages to be sent.
  //  * @param receivedQueue The received queue of messages.
  //  */
  // private receiveSyncData(receivedQueue: MessageSend[]) {
  //   this.queueSubject.next(receivedQueue);
  // }

  /**
   * Synchronizes messages by sending all messages in the queue.
   */
  // private syncMessages() {
  //   if (this.networkService.isOnline()) {
  //     const currentQueue = this.queueSubject.value;
  //     while (currentQueue.length > 0) {
  //       const message = currentQueue.pop();
  //       if (message) {
  //         console.log('Sending', message.localMessageId);
  //         // this.sendMessage(message);
  //         //   this.sendMessage$.next(message);
  //       }
  //     }
  //     this.queueSubject.next(currentQueue);
  //     this.broadcastSyncData();
  //   }
  // }

  private handleBroadcastMessage(message: BroadcastMessage) {
    console.log('Received broadcast message', message.type);
    switch (message.type) {
      case BROADCAST_CHANNEL_TYPES.REQUEST_SYNC:
        this.broadcastSyncData();
        break;
      case BROADCAST_CHANNEL_TYPES.SYNC_QUEUE_DATA:
        this.receiveSyncData(message.payload);
        break;
      case BROADCAST_CHANNEL_TYPES.NOTIFY_MESSAGE_SENT:
        this.handleMessageSent(message.payload);
        break;
    }
  }

<<<<<<< HEAD
  private broadcastSyncData() {
    this.messageService.getQueue().subscribe(queue => {
      this.broadcastChannelService.postMessage({
        type: BROADCAST_CHANNEL_TYPES.SYNC_QUEUE_DATA,
        payload: queue
      });
=======
  private handleBroadcastMessage(message: BroadcastMessage) {
    console.log('Received broadcast message', message.type);
    switch (message.type) {
      case BROADCAST_CHANNEL_TYPES.REQUEST_SYNC:
        this.broadcastSyncData();
        break;
      case BROADCAST_CHANNEL_TYPES.SYNC_QUEUE_DATA:
        this.receiveSyncData(message.payload);
        break;
      case BROADCAST_CHANNEL_TYPES.NOTIFY_MESSAGE_SENT:
        this.handleMessageSent(message.payload);
        break;
    }
  }

  private broadcastSyncData() {
    this.broadcastChannelService.postMessage({
      type: BROADCAST_CHANNEL_TYPES.SYNC_QUEUE_DATA,
      payload: this.queueSubject.value
>>>>>>> 84750c1 (feat(chat): add broadcast service)
    });
  }

  public requestSync() {
    this.broadcastChannelService.postMessage({
      type: BROADCAST_CHANNEL_TYPES.REQUEST_SYNC,
      payload: null
    });
  }

<<<<<<< HEAD
  // public notifyMessageSent(message: ReceivedMessage) {
  //   this.broadcastChannelService.postMessage({
  //     type: BROADCAST_CHANNEL_TYPES.NOTIFY_MESSAGE_SENT,
  //     payload: message
  //   });
  //   this.handleMessageSent(message);
  // }

  ngOnDestroy() {
    this.broadcastChannelService.close();
  }

  public addMessage(message: MessageSend) {
    this.messageService.addToQueue(message);
    this.broadcastSyncData();
  }

  public notifyMessageSent(message: ReceivedMessage) {
    this.messageService.handleReceivedMessage(message);
=======
  public notifyMessageSent(message: ReceivedMessage) {
>>>>>>> 84750c1 (feat(chat): add broadcast service)
    this.broadcastChannelService.postMessage({
      type: BROADCAST_CHANNEL_TYPES.NOTIFY_MESSAGE_SENT,
      payload: message
    });
<<<<<<< HEAD
  }

  private handleMessageSend(message: MessageSend) {
    console.log('Sending', message.localMessageId);
    // Here you would implement the actual sending of the message
    // For example, sending it to a server via an API call
  }

  private handleMessageReceived(message: ReceivedMessage) {
    console.log('Received', message.localMessageId);
    // Here you can implement any logic needed when a message is successfully received
  }

  private syncMessages() {
    if (this.networkService.isOnline()) {
      this.messageService.syncQueue();
    } else {
      console.log('Cannot sync messages: Offline');
    }
  }

  private receiveSyncData(receivedQueue: MessageSend[]) {
    // Update the local queue with the received queue
    this.messageService.getQueue().subscribe(currentQueue => {
      const mergedQueue = [...currentQueue, ...receivedQueue];
      const uniqueQueue = Array.from(new Set(mergedQueue.map(m => m.localMessageId)))
        .map(id => mergedQueue.find(m => m.localMessageId === id))
        .filter(m => !!m);
      if (uniqueQueue) {
        this.queueSubject.next(uniqueQueue);
      }
    });
=======
    this.handleMessageSent(message);
>>>>>>> 84750c1 (feat(chat): add broadcast service)
  }
}
