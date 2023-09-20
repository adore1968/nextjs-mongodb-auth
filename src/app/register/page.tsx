"use client";
import { User } from "@/interfaces/interfaces";
import { ChangeEvent, FormEvent, useState } from "react";
import axios, { AxiosError } from "axios";
import { signIn } from "next-auth/react";

const userInitialState = {
  username: "",
  email: "",
  password: "",
};

function RegisterPage() {
  const [user, setUser] = useState<User>(userInitialState);
  const [error, setError] = useState<string>("");

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setUser({ ...user, [name]: value });
  };

  const registerUser = async () => {
    try {
      const registerRes = await axios.post("/api/auth/signup", user, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      signIn("credentials", {
        username: registerRes.data.username,
        password: user.password,
        callbackUrl: "/dashboard/profile",
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        setError(error.response?.data?.message);
      }
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    registerUser();
  };

  return (
    <section className="sm:px-0 px-5 flex justify-center items-center min-h-[calc(100vh-4.5rem)]">
      <div className="flex-auto max-w-xl">
        <h2 className="text-center mb-5 text-2xl sm:text-3xl font-bold">
          Sign up
        </h2>
        {error && (
          <h3 className="bg-red-600 py-2 sm:px-0 px-4 text-center text-lg sm:text-xl text-gray-200 mb-1">
            {error}
          </h3>
        )}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col bg-gray-800 p-5 hover:bg-gray-700 transition-colors ease-in gap-5"
        >
          <label htmlFor="username" className="text-xl sm:text-2xl font-medium">
            Username
            <input
              type="text"
              name="username"
              id="username"
              placeholder="jsmith"
              value={user.username}
              onChange={handleChange}
              className="w-full text-lg sm:text-xl py-2.5 px-4 bg-gray-950 text-gray-200 rounded mt-1"
            />
          </label>

          <label htmlFor="email" className="text-xl sm:text-2xl font-medium">
            Email
            <input
              type="email"
              name="email"
              id="email"
              placeholder="jsmith@example.com"
              value={user.email}
              onChange={handleChange}
              className="w-full text-lg sm:text-xl py-2.5 px-4 bg-gray-950 text-gray-200 rounded mt-1"
            />
          </label>

          <label htmlFor="password" className="text-xl sm:text-2xl font-medium">
            Password
            <input
              type="password"
              name="password"
              id="password"
              placeholder="******"
              value={user.password}
              onChange={handleChange}
              className="w-full text-lg sm:text-xl py-2.5 px-4 bg-gray-950 text-gray-200 rounded mt-1"
            />
          </label>
          <button
            type="submit"
            className="bg-red-700 px-4 py-2.5 block mx-auto text-lg sm:text-xl rounded hover:bg-red-600 transition-colors ease-in"
          >
            Register with Credentials
          </button>
        </form>
      </div>
    </section>
  );
}

export default RegisterPage;
