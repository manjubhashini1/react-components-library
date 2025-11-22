import "./App.css";
import { Link } from "react-router-dom";

function App() {
  return (
    <>
      <div className="home-bg realtive h-screen w-screen bg-[url('/bg.png')] bg-no-repeat bg-cover bg-center">
        <div className="absolute inset-0 bg-black/60">
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
            <h1 className="lg:text-5xl sm:text-3xl  mb-2">
              React Component Showcase
            </h1>
            <h2 className="lg:text-2xl sm:text-2xl">
              View components build from scratch in React!
            </h2>
            <div className="flex items-center gap-4 justify-center mt-4 text-black">
              <Link
                to="/dashboard"
                className="rounded-lg border border-white px-4 py-2 text-white hover:bg-white/10"
              >
                Get Started
              </Link>
              <a
                href="https://github.com/manjubhashini1/react-components-library" // 👈 replace with your profile or repo
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-white px-4 py-2 text-white hover:bg-white/10"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
