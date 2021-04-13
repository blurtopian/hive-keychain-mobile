import React, {useState} from 'react';
import {getValidAuthorityAccounts} from 'utils/keychain';
import RequestUsername from 'components/browser/requestOperations/components/RequestUsername';
import {getRequiredWifType} from 'utils/keychain';

export default (request, accounts) => {
  const {username} = request;
  const method = getRequiredWifType(request);
  let initAcc;
  if (username) {
    initAcc = username;
  } else {
    accounts = getValidAuthorityAccounts(accounts, method.toLowerCase());
    initAcc = accounts[0].name;
  }
  const [account, setAccount] = useState(initAcc);

  const getAccountKey = () => {
    return accounts.find((a) => a.name === account).keys[method.toLowerCase()];
  };

  const getAccountMemoKey = () => {
    return accounts.find((a) => a.name === account).keys.memo;
  };

  const getAccountPublicKey = () => {
    return accounts.find((a) => a.name === account).keys[
      `${method.toLowerCase()}Pubkey`
    ];
  };
  const getUsername = () => account;
  return {
    getUsername,
    getAccountKey,
    getAccountPublicKey,
    getAccountMemoKey,
    RequestUsername: () => (
      <RequestUsername
        username={username}
        accounts={accounts}
        account={account}
        setAccount={setAccount}
      />
    ),
  };
};
