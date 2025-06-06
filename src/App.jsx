import Weather from "./components/Weather/Weather";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <div>
      <Toaster position="top-right" />
      <Weather />
    </div>
  );
}
