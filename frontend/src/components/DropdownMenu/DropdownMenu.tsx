import React, { useRef } from 'react';
import './DropDownMenu.css';
import { useDetectOutsideClick } from '../../hooks/detectOutsideClickEffect';
import { Link } from "react-router-dom";

interface DropdownMenuProps {
    username: string;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ username }) => {
    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
    const onClick = () => typeof setIsActive === 'function' &&  setIsActive(!isActive);
    return (
        <div className="menu-container">
          <button onClick={onClick} className="menu-trigger">
            <span>{username}</span>
            <img src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/df/df7789f313571604c0e4fb82154f7ee93d9989c6.jpg" alt="User avatar" />
          </button>
          <nav ref={dropdownRef} className={`menu ${isActive ? 'active' : 'inactive'}`}>
            <ul>
              <li><Link to="/">Search</Link></li>
              <li><Link to="/favorites">Favorites</Link></li>
            </ul>
          </nav>
        </div>
    );
};