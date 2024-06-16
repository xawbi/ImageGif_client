"use client"
import { ChangeEvent, FC, FormEventHandler, useState } from "react";
import Snackbar from "@/components/auth/snackbar/Snackbar";
import { changePassword, objNewPasswordType } from "@/api/auth";
import PasswordField from "@/components/auth/PasswordField";
import { useRouter } from "next/navigation";

interface ChangePageProps {
  token: string
}

const ChangePassword: FC<ChangePageProps> = ({token}) => {
  let router = useRouter()
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showSnackbar, setShowSnackbar] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (newPassword === '' || confirmNewPassword === '') {
      setShowSnackbar("emptyFields");
      return;
    }
    setIsButtonDisabled(true)
    setTimeout(() => setIsButtonDisabled(false), 3000)
    const formData = new FormData(e.currentTarget);
    const objPassword: objNewPasswordType = {
      newPassword: formData.get('newPassword') as string,
      confirmNewPassword: formData.get('confirmNewPassword') as string
    };
    const res = await changePassword(objPassword, token);
    if (res === 'Password successfully changed.') {
      setShowSnackbar('successful');
      setTimeout(() => {
        router.push('/auth')
      }, 2000)
    } else if (res === 'The password must be at least 4 characters long.') {
      setShowSnackbar('errorLongPassword');
    } else if (res === 'Passwords mismatch.') {
      setShowSnackbar('passwordMismatch');
    } else if (res === "User not found.") {
      setShowSnackbar('userNotFound');
    }
  }

  const handleNewPassword = (event: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value);
  }

  const handleConfirmNewPassword = (event: ChangeEvent<HTMLInputElement>) => {
    setConfirmNewPassword(event.target.value);
  }

  return (
    <>
      <div className="w-96 mx-auto flex items-center justify-center mt-10">
        <div className="max-w-[400px] w-full mx-auto rounded-lg bg-[#081642] p-8 px-8 border border-gray-500">
          <form onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)} onSubmit={handleSubmit} className="p-2">
            <h1 className='text-center text-[20px]'>Reset Password</h1>
            <div className="flex flex-col text-gray-400 mt-8 mb-6 relative">
              <div className='flex flex-col text-gray-200 py-2 mb-3 mt-2'>
                <PasswordField handleChangePassword={handleNewPassword} passwordValue={newPassword} name='newPassword'/>
              </div>
              <div className='flex flex-col text-gray-200 py-2'>
                <PasswordField handleChangePassword={handleConfirmNewPassword} passwordValue={confirmNewPassword} name='confirmNewPassword'/>
              </div>
            </div>
            <button
              type="submit"
              className={`w-full mb-2 mt-8 py-2 border border-amber-50 rounded-lg hover:bg-blue-950 transition-colors ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isButtonDisabled}
            >
              SUBMIT
            </button>
            {showSnackbar === "emptyFields" &&
              <Snackbar bg={"bg-red-900"} message={"There are empty fields."} setShowSnackbar={setShowSnackbar} />}
            {showSnackbar === "errorLongPassword" &&
              <Snackbar bg={"bg-red-900"} message={"The password must be at least 4 characters long."} setShowSnackbar={setShowSnackbar} />}
            {showSnackbar === "passwordMismatch" &&
              <Snackbar bg={"bg-red-900"} message={"Passwords mismatch."} setShowSnackbar={setShowSnackbar} />}
            {showSnackbar === "userNotFound" &&
              <Snackbar bg={"bg-red-900"} message={"User not found."} setShowSnackbar={setShowSnackbar} />}
            {showSnackbar === "successful" &&
              <Snackbar bg={"bg-green-900"} message={"Password successfully changed."} setShowSnackbar={setShowSnackbar} />}
          </form>
        </div>
      </div>
    </>
  )
}

export default ChangePassword