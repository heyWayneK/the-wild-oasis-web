import Navigation from "@/app/_components/Navigation";
import SideNavigation from "../_components/SideNavigation";

export default function Layout({ children }) {
  return (
    <div className="grid grid-cols-[16rem_1fr] gap-12 h-full">
      <SideNavigation />

      <div>{children}</div>
    </div>
  );
}
