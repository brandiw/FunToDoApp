import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';

class Item {
    id: number;
    description: string;
    parent: number;
    children: Item[];
    isDone: boolean;
    dueDate: Date;
}

interface ToDoState {
    items: Item[];
    message: string;
    newItem: string;
    newDueDate: string;
    loading: boolean;
}

export class ToDoList extends React.Component<RouteComponentProps<{}>, ToDoState> {
    constructor() {
        super();
        this.state = {
            items: [],
            message: '',
            newItem: '',
            newDueDate: new Date().toISOString().substring(0, 10),
            loading: true
        };

        fetch('api/FakeDB/Items')
            .then(response => response.json() as Promise<Item[]>)
            .then(data => {
                console.log('data', data);
                this.setState({ items: data, loading: false });
            });
    }

    clear = () => {
        this.setState({ items: [] });
    }

    addItem = (e: any) => {
        e.preventDefault();
        if(this.state.newItem == '' || this.state.newDueDate == ''){
            this.setState({
                message: 'Please enter a description and a due date'
            });
        }
        else {
            // Correct timezone bug
            let due = new Date(this.state.newDueDate);
            due.setMinutes(due.getMinutes() + due.getTimezoneOffset());

            // Set up item object to send to our API
            let options = {
                dueDate: due,
                description: this.state.newItem,
                parent: -1
            }

            fetch('api/FakeDB/Add', {
                method: 'post',
                body: JSON.stringify(options),
                headers: {
                  'content-type': 'application/json'
                }
            }).then(response => {
                return response.json();
            }).then(data => {
                let items = this.state.items;
                items.push(data);

                this.setState({
                    items: items,
                    newItem: '',
                    message: ''
                });
            });
        }
    }

    markDone = (item: Item) => {
        let updatedItems = this.state.items;

        for(var i = 0; i < updatedItems.length; i++){
            if(updatedItems[i].id == item.id){
                updatedItems[i].isDone = true;
                for(var j = 0; j < updatedItems[i].children.length; j++){
                    updatedItems[i].children[j].isDone = true;
                    for(var k = 0; k < updatedItems[i].children[j].children.length; k++){
                        updatedItems[i].children[j].children[k].isDone = true;
                    }
                }
            }
        }
        this.setState({ items: updatedItems });
    }

    areAllChildrenDone = (item: Item) => {
        console.log('checking if children all done');
    }

    dueDateChange = (e: any) => {
        this.setState({ newDueDate: e.target.value, message: '' });
    }

    newItemChange = (e: any) => {
        this.setState({ newItem: e.target.value, message: '' });
    }

    public render() {
        {/* Build existing list of to-do items */}
        const itemsList = this.state.items.map(item => {
            item.dueDate = new Date(item.dueDate);
            return <ToDoListItem key={item.description} item={item} markDone={this.markDone} />;
        });
        const loadText = <h2>Loading...</h2>

        return <div>
            {this.state.loading ? loadText : ""}
            <div className="row">
                <div className="col-xs-10 col-xs-offset-1">
                    <h1>To-Do List</h1>
                    <h2>What do you need to do today?</h2>

                    <p className="text-danger">{ this.state.message }</p>
                    {/* Form to add new item */}
                    <form onSubmit={ (e) => { this.addItem(e) } }>
                        <div className="form-group">
                            <label>Task Description</label>
                            <input type="text" className="form-control" placeholder="What are you doing?" onChange={this.newItemChange} value={this.state.newItem}  />
                        </div>
                        <div className="form-group">
                            <label>Due Date:</label>
                            <input type="date" className="form-control" onChange={this.dueDateChange} value={this.state.newDueDate} />
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
                    <h2>My List</h2>
                    { itemsList }
                </div>
            </div>
        </div>;
    }
}

interface ListItemProps {
    item: Item;
    markDone: Function;
}

class ToDoListItem extends React.Component<ListItemProps> {
    addDays = (date: Date, numberOfDays: number) => {
        date.setDate(date.getDate() + numberOfDays);
        return date;
    }

    addSubItem = () => {
        console.log('show form');
    }

    markDone = () => {
        this.props.markDone(this.props.item);
    }

    deleteItem = () => {
        console.log('del item');
    }

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
                        <span onClick={this.addSubItem}>
                            <span className="glyphicon glyphicon-plus text-primary" aria-hidden="true"></span>
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
        </div>;
    }
}
