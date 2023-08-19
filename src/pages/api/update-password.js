import fs from "fs";
import path from "path";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).end();
    }

    const filePath = path.join(process.cwd(), "src", "data", "users.json");

    try {
        const { email, oldPassword, newPassword } = req.body;
        const usersData = JSON.parse(fs.readFileSync(filePath));

        const userIndex = usersData.findIndex((user) => user.email === email);

        if (userIndex === -1) {
            return res.status(404).json({ error: "User not found" });
        }

        const user = usersData[userIndex];

        if (newPassword == '') {
            return res.status(401).json({ error: "empty password" });
        }
        if (oldPassword != user.password) {
            return res.status(401).json({ error: "Incorrect old password" });
        }

        user.password = newPassword;

        usersData[userIndex] = user;

        await fs.promises.writeFile(filePath, JSON.stringify(usersData, null, 2));
        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error("Error updating password:", error);
        res.status(500).json({ error: "Failed to update password" });
    }
}
