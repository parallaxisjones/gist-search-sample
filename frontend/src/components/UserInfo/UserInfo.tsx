import React from 'react';
import { DropdownMenu } from '../DropdownMenu/DropdownMenu';

interface User {
    name: string;
}

interface UserInfoProps {
    user: User;
}


export const UserInfo: React.FC<UserInfoProps> = ({ user: { name } }) => {
    return (<DropdownMenu username={name} />)
}