import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri:'https://api.ss.dev/resource/api'
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client} className="App ">
    <React.StrictMode> 
      <App /> 
    </React.StrictMode>
  </ApolloProvider>,
)
