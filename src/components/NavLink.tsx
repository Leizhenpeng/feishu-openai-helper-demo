import {NavLink as RRNavLink} from 'react-router-dom';
import React from 'react';

export const NavLink = ({
                            to,
                            children,
                        }: {
    to: string;
    children?: React.ReactNode;
}) => {
    return (
        <RRNavLink
            to={ to }
            className="inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
        >
            { children }
        </RRNavLink>
    );
};
