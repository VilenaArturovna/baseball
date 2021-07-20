import React from 'react';
import './App.css';
import {Header} from "./components/Header";
import {Profile} from "./components/Profile/Profile";
import {ApolloClient, ApolloProvider, createHttpLink, InMemoryCache} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {Provider} from "react-redux";
import {store} from "./redux/store";
import {Authentication} from "./components/Auth/Authentication";
import {headers} from "./api/getDataAPI";
import {Route, NavLink} from "react-router-dom";

const httpLink = createHttpLink({
    uri: 'https://baseballcloud-back.herokuapp.com/api/v1/graphql',
});

const authLink = setContext((_, {}) => {
    return {
        headers: headers
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});


function App() {
    return (
        <Provider store={store}>
            <ApolloProvider client={client}>
                <Header/>
                <Route exact path={'/'} render={()=> <Profile />} />
                <Route path={'auth'} render={() => <Authentication/>} />

            </ApolloProvider>
        </Provider>
    );
}

export default App;
