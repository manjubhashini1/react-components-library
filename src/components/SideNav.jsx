import { NavLink } from "react-router-dom";

const SideNav = () => {
  const links = [
    { to: "/dashboard/button", label: "Button Component" },
    { to: "/dashboard/infinitescroll", label: "InfiniteScroll Component" },
    { to: "/dashboard/infinitescrollio", label: "InfiniteScroll IO Component" },
    { to: "/dashboard/tab", label: "Tabbed Component" },
  ];
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 border-r w-64">
        <p className="lg:text-2xl p-4 font-bold border-b-2">Components</p>
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className="flex px-4 py-2 text-gray-700 hover:bg-gray-200"
        >
          {link.label}
        </NavLink>
      ))}
    </div>
  );
};

export default SideNav;
