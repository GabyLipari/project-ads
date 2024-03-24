  'use client'
   import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
   import { Label } from "@/components/ui/label"
   import { Input } from "@/components/ui/input"
   import { Button } from "@/components/ui/button"
   import { useForm } from "react-hook-form"
   import { signIn } from "next-auth/react"
   
   export function AuthForm() {
    const form = useForm()

    const handleSubmit = form.handleSubmit(async (data) => {
        console.log(data) 

        await signIn('nodemailer', { email: data.email })

    } )

     return (
       <Card className="w-full max-w-md mx-auto">
         <CardHeader className="text-center space-y-1">
           <CardTitle className="text-3xl">Magic Link</CardTitle>
           <CardDescription>Enter your email to sign in or create an account</CardDescription>
         </CardHeader>
         <CardContent className="space-y-4">
            <form onSubmit={handleSubmit}>
           <div className="space-y-2">
             <Label htmlFor="email">Email</Label>
             <Input id="email" placeholder="m@example.com" required type="email" {...form.register('email')} />
           </div>
           <Button className="w-full">Send Magic Link</Button>
           </form>
         </CardContent>
       </Card>
     )
   }
