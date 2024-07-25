import { Link } from 'react-router-dom';
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuList,
} from './ui/navigation-menu';

const NavBar = () => {
	return (
		<NavigationMenu>
			<NavigationMenuList className='flex flex-col items-start gap-5 border border-white p-3'>
				<NavigationMenuItem>
					<Link
						to='/tasks'
						className='text-white px-1'>
						Tasks
					</Link>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<Link
						to='/calendar'
						className='text-white'>
						Calendar
					</Link>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<Link
						to='/issues'
						className='text-white'>
						Issues
					</Link>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
};

export default NavBar;
