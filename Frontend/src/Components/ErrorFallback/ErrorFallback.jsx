export const ErrorFallback = ({ error, resetErrorBoundary }) => {
    return (
      <>
        <div role="alert">
            <p>Ups! Noget gik galt</p>
            <pre>{error.message}</pre>
            <button onClick={resetErrorBoundary}>Prøv igen</button>
        </div>
      </>
    );
  }
   
   