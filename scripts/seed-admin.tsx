import "dotenv/config";
import bcrypt from "bcryptjs";
import User from "@/lib/models/User";
import dbConnect from "@/lib/db";

async function seed() {
  await dbConnect();

  const email = "admin@dagchain.com";
  const password = await bcrypt.hash("admin@123", 10);

  const exists = await User.findOne({ email });
  if (exists) {
    console.log("Admin already exists");
    process.exit(0);
  }

  await User.create({
    email,
    password,
    role: "admin",
  });

  console.log("Admin user created");
  process.exit(0);
}

seed();
