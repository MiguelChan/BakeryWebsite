import {
  Paper,
  useTheme,
} from '@mui/material';
import React from 'react';
import {
  AccountsAppContext,
  ApplicationContext,
} from '../../../Context';
import { RenderProp } from '../../../Utils';

export interface SimpleAppTemplateProps {
  renderBody: RenderProp<any>;
}

/**
 * Main Application Template.
 *
 * @param {RenderProp} renderBody The body to render.
 *
 * @returns The component.
 */
export const SimpleAppTemplate: React.FunctionComponent<SimpleAppTemplateProps> = ({
  renderBody,
  children,
  ...rest
}) => {
  const currentTheme = useTheme();

  return (
    <Paper
      elevation={3}
      sx={{
        padding: currentTheme.spacing(2),
      }}
    >
      {renderBody(rest)}
    </Paper>
  );
};
