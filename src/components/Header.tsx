import { memo } from "react";
import { Link } from "react-router-dom";

const Header = memo(() => {
  return (
    <header>
      <Link to="/">Adopt Me!</Link>
    </header>
  );
});

Header.displayName = "Header";

export default Header;
