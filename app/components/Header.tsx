import Image from "next/image";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 border-b border-gray-800">
      <div className="flex gap-5 ms-3">
        <Image
          src="/footerlogo.png"
          width={100}
          height={50}
          alt="Prepacademy logo"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-gray-800">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" />
            <path d="M8 12L11 15L16 9" stroke="white" strokeWidth="2" />
          </svg>
        </button>
        <button className="p-2 rounded-full hover:bg-gray-800">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
              stroke="white"
              strokeWidth="2"
            />
            <path
              d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21"
              stroke="white"
              strokeWidth="2"
            />
          </svg>
        </button>
        <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center">
          <span className="text-sm font-medium">JS</span>
        </div>
      </div>
    </header>
  );
}
