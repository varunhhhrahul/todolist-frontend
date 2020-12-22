import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Register } from './Register/Register';
import { Login } from './Login/Login';
import { FormContainer } from '../../components/FormContainer';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

const a11yProps = (index: any, width: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
    style: {
      backgroundColor: '#4EB189',
      // margin: 15,
      width: width,
    },
  };
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const MainForm = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const [width, setWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <FormContainer color='#24323B'>
      <AppBar position='sticky' elevation={0}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='simple tabs example'
          style={{ justifyContent: 'space-between' }}
        >
          <Tab
            label='Sign Up'
            {...a11yProps(0, width > 600 ? 220 : width / 2.5)}
          />
          <Tab
            label='Login'
            {...a11yProps(1, width > 600 ? 220 : width / 2.5)}
          />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Register />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Login />
      </TabPanel>
    </FormContainer>
  );
};

export default MainForm;
