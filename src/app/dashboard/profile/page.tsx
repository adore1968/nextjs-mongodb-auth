"use client";
import Loader from "@/components/Loader";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <Loader />;
  }

  if (status === "unauthenticated") {
    router.push("/register");
    return;
  }

  if (status === "authenticated") {
    console.log(session);
  }

  return (
    <section className="sm:px-0 px-5 flex justify-center items-center min-h-[calc(100vh-4.5rem)]">
      <div className="container mx-auto flex flex-col gap-5">
        <h2 className="text-center text-2xl sm:text-3xl font-bold">Profile</h2>

        <div className="bg-gray-800 p-5 hover:bg-gray-700 transition-colors ease-in rounded text-lg sm:text-xl text-gray-200">
          <pre>{JSON.stringify({ session, status }, null, 2)}</pre>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/login" })}
          ></button>
        </div>

        <button
          className="bg-red-700 block mx-auto px-4 py-2.5 rounded text-lg sm:text-xl text-gray-200 hover:bg-red-600 transition-colors ease-in"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          Logout
        </button>
      </div>
    </section>
  );
}

export default ProfilePage;
