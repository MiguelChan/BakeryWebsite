import React from 'react';
import {
  RenderHookResult,
  renderHook,
  act,
} from '@testing-library/react-hooks';
import { GetAccountResponse } from '@mgl/shared-components';
import {
  useGetAccount,
  UseGetAccountState,
} from './UseGetAccount';
import { GetAccountApiFn } from '../../Clients';

describe('UseGetAccount', () => {
  interface UseGetAccountProps {
    getAccountApiFn: GetAccountApiFn;
  }

  const setupHook = (props: UseGetAccountProps): RenderHookResult<UseGetAccountProps, UseGetAccountState> => renderHook<UseGetAccountProps, UseGetAccountState>((props) => useGetAccount(props.getAccountApiFn), {
    initialProps: {
      getAccountApiFn: props.getAccountApiFn,
    },
  });

  it('Should get the account', async () => {
    const expectedAccountId = 'AnAccountId';
    const expectedAccount = {
      disc: 'AnAccount',
    } as any;

    const expectedResponse: GetAccountResponse = {
      account: expectedAccount,
    };

    const mockGetAccountFn = jest.fn();
    mockGetAccountFn.mockResolvedValueOnce(expectedResponse);

    const {
      result,
      waitForNextUpdate,
    } = setupHook({
      getAccountApiFn: mockGetAccountFn,
    });
    expect(result.current.isLoading).toBeFalsy();

    act(() => {
      result.current.getAccount(expectedAccountId);
    });
    expect(result.current.isLoading).toBeTruthy();
    await waitForNextUpdate();

    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.account).toEqual(expectedAccount);
    expect(mockGetAccountFn).toHaveBeenCalledWith(expectedAccountId);
  });

  it('Should handle errors gracefully', async () => {
    const expectedAccountId = 'AnAccountId';
    const expectedMessage = 'Something went wrong';
    const error = new Error(expectedMessage);

    const mockGetAccountFn = jest.fn();
    mockGetAccountFn.mockRejectedValueOnce(error);

    const {
      result,
      waitForNextUpdate,
    } = setupHook({
      getAccountApiFn: mockGetAccountFn,
    });
    expect(result.current.isLoading).toBeFalsy();

    act(() => {
      result.current.getAccount(expectedAccountId);
    });
    expect(result.current.isLoading).toBeTruthy();
    await waitForNextUpdate();

    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.account).toBeNull();
    expect(result.current.errorMessage).toEqual(expectedMessage);
    expect(mockGetAccountFn).toHaveBeenCalledWith(expectedAccountId);
  });
});
