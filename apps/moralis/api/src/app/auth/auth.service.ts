import {
  AuthenticateRequest,
  AuthenticateResponse,
  RequestMessageRequest,
  RequestMessageResponse,
  SupabaseUser,
  VerifyMessageRequest,
  VerifyMessageResponse,
} from '@dehub/shared/model';
import {
  createUser,
  getUserAddress,
  getUserByProfileId,
} from '@dehub/shared/utils';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import Moralis from 'moralis';
import { env } from '../../config';
import { supabase } from '../services';

export const requestMessage = async ({
  address,
  chain,
  networkType,
}: RequestMessageRequest): Promise<RequestMessageResponse> => {
  const url = new URL(env.SUPABASE_API_URL);
  const now = new Date();
  const signatureExpirationTime = new Date(now.getTime() + 900000);

  const result = await Moralis.Auth.requestMessage({
    address,
    chain,
    networkType,
    domain: url.hostname,
    statement: 'Please confirm your identity to login to DeHub.',
    uri: url.toString(),
    notBefore: now.toISOString(),
    expirationTime: signatureExpirationTime.toISOString(),
    timeout: 15,
  });

  const { message } = result.toJSON();

  return { message };
};

export const verifyMessage = async ({
  networkType,
  signature,
  message,
}: VerifyMessageRequest): Promise<VerifyMessageResponse> => {
  /** 1 day */
  const tokenExpirationTime = Date.now() + 1000 * 60 * 60 * 24 * 1;

  const result = await Moralis.Auth.verify({
    networkType,
    signature,
    message,
  });

  const authData = result.toJSON();

  // Find user by profile Id
  let { data: user } = await getUserByProfileId(supabase, authData.profileId);

  // Create user if not exists
  if (!user) {
    const { data: newUser } = await createUser(supabase, {
      moralis_provider_id: authData.profileId,
      metadata: authData,
    });
    user = newUser;
    console.info('User created:', getUserAddress(newUser));
  } else {
    console.info('User logged in:', getUserAddress(user));
  }

  // Create JWT token
  const token = jwt.sign(
    {
      user,
      aud: 'authenticated',
      role: 'authenticated',
      exp: tokenExpirationTime,
    },
    env.SUPABASE_JWT_SECRET
  );

  return { user, token };
};

export const auth = ({ token }: AuthenticateRequest): AuthenticateResponse => {
  let user: SupabaseUser | undefined = undefined;
  let error: string;
  let errorDetail: string;

  try {
    // Verify JWT token
    const { user: decodedUser, exp } = jwt.verify(
      token,
      env.SUPABASE_JWT_SECRET
    ) as {
      user: SupabaseUser;
      exp: number;
    };

    // Check expiration
    if (Date.now() > +exp) errorDetail = 'token has expired';
    else user = decodedUser;
  } catch (e) {
    if (e instanceof JsonWebTokenError) errorDetail = e.message;
  }

  if (errorDetail) error = `JWT verification failed (${errorDetail})!`;

  return { user, error };
};
