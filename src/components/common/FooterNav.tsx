import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import {FaHome, FaUserFriends} from "react-icons/fa";
import {GiMoneyStack} from "react-icons/gi";
import {FamilyFontBase} from "../styled/styled";

const NavContainer = styled.div`
    ${FamilyFontBase};
    position: relative;
    width: 100%;
    height: 8vh;
    color: #faf8f8;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #1F2329;
`;

const NavList = styled.ul`
    display: flex;
    width: 100vw;
    padding: 0;
    margin: 0;
`;

const NavItem = styled.li`
    list-style: none;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center; 

    .nav-link {  
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        text-decoration: none;
        color: rgba(204, 204, 204, 0.35);
        transition: color 0.5s;
        width: 100%;  
        padding: 10px 0;  

        &.active {  
            color: #DDDDDD;
            animation: pulse 0.5s;
        }
    }

    .icon { 
        font-size: 4vh;
    }
`;

export const FooterNav = () => {
    return (
        <NavContainer>
            <NavList>
                <NavItem>
                    <NavLink to="/home" className="nav-link">
                        <span className="icon"><FaHome /></span>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/friends" className="nav-link">
                        <span className="icon"><FaUserFriends /></span>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/payment" className="nav-link">
                        <span className="icon"><GiMoneyStack /></span>
                    </NavLink>
                </NavItem>
            </NavList>
        </NavContainer>
    );
};

