import React from 'react';
import './App.css';
import {Header} from "./components/Header";
import {Profile} from "./components/Profile/Profile";
import {ApolloClient, ApolloProvider, createHttpLink, InMemoryCache} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
    uri: 'https://baseballcloud-back.herokuapp.com/api/v1/graphql',
});

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    //const token = localStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    const token = "7KgKoJr5ZDaCMnbH_kcBtA"
    return {
        headers: {
            ...headers,
            "Access-Token": token ? token : "",
            "Uid": "test@example.com",
            "Client": "HF0ID4KStGboThT_pogIYA"
        }
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});



function App() {
    return (
        <ApolloProvider client={client}>
            <Header/>
            <Profile/>
        </ApolloProvider>
    );
}

export default App;
