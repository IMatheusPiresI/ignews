import { signIn, signOut, useSession } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";

export default function SignInButton() {
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        <button onClick={() => signOut()}>
          <FaGithub color="green" />
          {session.user?.name}
          <FiX />
        </button>
      ) : (
        <button onClick={async () => await signIn("github")}>
          <FaGithub color="yellow" />
          SignIn with Github
        </button>
      )}
    </>
  );
}
