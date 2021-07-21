import React, {useEffect} from 'react';
import './App.css';
import {Header} from "./components/Header";
import {Profile} from "./components/Profile/Profile";
import {ApolloClient, ApolloProvider, createHttpLink, InMemoryCache} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {useDispatch} from "react-redux";
import {Authentication} from "./components/Auth/Authentication";
import {headers} from "./api/getDataAPI";
import {Route} from "react-router-dom";
import {validateToken} from "./redux/reducers/auth-reducer";
import {Leaderboard} from "./components/Leaderboard/Leaderboard";
import {Network} from "./components/Players/Network";
import {getCurrentProfile} from "./redux/reducers/data-reducer";

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
    cache: new InMemoryCache({
        addTypename: false
    })
});


function App() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(validateToken())
    }, [])
    useEffect(() => {
        dispatch(getCurrentProfile())
    }, [])

    return (
        <ApolloProvider client={client}>
            <Header/>
            <Route exact path={'/'} render={() => <Profile/>}/>
            <Route path={'/profile'} render={() => <Profile/>}/>
            <Route path={'/auth'} render={() => <Authentication/>}/>
            <Route path={'/leaderboard'} render={() => <Leaderboard/>}/>
            <Route path={'/network'} render={() => <Network/>} />
        </ApolloProvider>
    )
}

export default App;
