const AlertStyles = (theme: any) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
});

export default AlertStyles;
