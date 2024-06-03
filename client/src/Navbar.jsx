import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Arena</NavLink>
        </li>
        <li>
          <NavLink to="leaderboard">Leaderboard</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
