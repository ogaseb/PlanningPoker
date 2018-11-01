import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import GithubCircle from 'mdi-material-ui/GithubCircle'

import styled from 'styled-components'



const StyledIconButton = styled(IconButton)`
  && {
  position:absolute;
  right: 0
  }
`

const Header = () => {
  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Typography variant="title" color="inherit">
          Planning Poker
        </Typography>

        <StyledIconButton
          href="https://github.com/ProPanek/ScrumPoker"
          aria-haspopup="true"
          color="inherit"
        >
          <GithubCircle />
        </StyledIconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
