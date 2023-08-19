import Form from "@/components/auth/form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router"; // Import the useRouter hook
import Header from "../../components/header";
import { useSession, signOut } from "next-auth/react";

export default function SignIn() {
  const router = useRouter(); // Initialize the router object
  const { data: session } = useSession();

  const onSubmit = async (email, password, firstName, lastName, confirmPassword) => {
    try {
      const data = await signIn("credentials", { redirect: false, email, password, firstName, lastName, confirmPassword });

      if (data) {
        router.push("/dashboard"); // Use the router to navigate
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  if (session) {
   
    return (
      <div>
        
       <h1> Signed in as {session.user.email} <br /></h1>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  } else {
    
    return (
      <div>
        
        <Form signin={true} onFormSubmit={onSubmit} />
      </div>
    );
  }
}
