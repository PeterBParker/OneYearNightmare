import footerImage from '../../../assets/Website Assets - Phase 1/SVG/MOBILE-menu-image.svg';
import exitButton from '../../../assets/Website Assets - Phase 1/SVG/MOBILE-x.svg';
import { Link } from 'react-router-dom';
import React, { useRef } from 'react';

export default function MobileMenu(props) {
    let mobileMenu = useRef(null);

    if (props.showMenu && mobileMenu.current) {
        mobileMenu.current.style.right = "0";
    } else if (!props.showMenu && mobileMenu.current) {
        mobileMenu.current.style.right = "-100%";
    }
    return (
        <div className='mobileMenuOverlay' ref={mobileMenu}>
            <div className="mobileMenuContainer bg-grey-light">
                <div className="mobileMenuExitContainer grid justify-end">
                    <div className="mr-3">
                        <button onClick={props.onMenuChange} className="mobileMenuExitButton"><img src={exitButton} width={32} /></button>
                    </div>
                </div>
                <div className="mobileMenuLinks text-green font-header text-3xl">
                    <div className="mobileMenuLinksSpacer grid grid-rows-3 grid-cols-1">
                        <div className="comicViewerNavLink">
                            <Link to={'/read'} onClick={props.onMenuChange}>read</Link>
                        </div>
                        <div className="creatorsNavLink">
                            <Link to='/creatives' onClick={props.onMenuChange}>about us</Link>
                        </div>
                        <div className="supportNavLink">
                            <Link to='/support' onClick={props.onMenuChange}>support us</Link>
                        </div>
                    </div>
                </div>
                <div className="mobileMenuFooterImage w-full">
                    <img src={footerImage} />
                </div>
            </div>
        </div>
    );
}