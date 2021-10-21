import React from 'react';
import {
  renderHook,
  RenderHookResult,
  act,
} from '@testing-library/react-hooks';
import {
  Account,
  PutAccountRequest,
  PutAccountResponse,
} from '@mgl/shared-components';
import { PutAccountApiFn } from '../../Clients';
import {
  useEditAccount,
  UseEditAccountState,
} from './UseEditAccount';

describe('UseEditAccount', () => {
  const mockPutFn = jest.fn();

  afterEach(() => {
    mockPutFn.mockClear();
  });

  interface HookProps {
    putAccountApiFn: PutAccountApiFn;
  }

  const setupHook = (props: HookProps): RenderHookResult<HookProps, UseEditAccountState> => renderHook<HookProps, UseEditAccountState>((props) => useEditAccount(props.putAccountApiFn), {
    initialProps: {
      putAccountApiFn: props.putAccountApiFn,
    },
  });

  it('Should initially have an state', () => {
    const props: HookProps = {
      putAccountApiFn: mockPutFn,
    };

    const {
      result,
    } = setupHook(props);

    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.isAccountEdited).toBeFalsy();
    expect(result.current.errorMessage).toBeUndefined();
    expect(result.current.submitEditAccount).not.toBeNull();
  });

  it('Should call the API when requested', async () => {
    const props: HookProps = {
      putAccountApiFn: mockPutFn,
    };

    const expectedAccount: Account = {
      disc: 'account',
      subAccounts: [],
    } as any;

    const expectedRequest: PutAccountRequest = {
      updatedAccount: expectedAccount,
      updatingUser: expect.any(String),
    };

    const expectedResponse: PutAccountResponse = {
      success: true,
    } as any;

    mockPutFn.mockResolvedValueOnce(expectedResponse);

    const {
      result,
      waitForNextUpdate,
    } = setupHook(props);
    expect(result.current.isLoading).toBeFalsy();

    act(() => {
      result.current.submitEditAccount(expectedAccount);
    });
    expect(result.current.isLoading).toBeTruthy();

    await waitForNextUpdate();

    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.isAccountEdited).toBeTruthy();
    expect(result.current.errorMessage).toBeUndefined();
    expect(mockPutFn).toHaveBeenCalledWith(expectedRequest);
  });

  it('Should handle errors gracefully', async () => {
    const props: HookProps = {
      putAccountApiFn: mockPutFn,
    };

    const expectedAccount: Account = {
      disc: 'account',
      subAccounts: [],
    } as any;

    const expectedRequest: PutAccountRequest = {
      updatedAccount: expectedAccount,
      updatingUser: expect.any(String),
    };

    const expectedErrorMessage = 'An Error Message';
    const error = new Error(expectedErrorMessage);

    mockPutFn.mockRejectedValueOnce(error);

    const {
      result,
      waitForNextUpdate,
    } = setupHook(props);
    expect(result.current.isLoading).toBeFalsy();

    act(() => {
      result.current.submitEditAccount(expectedAccount);
    });
    expect(result.current.isLoading).toBeTruthy();

    await waitForNextUpdate();

    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.isAccountEdited).toBeFalsy();
    expect(result.current.errorMessage).toEqual(expectedErrorMessage);
    expect(mockPutFn).toHaveBeenCalledWith(expectedRequest);
  });
});
