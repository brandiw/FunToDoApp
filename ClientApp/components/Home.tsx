import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export class Home extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return <div>
            <h1>Hello, iTrellis!</h1>
            <p>Thank you for the opportunity to be considered among your senior developers!</p>

            <h4>Helpful Links</h4>
            <ul>
                <li>
                    <a href="https://docs.google.com/document/d/1lNcbTW_PHZMvXjMHKA2uEF5kOqLjKnS167ehnDcKEF8/edit?usp=sharing">Resume</a>
                </li>
                <li>
                    <a href="mailto:brandimichelle.0911@gmail.com">Email</a>
                </li>
                <li>
                    <a href="https://www.linkedin.com/in/brandimbutler/">LinkedIn</a>
                </li>
                <li>
                    <a href="https://github.com/brandiw">Github</a>
                </li>
            </ul>
            <p>Please feel free to contact me with any questions!</p>
        </div>;
    }
}
