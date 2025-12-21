import { Button } from "@/components/ui/button";
import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
	SidebarMenuItem,
	useSidebar
} from "@/components/ui/sidebar";
import { Link } from "@tanstack/react-router";
import { BookmarkIcon, BriefcaseIcon, HomeIcon, SidebarIcon } from "lucide-react";
import { Navigation } from "./navigation";

const data = {
	nav: [
		{
			title: "Home",
			url: "/dashboard",
			icon: HomeIcon
		},
		{
			title: "Jobs Listings",
			url: "/dashboard/jobs",
			icon: BriefcaseIcon
		},
		{
			title: "Applications",
			url: "/dashboard/applications",
			icon: BookmarkIcon
		},
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
				<Navigation items={data.nav} />
			</SidebarContent>
		</Sidebar>
	);
}