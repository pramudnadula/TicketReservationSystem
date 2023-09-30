import { Link } from "react-router-dom";


export default function Navbar({ className, type }) {

  return (
    <div
      className={`nav-widget-wrapper w-full  h-[60px] relative z-30 ${type === 3 ? 'bg-qh3-blue' : 'bg-qyellow'}  ${className || ""
        }`}
    >
      <div className="container-x mx-auto h-full">
        <div className="w-full h-full relative">
          <div className="w-full h-full flex justify-between items-center">
            <div className="category-and-nav flex xl:space-x-7 space-x-3 items-center">

              <div className="nav">
                <ul className="nav-wrapper flex xl:space-x-10 space-x-5">

                  <li>
                    <Link to="/blogs">
                      <span className={`flex items-center text-sm font-600 cursor-pointer ${type === 3 ? 'text-white' : 'text-qblacktext'}`}>
                        <span>Blog</span>
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact">
                      <span className={`flex items-center text-sm font-600 cursor-pointer ${type === 3 ? 'text-white' : 'text-qblacktext'}`}>
                        <span>Contact</span>
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
