import React from 'react';
import {
    Story,
    Meta
} from '@storybook/react';
import { LandingPageBlock,
LandingPageBlockProps } from '.';
import { AccountTree } from '@material-ui/icons';

export default {
    title: 'Components/Blocks/LandingPageBlock',
    component: LandingPageBlock,
    argTypes: {
        onBlockClick: {
            description: 'Called when Clicked',
            name: 'onBlockClickListener',
        },
    }
} as Meta;

const Template: Story<LandingPageBlockProps> = (args) => <LandingPageBlock {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    blockIcon: <AccountTree />,
    blockTitle: 'Account Management',
};