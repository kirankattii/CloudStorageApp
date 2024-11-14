import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import Image from "next/image"
import React, { useState } from "react"
import { Button } from "./ui/button"
import { sendEmailOTP, verfiySecret } from "@/lib/actions/user.actions"
import { useRouter } from "next/navigation"
import { send } from "process"


const OTPModel = ({ accountId, email }: { accountId: string, email: string }) => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(true)
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      // call api to verfiy otp
const sessionId = await verfiySecret({ accountId, password });

if(sessionId) router.push("/")

    } catch (error) {
      console.log("Failed to Verfiy OTP");

    }
    setIsLoading(false)
  }

  const handleResendOtp = async () => {
    //call api to resend otp
    await sendEmailOTP({email})
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader className="relative flex justify-center">
          <AlertDialogTitle className="h2 text-center">Enter Your OTP
            <Image src='/assets/icons/close-dark.svg' alt="close" width={20} height={20} onClick={() => setIsOpen(false)} className="otp-close-button" />
          </AlertDialogTitle>
          <AlertDialogDescription className="subtitle-2 text-center text-light-100">
            We&apos;ve sent a code to <span className="pl-1 text-brand">{email}</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <InputOTP maxLength={6} value={password} onChange={setPassword}>
          <InputOTPGroup className="shad-otp">
            <InputOTPSlot index={0} className="shad-otp-slot" />
            <InputOTPSlot index={1} className="shad-otp-slot" />
            <InputOTPSlot index={2} className="shad-otp-slot" />
            <InputOTPSlot index={3} className="shad-otp-slot" />
            <InputOTPSlot index={4} className="shad-otp-slot" />
            <InputOTPSlot index={5} className="shad-otp-slot" />
          </InputOTPGroup>
        </InputOTP>

        <AlertDialogFooter>
          <div className="flex w-full flex-col gap-4">
            <AlertDialogAction onClick={handleSubmit} className="shad-submit-btn h-12" type="button">Submit
             {isLoading &&  <Image src='/assets/icons/loader.svg' alt="loader" width={24} height={42} className="ml-2 animate-spin" />}
            </AlertDialogAction>

            <div className="subtitle-2 mt-2 text-center text-light-100">Didn't get a code?
              <Button variant="link" type="button" className="pl-1 text-brand" onClick={handleResendOtp}>Click to resend</Button>
            </div>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

  )
}

export default OTPModel
