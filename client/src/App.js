import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Clients from './components/Clients'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import AddClientModal from './components/AddClientModal'
import Projects from './components/Projects'

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming
          },
        },
      },
    },
  },
})

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  // cache: new InMemoryCache(),
  cache,
})

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <Header />
          <div className='container'>
            <AddClientModal />
            <Projects />
            <Clients />
          </div>
        </Router>
      </ApolloProvider>
    </>
  )
}

export default App
