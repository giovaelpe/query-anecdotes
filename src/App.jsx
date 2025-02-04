import { useQuery } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import axios from 'axios'
import { AnecdotesList } from './components/Anecdoteslist'
import { getAnecdotes } from './Services/Network'

const App = () => {

  const query = useQuery({
    queryKey: ['Anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })

  if(query.isLoading){
    return (
      <>
      Loading anecdotes please wait
      </>
    )
  }

  if (query.isError) {
    return (
      <>
      <h3>Anecdote service not available due to problems in server</h3>
      </>
    )
  }

  const anecdotes = query.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />
      <AnecdotesList anecdotes={anecdotes} />
    </div>
  )
}

export default App
