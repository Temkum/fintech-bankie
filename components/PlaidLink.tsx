import React, { useCallback, useEffect, useState } from 'react';
import { Button } from './ui/button';
import {
  PlaidLinkOnSuccess,
  PlaidLinkOptions,
  usePlaidLink,
} from 'react-plaid-link';
import { useRouter } from 'next/navigation';
import {
  createLinkToken,
  exchangePublicToken,
} from '@/lib/actions/user.actions';
import Image from 'next/image';

const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
  const [token, setToken] = useState('');
  const router = useRouter();

  useEffect(() => {
    const getLinkToken = async () => {
      const data = await createLinkToken(user); //TODO: create link token
      setToken(data?.linkToken);
    };

    getLinkToken();
  }, [user]);

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token: string) => {
      await exchangePublicToken({ publicToken: public_token, user }); //server action

      router.push('/');
    },
    [user]
  );

  const config: PlaidLinkOptions = {
    token,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);

  return (
    <>
      {variant === 'primary' ? (
        <Button
          className="plaidlink-primary"
          onClick={() => open()}
          disabled={!ready}
        >
          Connect bank
        </Button>
      ) : variant === 'ghost' ? (
        <Button
          className="plaidlink-ghost"
          onClick={() => open()}
          variant={'ghost'}
        >
          <Image
            src="/icons/connect-bank.svg"
            width={24}
            height={24}
            alt="connect bank"
          />
          <p className="text-[14px] font-semibold text-black-2 xl:block">
            Connect bank
          </p>
        </Button>
      ) : (
        <Button className="plaidlink-default" onClick={() => open()}>
          <Image
            src="/icons/connect-bank.svg"
            width={24}
            height={24}
            alt="connect bank"
          />
          <p className="text-[14px] font-semibold text-black-2">Connect bank</p>
        </Button>
      )}
    </>
  );
};

export default PlaidLink;
