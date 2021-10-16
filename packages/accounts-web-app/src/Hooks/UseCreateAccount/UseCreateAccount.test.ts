import React from 'react';
import {
  renderHook,
  RenderHookResult,
  act,
} from '@testing-library/react-hooks';
import {
  Account,
  CreateAccountRequest,
  CreateAccountResponse,
} from '@mgl/shared-components';
import {
  useCreateAccount,
  UseCreateAccountState,
} from './UseCreateAccount';
import { CreateAccountApiFn } from '../../Clients';

interface UseCreateAccountProps {
  createAccountApiFn: CreateAccountApiFn;
}

describe('UseCreateAccount', () => {
  const mockCreateAccountFn = jest.fn();

  afterEach(() => {
    mockCreateAccountFn.mockClear();
  });

  const setupHook = (props: UseCreateAccountProps): RenderHookResult<UseCreateAccountProps, UseCreateAccountState> => renderHook<UseCreateAccountProps, UseCreateAccountState>((hookProps) => useCreateAccount(hookProps.createAccountApiFn), {
    initialProps: {
      ...props,
    },
  });

  it('Should do nothing upon initial load', () => {
    const {
      result,
    } = setupHook({ createAccountApiFn: mockCreateAccountFn });

    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.errorMessage).toBeUndefined();
    expect(result.current.isAccountCreated).toBeFalsy();
    expect(result.current.requestCreateAccount).not.toBeUndefined();
  });

  it('Should create the Account', async () => {
    const expectedAccount: Account = {
      discriminator: 'AnAccount',
    } as any;

    const props: UseCreateAccountProps = {
      createAccountApiFn: mockCreateAccountFn,
    };

    const response: CreateAccountResponse = {
      accountId: 'SomeSome',
      message: undefined,
      success: true,
    };
    mockCreateAccountFn.mockResolvedValueOnce(response);

    const {
      result,
      waitForNextUpdate,
    } = setupHook(props);
    expect(result.current.isLoading).toBeFalsy();
    expect(mockCreateAccountFn).not.toHaveBeenCalled();

    act(() => {
      result.current.requestCreateAccount(expectedAccount);
    });
    expect(result.current.isLoading).toBeTruthy();

    await waitForNextUpdate();

    const expectedRequest: CreateAccountRequest = {
      account: expectedAccount,
      requestingUser: 'TEST_USER',
    };

    expect(mockCreateAccountFn).toHaveBeenCalledWith(expectedRequest);
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.isAccountCreated).toBeTruthy();
    expect(result.current.errorMessage).toBeUndefined();
  });

  it('Should handle errors gracefully', async () => {
    const expectedAccount: Account = {
      discriminator: 'SomeSome',
    } as any;
    const expectedRequest: CreateAccountRequest = {
      account: expectedAccount,
      requestingUser: 'TEST_USER',
    };

    const expectedMessage = 'SomeErrorMessage';
    const error = new Error(expectedMessage);
    mockCreateAccountFn.mockRejectedValueOnce(error);

    const props: UseCreateAccountProps = {
      createAccountApiFn: mockCreateAccountFn,
    };

    const {
      result,
      waitForNextUpdate,
    } = setupHook(props);
    expect(result.current.isLoading).toBeFalsy();

    act(() => {
      result.current.requestCreateAccount(expectedAccount);
    });
    await waitForNextUpdate();

    expect(mockCreateAccountFn).toHaveBeenCalledWith(expectedRequest);
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.errorMessage).toEqual(expectedMessage);
    expect(result.current.isAccountCreated).toBeFalsy();
  });
});
