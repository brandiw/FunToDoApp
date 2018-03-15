import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';

export class ToDoList extends React.Component<RouteComponentProps<{}>, ToDoState> {
    constructor() {
        super();
        this.state = {
            items: [],
            message: '',
            newItem: '',
            newDueDate: new Date().toISOString().substring(0, 10),
            newDetail: '',
            loading: true
        };

        // Get data from API
        fetch('api/FakeDB/Items')
            .then(response => response.json() as Promise<Item[]>)
            .then(data => {
                this.setState({ items: data, loading: false });
            });
    }

    clear = () => {
        fetch('api/FakeDB/DeleteAll')
            .then(response => response.json() as Promise<Item[]>)
            .then(data => {
                this.setState({ items: [], loading: false });
            });
    }

    add = (options: any) => {
        fetch('api/FakeDB/Add', {
            method: 'post',
            body: JSON.stringify(options),
            headers: {
              'content-type': 'application/json'
            }
        }).then(response => {
            return response.json();
        }).then(data => {
            this.setState({
                items: data,
                newItem: '',
                message: '',
                newDetail: '',
                newDueDate: new Date().toISOString().substring(0, 10)
            });
        });
    }

    addItem = (e: any) => {
        e.preventDefault();
        if(this.state.newItem == '' || this.state.newDueDate == ''){
            this.setState({
                message: 'Please enter a description and a due date'
            });
        }
        else {
            // Correct timezone issue
            let due = new Date(this.state.newDueDate);
            due.setMinutes(due.getMinutes() + due.getTimezoneOffset());

            // Set up item object to send to our API
            let options = {
                dueDate: due,
                description: this.state.newItem,
                parent: -1,
                detail: this.state.newDetail
            }

            this.add(options);
        }
    }

    addSubItem = (parent: number, newItem: string, newDueDate: string, newDetail: string) => {
        // Correct timezone issue
        let due = new Date(newDueDate);
        due.setMinutes(due.getMinutes() + due.getTimezoneOffset());

        // Set up item object to send to our API
        let options = {
            dueDate: due,
            description: newItem,
            parent: parent,
            detail: newDetail
        }

        this.add(options);
    }

    markDone = (item: Item) => {
        fetch('api/FakeDB/MarkDone', {
            method: 'post',
            body: JSON.stringify({id: item.id}),
            headers: {
              'content-type': 'application/json'
            }
        }).then(response => {
            return response.json();
        }).then(data => {
            this.setState({ items: data });
        });
    }

    deleteItem = (item: Item) => {
        fetch('api/FakeDB/Delete', {
            method: 'post',
            body: JSON.stringify({id: item.id}),
            headers: {
              'content-type': 'application/json'
            }
        }).then(response => {
            return response.json();
        }).then(data => {
            this.setState({ items: data });
        });
    }

    // Data/form state handlers
    dueDateChange = (e: any) => { this.setState({ newDueDate: e.target.value, message: '' }); }
    newItemChange = (e: any) => { this.setState({ newItem: e.target.value, message: '' }); }
    detailChange = (e: any) => { this.setState({ newDetail: e.target.value, message: '' }); }

    public render() {
        {/* Build existing list of to-do items */}
        const itemsList = this.state.items.map(item => {
            item.dueDate = new Date(item.dueDate);
            return <ToDoListItem key={item.id} item={item} markDone={this.markDone} deleteItem={this.deleteItem} addSubItem={this.addSubItem} indent={0} />;
        });
        const loadText = <h2>Loading...</h2>

        return <div>
            {this.state.loading ? loadText : ""}
            <div className="row">
                <div className="col-xs-10 col-xs-offset-1">
                    <h1>To-Do List</h1>
                    <h2>What do you need to do today?</h2>

                    <p className="text-danger">{ this.state.message }</p>
                    {/* Form to add new top-level item */}
                    <form onSubmit={ (e) => { this.addItem(e) } }>
                        <div className="form-group">
                            <label>Task Description</label>
                            <input type="text" className="form-control" placeholder="What are you doing?" onChange={this.newItemChange} value={this.state.newItem}  />
                        </div>
                        <div className="form-group">
                            <label>Due Date:</label>
                            <input type="date" className="form-control" onChange={this.dueDateChange} value={this.state.newDueDate} />
                        </div>
                        <div className="form-group">
                            <label>Details (Optional):</label>
                            <textarea className="form-control" onChange={this.detailChange} value={this.state.newDetail} />
                        </div>
                        <input type="submit" className="hidden" />
                    </form>

                    {/* Buttons to add to or clear the list */}
                    <button onClick={ (e) => { this.addItem(e) } } className="btn btn-primary">Add Item</button>
                    <button onClick={ () => { this.clear() } } className="btn btn-danger">Clear</button>
                </div>
            </div>
            <hr />
            <div className="row">
                <div className="col-xs-10 col-xs-offset-1">
                    {/* Display my items list */}
                    <h2>My List</h2>
                    { itemsList }
                </div>
            </div>
        </div>;
    }
}

class ToDoListItem extends React.Component<ListItemProps, ListItemState> {
    constructor() {
        super();
        this.state = {
            showChildren: false,
            showForm: false,
            message: '',
            newItem: '',
            newDueDate: new Date().toISOString().substring(0, 10),
            newDetail: ''
        };
    }

    // Helper method checking dates
    addDays = (date: Date, numberOfDays: number) => {
        date.setDate(date.getDate() + numberOfDays);
        return date;
    }

