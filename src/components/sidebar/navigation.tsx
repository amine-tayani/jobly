import {
	SidebarGroup,
	SidebarGroupContent, SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem
} from "@/components/ui/sidebar";
import { Link } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";

export function Navigation({
	items
}: {
	items: {
		title: string;
		url: string;
		icon?: LucideIcon;
	}[];
}) {

	return (
		<SidebarGroup>
			<SidebarGroupContent className="px-2">
				<SidebarMenu className="gap-2">
					{items.map((item) => (
						<SidebarMenuItem key={item.title}>
							<SidebarMenuButton tooltip={item.title} asChild>
								<Link to={item.url} className="inline-flex">
									{item.icon && <item.icon className="mr-1" />}
									{item.title}
								</Link>

							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}