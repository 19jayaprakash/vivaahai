import Header from "../components/Header/Header";
export default function RootLayout({ children }) {

    
  return (
   <>
        <Header />
       <main> {children}</main>
      </>
  );
}