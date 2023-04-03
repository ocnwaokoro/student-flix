import useCurrentUser from "@/hooks/useCurrentUser";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  // ensures that you cannot enter page w/o auth
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

const Profiles = () => {
  const router = useRouter();
  const { data: user } = useCurrentUser();
  console.log(user)
  return (
    <div className="flex items-center h-full justify-center">
      <div className="flex flex-col">
        <h1 className="text-3xl md:text-6xl text-white text-center">
          Welcome {user?.name}
        </h1>
        <div className="flex items-center justify-center gap-8 mt-10">
          <div onClick={() => router.push("/")}>
            <div className="group flex-row w-44 mx-auto text-center">
              <div
                className="
                    w-44
                    h-44
                    rounded-md
                    flex
                    items-center
                    justify-center
                    border-2
                    border-transparent
                    group-hover:cursor-pointer
                    group-hover:border-white
                    overflow-hidden"
              >
                <img src="/images/default-slate.png" alt="pfp" />
              </div>
              <div
                className="mt-4
                    text-gray-400
                    text-2xl
                    text-center
                    group-hover:text-white
                    "
              >
                Create
              </div>
            </div>
          </div>
          <div onClick={() => router.push("/")}>
            <div className="group flex-row w-44 mx-auto text-center">
              <div
                className="
                    w-44
                    h-44
                    rounded-md
                    flex
                    items-center
                    justify-center
                    border-2
                    border-transparent
                    group-hover:cursor-pointer
                    group-hover:border-white
                    overflow-hidden"
              >
                <img src="/images/default-slate.png" alt="pfp" />
              </div>
              <div
                className="mt-4
                    text-gray-400
                    text-2xl
                    text-center
                    group-hover:text-white
                    "
              >
                Watch
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profiles;
