import { Link } from "react-router-dom";
import ApiCaller from "../components/ApiCaller";

export default function Api() {
  return (
    <main className="container page stack">
      <ApiCaller />
      <div className="row">
        <Link className="link" to="/">
          ← Back home
        </Link>
      </div>
    </main>
  );
}

