import { save } from "@/services/users";

export default function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(404).send();
    }
    const { email, password, firstName, lastName, confirmPassword  } = req.body;
    console.log(firstName, lastName, confirmPassword)
    try {
        save(email, password, firstName, lastName, confirmPassword );
        
        res.status(201).send();
    } catch (err) {
        res.status(400).json({message: err});
    }

}
  