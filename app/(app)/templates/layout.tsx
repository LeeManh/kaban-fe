import { Header } from "../_components/header";

export default function TemplatesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
