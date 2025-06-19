# Error Handling Demo

This project demonstrates error handling patterns in TypeScript, including:

- Automatic retry with delay
- `error.cause` and `AggregateError` usage
- Return early and fail-fast principles
- Use of an `Either` container
- Finalization and resource cleanup via `Promise.finally()`

The code fetches data from the public PokeAPI and handles both expected and unexpected failures.
