import { useState } from "react";
import { signIn, getCsrfToken } from "next-auth/react";
import { Formik, Field, ErrorMessage } from "formik";
import { useRouter } from "next/router";
import { validationSchema } from "../../consts/signIn.consts";

export default function SignIn({ csrfToken }: { csrfToken: string }) {
  const router = useRouter();
  const [error, setError] = useState<string | null | undefined>(null);

  return (
    <>
      <Formik
        initialValues={{ email: "", password: "", tenantKey: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          const res = await signIn("credentials", {
            redirect: false,
            email: values.email,
            password: values.password,
            callbackUrl: `${window.location.origin}`,
          });
          if (res?.error) {
            setError(res.error);
          } else {
            setError(null);
          }
          if (res?.url) router.push(res.url);
          setSubmitting(false);
        }}
      >
        {(formik) => (
          <form className="w-full" onSubmit={formik.handleSubmit}>
            <div
              className="flex flex-col items-center 
            justify-center min-h-screen py-2"
            >
              <div className="bg-layoutLight dark:bg-layoutDark shadow-md rounded-lg p-16 mb-4">
                <input
                  name="csrfToken"
                  type="hidden"
                  defaultValue={csrfToken}
                />

                <div className="text-red-400 text-md text-center rounded p-2">
                  {error}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="uppercase text-sm text-gray-600 font-bold"
                  >
                    Email
                    <Field
                      name="email"
                      aria-label="enter your email"
                      aria-required="true"
                      type="text"
                      className="w-full bg-gray-300 text-gray-900 mt-2 p-3"
                    />
                  </label>

                  <div className="text-red-600 text-sm">
                    <ErrorMessage name="email" />
                  </div>
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="password"
                    className="uppercase text-sm text-gray-600 font-bold"
                  >
                    password
                    <Field
                      name="password"
                      aria-label="enter your password"
                      aria-required="true"
                      type="password"
                      className="w-full bg-gray-300 text-gray-900 mt-2 p-3"
                    />
                  </label>

                  <div className="text-red-600 text-sm">
                    <ErrorMessage name="password" />
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <button
                    type="submit"
                    className="bg-green-400 text-gray-100 p-3 rounded-lg w-full"
                  >
                    {formik.isSubmitting ? "Please wait..." : "Sign In"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context: any) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
