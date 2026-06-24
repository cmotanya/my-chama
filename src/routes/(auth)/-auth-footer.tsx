export default function AuthFooter() {
  return (
    <footer className="bg-muted flex w-full items-center justify-center border-t p-5">
      <span className="text-muted-foreground text-[10px] font-medium">
        © {new Date().getFullYear()} my-chama
      </span>
    </footer>
  );
}
