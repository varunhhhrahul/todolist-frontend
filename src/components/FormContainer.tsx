import React, { Fragment, ReactChild } from 'react';
import { Grid, Container, Paper, makeStyles } from '@material-ui/core';
import formContainerStyles from '../assets/jss/FormContainer';

const useStyles = makeStyles(formContainerStyles);

interface FormContainerProps {
  children: React.ReactNode;
  color?: string;
}

export const FormContainer: React.FC<FormContainerProps> = ({
  children,
  color,
}) => {
  const classes = useStyles();

  return (
    <div style={{ marginTop: 80 }}>
      <Container>
        <Grid container direction='row' justify='center' alignItems='center'>
          <Grid item md={6} className={classes.grid}>
            <Fragment>
              <Container maxWidth='sm'>
                <Paper
                  style={{ backgroundColor: color ? color : 'white' }}
                  className={classes.paper}
                  elevation={3}
                >
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
