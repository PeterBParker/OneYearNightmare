export function BigSpinner() {
  return <div className="bigSpinner"></div>;
}

export function PageLoadingSpinner() {
  return <div className="my-32 flex justify-center"><BigSpinner/></div>
}

export function SmallSpinner() {
  return <div className="text-sm">Loading...</div>;
}
