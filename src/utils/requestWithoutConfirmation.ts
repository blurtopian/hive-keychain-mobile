import {Account} from 'actions/interfaces';
import {broadcastWithoutConfirmation} from 'components/browser/requestOperations/Broadcast';
import {decodeWithoutConfirmation} from 'components/browser/requestOperations/Decode';
import {signBufferWithoutConfirmation} from 'components/browser/requestOperations/SignBuffer';
import {
  KeychainRequest,
  KeychainRequestTypes,
  RequestBroadcast,
  RequestDecode,
  RequestError,
  RequestId,
  RequestSignBuffer,
  RequestSuccess,
} from './keychain.types';

export const requestWithoutConfirmation = (
  accounts: Account[],
  request: KeychainRequest,
  sendResponse: (msg: RequestSuccess) => void,
  sendError: (msg: RequestError) => void,
) => {
  switch (request.type) {
    case KeychainRequestTypes.decode:
      request as RequestDecode & RequestId;
      decodeWithoutConfirmation(accounts, request, sendResponse, sendError);
      break;
    case KeychainRequestTypes.signBuffer:
      request as RequestSignBuffer & RequestId;
      signBufferWithoutConfirmation(accounts, request, sendResponse, sendError);
      break;
    case KeychainRequestTypes.broadcast:
      request as RequestBroadcast & RequestId;
      broadcastWithoutConfirmation(accounts, request, sendResponse, sendError);
      break;
  }
};
