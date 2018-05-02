import React from 'react';
import List, { ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Completed from './assets/Completed.svg';
import Incomplete from './assets/Incomplete.svg';
import Locked from './assets/Locked.svg';

class ToDoItem extends React.Component {
    state={
        payload: [],
        taskGroups: {},
        match: {},
    }

    async componentWillReceiveProps(){
        await this.setState({
            payload: this.props.payload,
            taskGroups: this.props.taskGroups,
            match: this.props.match,
        })
        console.log(this.state);
        
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
    }

    getIcon =  (id) => {
        console.log(id)
        if ( id.dependencyIds.length > 0){
            let lock = false;
            let array = id.dependencyIds;
            if (array !== undefined){
                array.forEach( (elem, index, array) => {
                    console.log(elem)
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
        const { payload, taskGroups } = this.state;
        return (
            <div>
                <List>
                {console.log(this.state)}
                    {(this.props != null) ?
                        (
                            this.state.payload.map((i) => {
                                
                                if (this.state.taskGroups !== undefined){
                                let group = this.state.taskGroups[this.state.match.params.taskName];
                                if (group !== undefined  && group.includes(i.id))
                                    return(
                                        <ListItem key={i.id} button value={i.id} onClick={() => this.handleClick(i.id)}>
                                            <ListItemIcon >{
                                                (this.getIcon(i))
                                            }
                                            </ListItemIcon>
                                            <Typography variant="subheading">
                                                {i.task}
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

export default ToDoItem;