"use client";
import { ChangeEvent, FC, FormEventHandler, useState } from "react";
import Snackbar from "@/components/auth/snackbar/Snackbar";
import { resetPassword } from "@/api/auth";

const ResetPassword: FC = () => {
  const [emailValue, setEmailValue] = useState("");
  const [showSnackbar, setShowSnackbar] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (emailValue === '') {
      setShowSnackbar("emptyFields");
      return;
    }
    setIsButtonDisabled(true);
    setTimeout(() => setIsButtonDisabled(false), 3000);
    const formData = new FormData(e.currentTarget);
    const objEmail: { email: string } = {
      email: formData.get('email') as string
    };
    const res = await resetPassword(objEmail);
    if (res === 'The email with the password reset link has been sent.') {
      setShowSnackbar('successful');
    } else if (res === 'An email with a link to change your password has already been sent. Please try again in 30 minutes.') {
      setShowSnackbar('error30min');
    } else if (res === 'Invalid email.') {
      setShowSnackbar('invalidEmail');
    } else if (res === "The user's email has not been confirmed yet.") {
      setShowSnackbar('invalidEmailConfirmed');
    } else if (res === "User not found.") {
      setShowSnackbar('userNotFound');
    }
  }

  const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmailValue(event.target.value);
  }

  return (
    <>
      <div className="w-96 mx-auto flex items-center justify-center mt-10">
        <div className="max-w-[400px] w-full mx-auto rounded-lg bg-[#081642] p-8 px-8 border border-gray-500">
          <form onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)} onSubmit={handleSubmit} className="p-2">
            <h1 className='text-center text-[20px]'>Reset Password</h1>
            <div className="flex flex-col text-gray-400 mt-8 mb-6 relative">
              <input
                type="text"
                name="email"
                className="py-2 pl-2 pr-12 text-base font-medium text-white bg-transparent border-b-2 border-gray-500"
                placeholder="Email"
                value={emailValue}
                onChange={handleChangeEmail}
              />
              {emailValue && (
                <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-400">
                  Email
                </span>
              )}
            </div>
            <button
              type="submit"
              className={`w-full mb-2 mt-8 py-2 border border-amber-50 rounded-lg hover:bg-blue-950 transition-colors ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isButtonDisabled}
            >
              SEND EMAIL
            </button>
            {showSnackbar === "emptyFields" &&
              <Snackbar bg={"bg-red-900"} message={"There are empty fields."} setShowSnackbar={setShowSnackbar} />}
            {showSnackbar === "invalidEmail" &&
              <Snackbar bg={"bg-red-900"} message={"Invalid email."} setShowSnackbar={setShowSnackbar} />}
            {showSnackbar === "invalidEmailConfirmed" &&
              <Snackbar bg={"bg-red-900"} message={"The user's email has not been confirmed yet."} setShowSnackbar={setShowSnackbar} />}
            {showSnackbar === "userNotFound" &&
              <Snackbar bg={"bg-red-900"} message={"User not found."} setShowSnackbar={setShowSnackbar} />}
            {showSnackbar === "error30min" &&
              <Snackbar bg={"bg-green-900"} message={"An email with a link to change your password has already been sent. Please try again in 30 minutes."} setShowSnackbar={setShowSnackbar} />}
            {showSnackbar === "successful" &&
              <Snackbar bg={"bg-green-900"} message={"The email with the password reset link has been sent."} setShowSnackbar={setShowSnackbar} />}
          </form>
        </div>
      </div>
    </>
  )
}

export default ResetPassword;