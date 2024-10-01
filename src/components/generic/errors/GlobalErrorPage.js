import { useRouteError } from "react-router-dom";

export default function GlobalErrorPage() {
  const error = useRouteError();
  console.log(error);
  return (
    <div id="error-page w-full">
      <div className="text-4xl mx-auto">Oops!</div>
      <p className="text-xl mx-auto">
        Sorry, an unexpected error has occurred.
      </p>
      <p>
        <i className="text-xl mx-auto">{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
