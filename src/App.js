import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List from 'material-ui/List';
import { MenuItem } from 'material-ui/Menu';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';

import Topic from './Topic';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const GroupSvg = require('./Group.svg');


const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  appFrame: {
    height: 1080,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    position: 'absolute',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'appBarShift-left': {
    marginLeft: drawerWidth,
  },
  'appBarShift-right': {
    marginRight: drawerWidth,
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  'content-left': {
    marginLeft: -drawerWidth,
  },
  'content-right': {
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'contentShift-left': {
    marginLeft: 0,
  },
  'contentShift-right': {
    marginRight: 0,
  },
});

class PersistentDrawer extends React.Component {
  state = {
    open: true,
    anchor: 'left',
    taskGroups: {},
    payload: [
        {
          id: 1,
          group: "Purchases",
          task: "Go to the bank",
          dependencyIds: [],
          completedAt: null,
        },
        {
          id: 2,
          group: "Purchases",
          task: "Buy hammer",
          dependencyIds: [1],
          completedAt: null,
        },
        {
          id: 3,
          group: "Purchases",
          task: "Buy wood",
          dependencyIds: [1],
          completedAt: null,
        },
        {
          id: 4,
          group: "Purchases",
          task: "Buy nails",
          dependencyIds: [1],
          completedAt: null,
        },
        {
          id: 5,
          group: "Purchases",
          task: "Buy paint",
          dependencyIds: [1],
          completedAt: null,
        },
        {
          id: 6,
          group: "Build Airplane",
          task: "Hammer nails into wood",
          dependencyIds: [2, 3, 4],
          completedAt: null,
        },
        {
          id: 7,
          group: "Build Airplane",
          task: "Paint wings",
          dependencyIds: [5, 6],
          completedAt: null,
        },
        {
          id: 8,
          group: "Build Airplane",
          task: "Have a snack",
          dependencyIds: [11],
          completedAt: null,
        }
      ],
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };



  handleChangeAnchor = event => {
    this.setState({
      anchor: event.target.value,
    });
  };

  async createTaskGroups(){
      let payload = this.state.payload;
      let taskGroups = {};
      payload.map((i) =>{
          let key = i.group;
          if( !(key in taskGroups)){
            
            taskGroups[key] = [i.id];
          }
          else{
            taskGroups[key].push(i.id);
          }
      });
      //console.log(taskGroups)
       await this.setState({
          taskGroups: taskGroups
    });
    console.log(Object.keys(this.state.taskGroups));
  }

  componentDidMount(){  
      this.createTaskGroups();
  }

  render() {
    const { classes, theme } = this.props;
    const { anchor, open, taskGroups } = this.state;

   

    let before = null;
    let after = null;

    

    return (
      <Router>
      <span>
      <div className={classes.root}>
        
        <div className={classes.appFrame}>
          <AppBar
            className={classNames(classes.appBar, {
              [classes.appBarShift]: open,
              [classes[`appBarShift-${anchor}`]]: open,
            })}
          >
            <Toolbar disableGutters={!open}>
              
              <Typography variant="title" color="inherit" noWrap>
                Wonderschool task list
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
        variant="persistent"
        anchor={anchor}
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        
        <Divider />
        <List>
        <div>
          <ListItem button>
              
              <Typography variant="title">
                  Things To Do
              </Typography>
          </ListItem>
        <Divider />
    
      {/*loop here for list of groups*/}
      {Object.keys(this.state.taskGroups).map((task, count) =>{
        return(
          <Link id={task} to={`/${task}`} >
            <ListItem button>
              <ListItemIcon>
                <img src={GroupSvg} />
              </ListItemIcon>
              <Typography variant="subheading">
                {task}
                <br/>
                <Typography variant="caption">
                {this.state.taskGroups[task]}
                </Typography>
              </Typography>
            
            </ListItem>
          </Link>
        )
      })}
   
        
          
      </div>
      </List>
      <Divider />
      
      </Drawer>
          <main
            className={classNames(classes.content, classes[`content-${anchor}`], {
              [classes.contentShift]: open,
              [classes[`contentShift-${anchor}`]]: open,
            })}
          >
            <div className={classes.drawerHeader} />
            <Typography>
              <Route path='/:taskName' render={(props) => <Topic {...props} payload={this.state.payload} taskGroups={this.state.taskGroups}/>} />
            </Typography>
          
     
      </main>
          
        </div>
      </div>
      </span>
      </Router>
    );
  }
}

PersistentDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};


export default withStyles(styles, { withTheme: true })(PersistentDrawer);