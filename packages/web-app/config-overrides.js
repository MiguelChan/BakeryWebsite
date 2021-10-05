const path = require('path');
const {
  alias,
} = require('react-app-rewire-alias');

const aliasMap = {
  react: path.resolve('./node_modules/react'),
  'react-router-dom': path.resolve('./node_modules/react-router-dom'),
  'react-router': path.resolve('./node_modules/react-router'),
  '@reduxjs/toolkit': path.resolve('./node_modules/@reduxjs/toolkit'),
  'react-redux': path.resolve('./node_modules/react-redux'),
  '@emotion/react': path.resolve('./node_modules/@emotion/react'),
  '@emotion/styled': path.resolve('./node_modules/@emotion/styled'),
  '@mui/icons-material': path.resolve('./node_modules/@mui/icons-material'),
  '@mui/material': path.resolve('./node_modules/@mui/material'),
  '@mui/styles': path.resolve('./node_modules/@mui/styles'),
};

module.exports = alias(aliasMap);