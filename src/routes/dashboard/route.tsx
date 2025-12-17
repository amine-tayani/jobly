import { DashboardSidebar } from "@/components/sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
	component: DashboardLayout,

});

function DashboardLayout() {


	return (
		<SidebarProvider>
			<DashboardSidebar />
			<div className="pt-7 px-6 w-full bg-muted ">
				<SidebarInset className="overflow-hidden rounded-2xl [&>div]:max-h-[calc(100vh-9rem)]">
					<>
						<header className="flex h-20 shrink-0 items-center gap-2 border-b pt-2 mb-4">
							<div className="flex flex-1 items-center gap-2">
								<div className="flex items-center justify-between gap-4 pl-7">
									<h1 className="text-2xl font-medium tracking-tight"> Dashboard</h1>
								</div>
							</div>

						</header>
						<Outlet />
					</>
				</SidebarInset>
			</div>
		</SidebarProvider>
	);
}
