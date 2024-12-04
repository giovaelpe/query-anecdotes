import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addAnecdote } from "../Services/Network"
import { useContext, useState } from "react";
import { notificationContext } from "./NotificationContext";
import { clearNotification, setNotification } from "../Services/Actions";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const [notificationMessage, notificationDispatch] = useContext(notificationContext);
  const [inputAnecdote, setInputAnecdote] = useState("");

  const mutation = useMutation({
    mutationFn: addAnecdote,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['Anecdotes'] });
      notificationDispatch(setNotification(`created : ${inputAnecdote}`))
      setInputAnecdote("");
      setTimeout(
        () => notificationDispatch(clearNotification()),
        5000
      )
    },
    onError(error) {
      notificationDispatch(setNotification(`error: ${error.message}`))
      setInputAnecdote("");
      setTimeout(
        () => notificationDispatch(clearNotification()),
        5000
      )
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = inputAnecdote
    mutation.mutate(content);
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' value={inputAnecdote} onChange={({ target }) => setInputAnecdote(target.value)} />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
