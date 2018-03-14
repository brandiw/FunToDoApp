import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { ToDoList } from './components/ToDoList';
import { Vacation } from './components/Vacation';

export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/vacation' component={ Vacation } />
    <Route path='/todo' component={ ToDoList } />
</Layout>;
