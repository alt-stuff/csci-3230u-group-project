import style from "./top-bar.module.css"
import {useState} from "react";
import {navigateTo} from "../../navigation";

export default function TopBar() {
  const [query, setQuery] = useState("");
  
  return (
    <header className={style["topbar"]}>
      <form className={style["search"]} role="search" onSubmit= {(e) => {
        e.preventDefault();
        if(query.trim()){
          navigateTo("/search/"+ encodeURIComponent(query.trim()));
        } else {
          navigateTo("/");
        }
      }}>
        <input type="search" placeholder="Search books, authors, or genres" value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search books, authors, or genres"/>
      </form>
    </header>
  );
}