import { VeeCodeLogo } from "../VeeCodeLogo";

export const Header = () => (
  <header className="w-full py-4 bg-neutral-50 dark:bg-neutral-900 fixed top-0">
    <div className="w-2/3 mx-auto">
      <VeeCodeLogo width={180} height={60} />
    </div>
  </header>
);
