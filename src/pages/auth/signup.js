import Form from "@/components/auth/form";



export default function SignUp () {
    const onSubmit = async (email, password, firstName, lastName, confirmPassword) => {
        try {
            const response = await fetch("/api/auth/signup", {
                method: "POST",
                body: JSON.stringify({email, password,firstName, lastName, confirmPassword }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.ok) {
                alert("Sign up Succesful");
            }
        } catch (err) {
            console.error(err);
        }
        
    };
    return <Form signin={false} onFormSubmit={onSubmit} />
};
