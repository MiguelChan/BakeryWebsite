import React from 'react';
import {
  renderHook,
  RenderHookResult,
} from '@testing-library/react-hooks';
import { GetAccountsResponse } from '@mgl/shared-components';
import {
  useGetAccounts,
  UseGetAccountsState,
} from './UseGetAccounts';
import { GetAccountsApiFn } from '../../Clients';

describe('UseGetAccounts', () => {
  interface UseGetAccountsProps {
    getAccountsApiFn: GetAccountsApiFn;
  }

  const setupHook = (props: UseGetAccountsProps): RenderHookResult<UseGetAccountsProps, UseGetAccountsState> => renderHook((props: UseGetAccountsProps) => {
    const {
      getAccountsApiFn,
    } = props;
    return useGetAccounts(getAccountsApiFn);
  }, {
    initialProps: {
      getAccountsApiFn: props.getAccountsApiFn,
    },
  });

  it('Should call the API Endpoint', async () => {
    const mockGetAccountsApiFn = jest.fn();

    const expectedResponse: GetAccountsResponse = {
      accounts: [],
    };
    mockGetAccountsApiFn.mockResolvedValueOnce(expectedResponse);

    const props: UseGetAccountsProps = {
      getAccountsApiFn: mockGetAccountsApiFn,
    };

    const {
      result,
      waitForNextUpdate,
    } = setupHook(props);
    await waitForNextUpdate();

    expect(result.current.accounts).toStrictEqual([]);
    expect(result.current.errorMessage).toBeUndefined();
  });

  it('Should hnadle errors gracefully', async () => {
    const mockGetAccountsApiFn = jest.fn();
    const expectedErrorMessage = 'Something went wrong';
    const error = new Error(expectedErrorMessage);

    mockGetAccountsApiFn.mockRejectedValueOnce(error);

    const props: UseGetAccountsProps = {
      getAccountsApiFn: mockGetAccountsApiFn,
    };

    const {
      result,
      waitForNextUpdate,
    } = setupHook(props);
    await waitForNextUpdate();

    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.errorMessage).toEqual(expectedErrorMessage);
  });
});
