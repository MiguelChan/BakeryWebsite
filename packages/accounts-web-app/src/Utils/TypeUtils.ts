import {
  Account,
  SubAccount,
} from '@mgl/shared-components';
import React from 'react';

export type OnButtonClickedListener = () => void;
export type RenderProp<T> = (props: T) => React.ReactElement;
export type OnSubAccountUpdatedListener = (subAccount: SubAccount) => void;
export type requestCreateAccount = (account: Account) => void;
