import React, { Fragment, ReactChild } from 'react';
import { Grid, Container, Paper, makeStyles } from '@material-ui/core';
import formContainerStyles from '../assets/jss/FormContainer';

const useStyles = makeStyles(formContainerStyles);

interface FormContainerProps {
  children: ReactChild;
}

export const FormContainer: React.FC<FormContainerProps> = ({ children }) => {
  const classes = useStyles();

  return (
    <div>
      <Container>
        <Grid container direction='row' justify='center' alignItems='center'>
          <Grid item md={6} className={classes.grid}>
            <Fragment>
              <Container maxWidth='sm'>
                <Paper className={classes.paper} elevation={3}>
                  {children}
                </Paper>
              </Container>
            </Fragment>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
