import NavBarLinks from './NavBarLinks';

export default function SimpleNavBar(props) {
    return(
        <div className="mt-4 mb-6 mr-auto flex flex-row justify-center text-2xl text-grey-light">
            <NavBarLinks {...props}/>
        </div>
    )
}