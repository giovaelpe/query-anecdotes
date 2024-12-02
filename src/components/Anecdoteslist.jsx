import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateAnecdote } from "../Services/Network";

export function AnecdotesList({ anecdotes }) {

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: updateAnecdote,
        onSuccess(){
            queryClient.invalidateQueries({queryKey: ['Anecdotes']})
        }
    })

    const handleVote = (anecdote) => {
        mutation.mutate(anecdote)
      }

    return (
        <>
        {
            anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote)}>vote</button>
                    </div>
                </div>
            )
        }
        </>
    )
}