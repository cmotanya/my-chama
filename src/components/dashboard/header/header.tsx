import { Avatar } from "../avatar";
import MobileNavigation from "./mobile-nav";

const Header = () => {
  return (
    <header className="z-1000 flex items-center justify-between border-b p-4">
      <MobileNavigation  />
      <Avatar name="avataaars" seed="rtqggwjj" size={40} className="-mt-3" />
    </header>
  );
};

export default Header;
