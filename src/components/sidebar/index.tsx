import { Button } from "@/components/ui/button";
import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
	SidebarMenuItem,
	useSidebar
} from "@/components/ui/sidebar";
import { Link } from "@tanstack/react-router";
import {
	ArrowLeftRightIcon, CalendarDaysIcon,
	ClipboardIcon,
	EclipseIcon,
	HomeIcon, SidebarIcon,
	WalletCardsIcon
} from "lucide-react";
import { MainNav } from "./main-nav";

const data = {
	mainNavigation: [
		{
			title: "Home",
			url: "/dashboard",
			icon: HomeIcon
		},
		{
			title: "Accounts",
			url: "/dashboard/accounts",
			icon: WalletCardsIcon
		},
		{
			title: "Transactions",
			url: "/dashboard/transactions",
			icon: ArrowLeftRightIcon
		},
		{
			title: "Spending Plan",
			url: "/dashboard/spending",
			icon: EclipseIcon
		},
		{
			title: "Upcomings",
			url: "/dashboard/upcomings",
			icon: CalendarDaysIcon
		},
		{
			title: "Reports",
			url: "/dashboard/reports",
			icon: ClipboardIcon
		}
	],

};


export function DashboardSidebar() {
	const { toggleSidebar } = useSidebar();
	return (
		<Sidebar collapsible="icon" className="group-data-[side=left]:border-none">
			<SidebarHeader>
				<SidebarMenuItem>
					<div className="flex items-center justify-between">
						<Link to="/" className="flex items-center group-data-[collapsible=icon]:hidden">
							<span className="ml-4 font-bold text-foreground">
								Jobly
							</span>
						</Link>

						<div className="flex mx-auto mt-4 mr-3 not-group-data-[collapsible=icon]:mt-0 not-group-data-[collapsible=icon]:mr-0">
							<Button size="icon" variant="ghost" onClick={toggleSidebar}>
								<SidebarIcon className="size-4.5" />
							</Button>
						</div>
					</div>
				</SidebarMenuItem>
			</SidebarHeader>
			<SidebarContent>
				<MainNav items={data.mainNavigation} />
			</SidebarContent>
		</Sidebar>
	);
}
