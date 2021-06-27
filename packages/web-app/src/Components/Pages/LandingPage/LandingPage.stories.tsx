import React from 'react';
import {
    Story,
    Meta,
} from '@storybook/react';
import { LandingPage } from '.';

export default {
    title: 'Components/Pages/LandingPage',
    component: LandingPage,
} as Meta;

const Template: Story = () => <LandingPage />;

export const Default = Template.bind({});