
import { Inter } from "next/font/google";
import Link from "next/link";


const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className=" text-[90px] font-bold -mt-80 mb-2">Welcome to Blogger's Home</h1>
       <h2 className="font-[50px] ">Every word you write has the power to shape someone's world. Embrace the journey of a blogger, for your words have the potential to inspire, educate, and connect.</h2> 
        <p className="text-lg mb-4">Please log in to continue your journey.</p>
        <Link href={"/auth/login"}
           className="text-blue-500 hover:underline text-lg">
            Go to Login Page
          
        </Link>
      </div>
    </div>
  );
}
