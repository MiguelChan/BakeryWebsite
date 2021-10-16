import React from 'react';
import {
  Story,
  Meta,
} from '@storybook/react';
import {
  Typography,
} from '@mui/material';
import {
  SimpleAppTemplate,
  SimpleAppTemplateProps,
} from './SimpleAppTemplate';

export default {
  title: 'Components/Templates/SimpleAppTemplate',
  component: SimpleAppTemplate,
} as Meta;

const Template: Story<SimpleAppTemplateProps> = (args) => <SimpleAppTemplate {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  renderBody: (props: any) => (
    <Typography>I'm the body of this template!</Typography>
  ),
};