    // Create item and wipe/clear form
    addSubItem = (e: any) => {
        e.preventDefault();
        this.props.addSubItem(this.props.item.id, this.state.newItem, this.state.newDueDate, this.state.newDetail);
        this.setState({ showForm: false,
            showChildren: true,
            newItem: '',
            message: '',
            newDetail: '',
            newDueDate: new Date().toISOString().substring(0, 10)
        });
    }

    // Functions that call parent
    markDone = () => { this.props.markDone(this.props.item); }
    deleteItem = () => { this.props.deleteItem(this.props.item); }

    // Display Toggles
    toggleChildren = () => { this.setState({ showChildren: !this.state.showChildren }); }
    toggleForm = () => { this.setState({ showForm: !this.state.showForm }); }

    // Data state handlers
    dueDateChange = (e: any) => { this.setState({ newDueDate: e.target.value, message: '' }); }
    newItemChange = (e: any) => { this.setState({ newItem: e.target.value, message: '' }); }
    detailChange = (e: any) => { this.setState({ newDetail: e.target.value, message: '' }); }

    public render(){
        {/* If it is marked done, add a strikethrough */}
        let classes = 'alert';

        {/* Highlight depending on the due date (past, soon, or other) */}
        let now = new Date();
        now.setHours(0, 0, 0, 0);
        let note = '';

        if(this.props.item.dueDate < now){
            classes += ' alert-info';
            note = '(Past Due)'
        }
        else if(this.props.item.dueDate <= this.addDays(now, 1)){
            classes += ' alert-warning';
            note = '(DUE SOON!)';
        }
        else {
            classes += ' alert-success';
        }

        let displayExpansion = <span />
        if(this.state.showChildren){
            displayExpansion = <span>
                            Less
                            <span className="glyphicon glyphicon-arrow-up text-success" aria-hidden="true"></span>
                        </span>
        }
        else {
            displayExpansion = <span>
                            More
                            <span className="glyphicon glyphicon-arrow-down text-success" aria-hidden="true"></span>
                        </span>
        }

        let indent = this.props.indent + 1;

        const children: any = this.props.item.children.map(child => {
            child.dueDate = new Date(child.dueDate);
            return <ToDoListItem item={child} key={child.id} markDone={this.props.markDone} deleteItem={this.props.deleteItem} addSubItem={this.props.addSubItem} indent={indent} />
        });

        return <div className={classes}>
            <div className="row">
                <div className="col-xs-8">
                    <span className={this.props.item.isDone ? 'strike' : ''}>
                        {note} {this.props.item.description}
                        <h6>Due: {this.props.item.dueDate.toDateString()}</h6>
                    </span>
                </div>
                <div className="col-xs-4 text-right">
                    <span className={this.props.item.isDone ? 'hidden' : ''}>
                        <span onClick={this.toggleForm} className={this.props.indent < 2 ? "" : "hidden"}>
                            <span className={this.state.showForm ? "glyphicon glyphicon-minus text-primary" : "glyphicon glyphicon-plus text-primary"} aria-hidden="true"></span>
                        </span>
                        <span onClick={this.markDone}>
                            <span className="glyphicon glyphicon-ok text-success" aria-hidden="true"></span>
                        </span>
                    </span>
                    <span onClick={this.deleteItem}>
                        <span className="glyphicon glyphicon-remove text-danger" aria-hidden="true"></span>
                    </span>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-8">
                    <em className={this.props.item.isDone ? 'strike' : ''}>{this.props.item.detail}</em>
                </div>
                <div className="col-xs-4">
                    <span className={this.props.item.children.length > 0 ? "" : "hidden"}>
                        <span className="pull-right pointer" onClick={this.toggleChildren}>
                            {displayExpansion}
                        </span>
                    </span>
                </div>
            </div>
            <div className={this.state.showForm ? "row top-space" : "row hidden"}>
                <div className="col-xs-12">
                    <h4>Add a Sub-Task</h4>
                    <form onSubmit={this.addSubItem}>
                        <div className="form-group">
                            <label>Task Description</label>
                            <input type="text" className="form-control" placeholder="What are you doing?" onChange={this.newItemChange} value={this.state.newItem}  />
                        </div>
                        <div className="form-group">
                            <label>Due Date:</label>
                            <input type="date" className="form-control" onChange={this.dueDateChange} value={this.state.newDueDate} />
                        </div>
                        <div className="form-group">
                            <label>Details (Optional):</label>
                            <textarea className="form-control" onChange={this.detailChange} value={this.state.newDetail} />
                        </div>
                        <input type="submit" className="btn btn-primary" />
                    </form>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-12 top-space">
                    {this.state.showChildren ? children : ''}
                </div>
            </div>
        </div>;
    }
}

/* Class, state, and Proptype definitions */
class Item {
    id: number;
    description: string;
    parent: number;
    children: Item[];
    isDone: boolean;
    dueDate: Date;
    detail: string;
}

interface ToDoState {
    items: Item[];
    message: string;
    newItem: string;
    newDetail: string;
    newDueDate: string;
    loading: boolean;
}

interface ListItemProps {
    item: Item;
    markDone: Function;
    deleteItem: Function;
    addSubItem: Function;
    indent: number;
}

interface ListItemState {
    showChildren: boolean;
    showForm: boolean;
    message: string;
    newItem: string;
    newDetail: string;
    newDueDate: string;
}
