
import Sidebar from "./Sidebar";
import { SidebarUser } from "./Sidebar.types";

type SidebarManagerProps = {
  user: SidebarUser;
};

export default function SidebarManager({ user }: SidebarManagerProps) {

  return <Sidebar user={user} canShrink expanded />
}