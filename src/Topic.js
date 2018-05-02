import React from 'react';
import List, { ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Completed from './assets/Completed.svg';
import Incomplete from './assets/Incomplete.svg';
import Locked from './assets/Locked.svg';
import {withRouter} from 'react-router-dom';

class ToDoItem extends React.Component {


    state = {
        payload: [],
        taskGroups: {},
        match: '',
    }

     componentWillReceiveProps(){
         this.setState({
            payload: this.props.payload,
            taskGroups: this.props.taskGroups,
            match: this.props.match.params.taskName,
        })
        console.log(this.state);
        console.log(this.state.match)
        
    }

  
    
  
    handleClick = async (id) => {
        //console.log(id);
        let payload = this.state.payload;
        if (payload[id - 1].completedAt == null){
            payload[id - 1].completedAt = new Date();
            await this.setState({
                payload: payload,
            })
        }
        else{
            payload[id - 1].completedAt = null;
            await this.setState({
                payload: payload,
            })
        }
        this.props.callbackFromParent(this.state.payload);
    }

    getIcon =  (id) => {
        //console.log(id)
        if ( id.dependencyIds.length > 0){
            let lock = false;
            let array = id.dependencyIds;
            if (array !== undefined){
                array.forEach( (elem, index, array) => {
                    //console.log(elem)
                    if (elem in this.state.payload && this.state.payload[elem - 1].completedAt == null)
                        lock = true
                })
            }
            if (lock){
                return (
                    <img src={Locked} />
                )
            }
        }
        if ( id.completedAt == null){
            return(
                <img src={Incomplete} />
            )
        }
        return(
            <img src={Completed} />
        )
    }

    render() {
        const { match, location, history } = this.props
        return (
            <div>
                <List>
                
                    {(this.state.payload != null) ?
                        (
                            this.state.payload.map((i) => {
                                
                                if (this.state.taskGroups !== undefined){
                                const group = this.state.taskGroups[match.params.taskName];
                                if (group !== undefined  && group.includes(i.id))
                                    return(
                                        <ListItem key={i.id} button value={i.id} onClick={() => this.handleClick(i.id)}>
                                            <ListItemIcon >{
                                                (this.getIcon(i))
                                            }
                                            </ListItemIcon>
                                            <Typography variant="subheading">
                                            {
                                                (i.completedAt == null) ?
                                                    (i.task)
                                                    :
                                                    (<div style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}>
                                                        {i.task}
                                                    </div>
                                                    )
                                            }
                                                
                                            </Typography>
                                        
                                        </ListItem>
                                    )
                                }
                            })
                        ) :
                        (<div></div>)}
                </List>
            </div>
        );
    }
}

export default withRouter(ToDoItem);