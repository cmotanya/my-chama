import { Link } from "@tanstack/react-router";

export default function Footer() {
  const year = new Date().getFullYear();

  const products = [
    { link: "Our Features" },
    { link: "How It Works" },
    { link: "Pricing" },
  ];

  return (
    <footer className="bg-muted w-full space-y-8 border px-6 py-4 text-xs">
      <div className="space-y-1">
        <h3 className="text-base font-bold">My-Chama</h3>
        <p className="text-muted-foreground">
          Managing your chama in a modern, intuitive way. We provide the
          infrastructure that transforms your trust into institutional
          power.{" "}
        </p>
      </div>

      <div className="space-y-1">
        <h3 className="text-base font-bold uppercase">Product</h3>
        <div className="flex flex-col items-start gap-2">
          {products.map(({ link }) => (
            <Link
              to="/"
              key={link}
              className="text-muted-foreground font-medium"
            >
              {link}
            </Link>
          ))}
        </div>
      </div>

      <div className="text-primary flex flex-col items-center justify-center gap-1.5">
        <p className="text-center font-bold">
          {" "}
          © {year} My-Chama • Built with love for the Kenyan Market
        </p>
        <p className="tracking-tight"> Unity • Investment • Growth</p>
      </div>
    </footer>
  );
}
