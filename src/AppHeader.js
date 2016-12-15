import React from 'react';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle,} from 'material-ui/Toolbar';
import {blue500} from 'material-ui/styles/colors'

const AppHeader = () => <Toolbar style={{
  backgroundColor: blue500,
  color: "#FFFFFF"
}}>
  <ToolbarGroup>
    <ToolbarTitle style={{color: '#FFFFFF'}} text="trollo" />
  </ToolbarGroup>
</Toolbar>

export default AppHeader;
