import { navigateTo } from "../../navigation";
import style from "./side-bar.module.css"
import logo from "../../assets/paper-critic-logo.jpg"

export default function Sidebar({active = 0}) {
  return (
    <aside className={style.sidebar}>
        <a className={style.logo} onClick={()=>navigateTo("/")} href="#top">
            <img src={logo} width="150" height="auto" alt="Papercritic Home Page" />
          {/* <span>papercritic</span> */}


        </a>

        <nav className={style["side-nav"]}>
          <a className={`${style["nav-link"]} ${active==1? style["is-active"] : ""}`} onClick={()=>navigateTo("/")} href="#top">Discover</a>
          <a className={`${style["nav-link"]} ${active==3? style["is-active"] : ""}`} onClick={(e)=>{ e.preventDefault(); navigateTo("/profile");}} href="#Profile">Profile</a>
        </nav>
      </aside>
  );
}