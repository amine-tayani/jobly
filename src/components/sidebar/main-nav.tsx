import {
	SidebarGroup,
	SidebarGroupContent, SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem
} from "@/components/ui/sidebar";
import { useLocation } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";

export function MainNav({
	items
}: {
	items: {
		title: string;
		url: string;
		icon?: LucideIcon;
	}[];
}) {
	const pathname = useLocation({
		select: (location) => location.pathname
	});
	return (
		<SidebarGroup>
			<SidebarGroupContent className="px-2">
				<SidebarMenu className="gap-2">
					{items.map((item) => (
						<SidebarMenuItem key={item.title}>
							<SidebarMenuButton tooltip={item.title} asChild>
								<div>
									{item.icon && <item.icon className="mr-1.5 stroke-2" />}
									{item.title}
								</div>

							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}
