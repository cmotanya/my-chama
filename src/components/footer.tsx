export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="text-muted-foreground flex w-full flex-col items-center justify-center gap-1.5 border px-6 py-4 text-xs">
      <p className="font-semibold tracking-widest uppercase">
        {" "}
        © {year} My Chama
      </p>
      <p className="tracking-tight"> Unity • Investment • Growth</p>
    </footer>
  );
}
