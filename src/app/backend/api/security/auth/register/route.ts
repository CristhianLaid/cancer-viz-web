export async function registerUser(
  username: string,
  email: string,
  password: string
) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });

  if (!res.ok) {
    throw new Error("Error registering user");
  }

  return await res.json();
}
