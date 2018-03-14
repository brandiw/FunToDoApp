import * as React from 'react';
import { RouteComponentProps } from 'react-router';

class Item {
    main: string;
    subs: string[];
    isDone: boolean;
}

interface ToDoState {
    items: string[];
    message: string;
    newItem: string;
}

class ToDoList extends React.Component<RouteComponentProps<{}>, ToDoState> {
    constructor() {
        super();
        this.state = {
            items: [],
            message: '',
            newItem: ''
        };
    }

    clear = () => {
        this.setState({ items: [] });
    }

    addItem = () => {
        this.setState({
            items: ['TBD: The thing']
        });
    }

    addSubTask = () => {
        console.log('TO DO');
    }

    newItemChange = (e: any) => {
        this.setState({ newItem: e.target.value, message: '' });
    }

    subTaskChange = (e: any) => {
        console.log('add to sub task array');
        console.log('display that subtask in preview');
        console.log('wipe sub-task field');
    }

    public render() {
        {/* Build existing list of to-do items */}
        const itemsList = this.state.items.map(item => {
            return <ToDoListItem li={item} />;
        });

        return <div>
            <div className="row">
                <div className="col-xs-6">
                    <h1>To-Do List</h1>
                    <h2>What do you need to do today?</h2>

                    <p className="text-danger">{ this.state.message }</p>
                    {/* Form to add new item */}
                    <form onSubmit={this.addItem}>
                        <div className="form-group">
                            <label>Task Description</label>
                            <input type="text" className="form-control" placeholder="What are you doing?" onChange={this.newItemChange} value={this.state.newItem}  />
                        </div>
                    </form>
                    <form>
                        <div className="form-group">
                            <label>Sub Task:</label>
                            <input type="text" className="form-control" placeholder="A step in the process" onChange={this.subTaskChange}  />
                        </div>
                        <input type="submit" value="Submit Sub-Task" className="btn btn-primary" onClick={this.addSubTask} />
                    </form>

                    {/* Buttons to add to or clear the list */}
                    <button onClick={ () => { this.addItem() } }>Submit Item</button>
                    <button onClick={ () => { this.clear() } }>Clear</button>
                </div>
                <div className="col-xs-6">
                    <div>Preview Container</div>
                </div>
            </div>
            <hr />
            <h2>My List</h2>
            { itemsList }
        </div>;
    }
}

class ToDoListItem extends React.Component {
    public render(){
        const classes = 'well ' + (true ? 'strike' : '');
        return <div className={classes}>{this.props.item}</div>;
    }
}

export default ToDoList;
