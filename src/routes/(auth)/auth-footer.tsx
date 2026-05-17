export default function AuthFooter() {
  return (
    <footer className="bg-muted fixed bottom-0 flex w-full items-center justify-center border-t p-5">
      <span className="text-muted-foreground text-xs font-bold">
        © {new Date().getFullYear()} My-Chama
      </span>
    </footer>
  );
}
