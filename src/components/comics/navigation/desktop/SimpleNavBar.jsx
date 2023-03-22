import NavBarLinks from "./NavBarLinks";

export default function SimpleNavBar(props) {
  return (
    <div className="navbar-width transition-colors mt-4 mb-6 mr-auto flex flex-row justify-between mr-auto ml-auto text-2xl text-grey-light">
      <NavBarLinks {...props} />
    </div>
  );
}
