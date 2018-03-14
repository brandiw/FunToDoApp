import * as React from 'react';
import { RouteComponentProps } from 'react-router';

let counter = 1;

class Item {
    id: number;
    description: string;
    parent: Item;
    children: Item[];
    isDone: boolean;
    dueDate: Date;

    constructor(desc: string, due: Date){
        this.id = counter;
        counter += 1;
        this.description = desc;
        this.dueDate = due;
        this.parent = this;
        this.children = [];
        this.isDone = false;
    }
}

interface ToDoState {
    items: Item[];
    message: string;
    newItem: string;
    newDueDate: string;
}

export class ToDoList extends React.Component<RouteComponentProps<{}>, ToDoState> {
    constructor() {
        super();
        this.state = {
            items: [],
            message: '',
            newItem: '',
            newDueDate: ''
        };
    }

    clear = () => {
        this.setState({ items: [] });
    }

    addItem = () => {
        if(this.state.newItem == '' || this.state.newDueDate == ''){
            this.setState({
                message: 'Please enter a description and a due date'
            });
        }
        else {
            // Correct timezone bug
            let due = new Date(this.state.newDueDate);
            due.setMinutes(due.getMinutes() + due.getTimezoneOffset());

            let newItemObj = new Item(this.state.newItem, due);
            let items = this.state.items;
            items.push(newItemObj);

            this.setState({
                items: items,
                newItem: '',
                message: ''
            });
        }
    }

    markDone = (item: Item) => {
        console.log('mark done top');
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

    addSubTask = () => {
        console.log('TO DO');
    }

    checkAllChildrenDone = () => {
        console.log('checking children')
    }

    dueDateChange = (e: any) => {
        console.log(e.target.value);
        this.setState({ newDueDate: e.target.value, message: '' });
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
        console.log('rendering', this.state)
        {/* Build existing list of to-do items */}
        const itemsList = this.state.items.map(item => {
            return <ToDoListItem key={item.description} item={item} markDone={this.markDone} />;
        });

        return <div>
            <div className="row">
                <div className="col-xs-10 col-xs-offset-1">
                    <h1>To-Do List</h1>
                    <h2>What do you need to do today?</h2>

                    <p className="text-danger">{ this.state.message }</p>
                    {/* Form to add new item */}
                    <form onSubmit={this.addItem}>
                        <div className="form-group">
                            <label>Task Description</label>
                            <input type="text" className="form-control" placeholder="What are you doing?" onChange={this.newItemChange} value={this.state.newItem}  />
                        </div>
                        <div className="form-group">
                            <label>Due Date:</label>
                            <input type="date" className="form-control" defaultValue={new Date().toDateString()} onChange={this.dueDateChange} value={this.state.newDueDate} />
                        </div>
                    </form>

                    {/* Buttons to add to or clear the list */}
                    <button onClick={ () => { this.addItem() } }>Submit Item</button>
                    <button onClick={ () => { this.clear() } }>Clear</button>
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
        console.log(now, 'comparing to', this.props.item.dueDate)
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
