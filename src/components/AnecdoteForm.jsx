import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addAnecdote } from "../Services/Network"
import { useContext } from "react";
import { notificationContext } from "./NotificationContext";
import { clearNotification, setNotification } from "../Services/Actions";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const [notificationMessage, notificationDispatch] = useContext(notificationContext);

  const mutation = useMutation({
    mutationFn: addAnecdote,
    onSuccess() {
      queryClient.invalidateQueries({queryKey: ['Anecdotes']})
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    mutation.mutate(content);
    notificationDispatch(setNotification(`created : ${content}`))
    setTimeout(
      () => notificationDispatch(clearNotification()),
      5000
    )
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
