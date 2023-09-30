import Layout from "../../Partials/Layout";


export default function Signup() {

  return (
    <Layout childrenClasses="pt-0 pb-0">
      <div className="title-area flex flex-col justify-center items-center relative text-center mb-7">
        <h1 className="text-[34px] font-bold leading-[74px] text-qblack">
          Create Account
        </h1>
        <div className="shape -mt-6">
          <svg
            width="172"
            height="29"
            viewBox="0 0 172 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 5.08742C17.6667 19.0972 30.5 31.1305 62.5 27.2693C110.617 21.4634 150 -10.09 171 5.08727"
              stroke="#FFBB38"
            />
          </svg>
        </div>
        <div className="w-[350px]">
          <div className="flex flex-col w-full mt-5 gap-4">
            <input placeholder="Email Address" label="Email Address*" name="email" type="email"
              className="input-field placeholder:text-sm text-sm px-6 py-4 text-dark-gray w-full h-full font-normal bg-white focus:ring-0 focus:outline-none"
            />
            <input placeholder="Password" label="Password*" name="password" type="password"
              className="input-field placeholder:text-sm text-sm px-6 py-4 text-dark-gray w-full h-full font-normal bg-white focus:ring-0 focus:outline-none"
            />
          </div>

        </div>
        <button
          type="button"
          className="text-lg px-6 py-4 text-black w-full h-full font-normal bg-qred focus:ring-0 focus:outline-none"
        >
          Create
        </button>
      </div>
    </Layout>
  );
}
