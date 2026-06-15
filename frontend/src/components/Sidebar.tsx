import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const links = [
    "Dashboard",
    "Tasks",
    "Schedule",
    "Sessions",
    "Analytics",
  ];

  return (
    <aside
      className="
        h-screen
        w-64
        border-r
        border-white/10
        bg-white/5
        backdrop-blur-xl
        p-6
      "
    >

        <Link
        to="/login"
        className="
            mb-10
            block
            text-xl
            font-extrabold
            text-purple-400
        "
        >
        
        <h1>FlowState</h1>
        </Link>
      

      <nav className="space-y-2">
        {links.map((link) => (
          <NavLink
            key={link}
            to={`/${link.toLowerCase()}`}
            className={({ isActive }) =>
              `
              block
              rounded-xl
              px-4
              py-3
              transition
              ${
                isActive
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-500/20"
                  : "text-slate-300 hover:bg-white/5"
              }
            `
            }
          >
            {link}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}