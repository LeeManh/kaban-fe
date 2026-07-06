import { Header } from "../_components/header";

export default function BoardsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
