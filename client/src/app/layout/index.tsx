import { FC, PropsWithChildren } from 'react';

import { Navbar } from '@/app/components/navbar';

interface IProps {
    children: JSX.Element;
}

export const Layout: FC<IProps> = ({ children }) => {
	return (
		<>
			<Navbar />
			<div>{children}</div>
		</>
	);
};
