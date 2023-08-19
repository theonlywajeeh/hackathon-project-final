import fs from "fs";
import path from "path";
import { compare } from "bcryptjs";

const filePath = path.join(process.cwd(), "src", "data", "users.json");

export function getAll() {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
}

export function getById(id) {
  const data = getAll();
  return data.find((p) => p.id === Number(id));
}

export function getByEmail(email) {
  const data = getAll();
  return data.find((p) => p.email.toLowerCase() === email.toLowerCase());
}

export async function verifyPassword(confirmPassword, password) {
  const isValid = await compare(password, confirmPassword);
  return isValid;
}

// export async function save (email, password, firstName, lastName) {
//     const found = getByEmail(email);
//     if (found) {
//         throw new Error("User already exist.");
//     }
//     const data = getAll();

//     data.push({
//         id: data.length + 1,
//         email,
//         password,
//         firstName,
//         lastName
//     });
//     fs.writeFileSync(filePath, JSON.stringify(data));
// }

export async function save(
  email,
  password,
  firstName,
  lastName,
  confirmPassword
) {
  const found = getByEmail(email);
  if (found) {
    throw new Error("User already exists.");
  }
  const data = getAll();

  data.push({
    id: data.length + 1,
    email,
    password,
    firstName,
    lastName,
    confirmPassword,
  });

  fs.writeFileSync(filePath, JSON.stringify(data));
}


  // if (!title || !content) {
  //   return res.status(400).json({ error: "Both title and content are required." });
  // }