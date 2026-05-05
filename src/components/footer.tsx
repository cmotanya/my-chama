import { Link } from "@tanstack/react-router";
import { company, legal, products, social, support } from "../../data/footer";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-muted w-full space-y-8 border px-6 py-4 text-xs">
      <div className="space-y-5">
        <div className="space-y-2">
          <h3 className="text-base font-bold">My-Chama</h3>
          <p className="text-muted-foreground">
            Managing your chama in a modern, intuitive way. We provide the
            infrastructure that transforms your trust into institutional
            power.{" "}
          </p>
        </div>

        {/* Socials */}
        <div className="flex items-center gap-3">
          {social.map(({ link, icon: Icon }) => (
            <a
              key={link}
              className="bg-muted-foreground/20 border-muted-foreground/40 rounded-lg border p-1"
            >
              <Icon size={20} strokeWidth={2} color="#4a4a4a" />
            </a>
          ))}
        </div>
      </div>

      {/* Company */}
      <div className="space-y-2">
        <h3 className="text-base font-bold uppercase">Company</h3>

        <div className="flex flex-col gap-3">
          {company.map(({ link, href }) => (
            <a
              href={href}
              key={link}
              className="text-muted-foreground font-medium"
            >
              {link}
            </a>
          ))}
        </div>
      </div>

      {/* Products */}
      <div className="space-y-2">
        <h3 className="text-base font-bold uppercase">Products</h3>
        <div className="flex flex-col items-start gap-3">
          {products.map(({ name, link }) => (
            <a
              href={link}
              key={name}
              className="text-muted-foreground font-medium hover:scale-95 active:scale-105"
            >
              {name}
            </a>
          ))}
        </div>
      </div>

      {/* Support */}
      <div className="space-y-2">
        <h3 className="text-base font-bold uppercase">Support</h3>
        <div className="inline-flex flex-col gap-3">
          {support.map(({ name, link, icon: Icon }) => (
            <Link
              key={name}
              to={link}
              className="flex items-center gap-2 transition-all duration-200 ease-in-out hover:scale-95 active:scale-105"
            >
              {" "}
              <Icon strokeWidth={2} size={20} color="#4a4a4a" />{" "}
              <span className="text-muted-foreground font-medium">{name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Legal */}
      <div className="space-y-2">
        <h3 className="text-base font-bold uppercase">Legal</h3>

        <div className="flex flex-col gap-3">
          {legal.map((l) => (
            <a
              href={l.name}
              key={l.name}
              className="text-muted-foreground font-medium"
            >
              {l.name}
            </a>
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
