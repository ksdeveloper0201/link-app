import { ChevronRight, CrossIcon, SidebarCloseIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetTrigger,
} from "../ui/sheet";
import { Sidebar } from "./Sidebar";

export const MobileToggleSidebar = () => {
    return (
        <Sheet>
            <SheetTrigger asChild className="glow-0">
                <Button variant="ghost" size="icon" className="md:hidden">
                    <ChevronRight className="w-8 h-8 text-zinc-200/70" />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 flex gap-0 w-[288px]">
                <Sidebar />
            </SheetContent>
        </Sheet>
    );
};
