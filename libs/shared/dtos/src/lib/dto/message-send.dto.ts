import { MessageStatus } from '../types-make-separate-lib/shared-types';

export type SendMessageRequestDto = {
  conversationId: string,
  userId: string,
  content: string,
  timestamp: string;

  localMessageId: string;

}


// export interface MessageSend {
//   conversationId: string;
//   userId: string;
//   content: string;
//   timestamp: string;
//
//   missing
//   localMessageId: string;
//   status: MessageStatus;
// }

