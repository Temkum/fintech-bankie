'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import CustomInput from './CustomInput';
import { authFormSchema } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signIn, signUp } from '@/lib/actions/user.actions';

const AuthForm = ({ type }: { type?: string }) => {
  // 'use server';
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const formSchema = authFormSchema(type);
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      //TODO: register up with Appwrite and create plaid token
      if (type === 'signup') {
        const newUser = await signUp(data);
        //  set new user
        setUser(newUser);
      }

      //TODO: login with Appwrite and create plaid token
      if (type === 'sign-in') {
        const response = await signIn({
          email: data.email,
          password: data.password,
        });

        if (response) router.push('/');
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="mb-12 flex cursor-pointer items-center gap-2">
          <Image
            src="/icons/logo-black.png"
            alt="logo"
            width={40}
            height={40}
            className="size-[24px] max-xl:size-14"
          />
          <h1 className="sidebar-logo">Softech Bankie</h1>
        </Link>

        <div className="flex flex-col gap-1 md-gap-3">
          <h1 className="text-24 font-bold text-gray-700">
            {user ? 'Link Account' : type === 'sign-in' ? 'Sign In' : 'Sign Up'}
            <p className="text-16 font-normal text-gray-600">
              {user
                ? 'Link your account to get started.'
                : 'Create an account to get started.'}
            </p>
          </h1>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">{/* TODO: plaidlink */}</div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === 'signup' && (
                <>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="firstName"
                      label="First Name"
                      placeholder="Enter your first name"
                    />
                    <CustomInput
                      control={form.control}
                      name="lastName"
                      label="Last Name"
                      placeholder="Enter your last name"
                    />
                  </div>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="address"
                      label="Address"
                      placeholder="Enter your specific address"
                    />
                    <CustomInput
                      control={form.control}
                      name="state"
                      label="State"
                      placeholder="Ex. SW"
                    />
                  </div>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="postalCode"
                      label="Postal Code"
                      placeholder="Ex. 00237"
                    />
                    <CustomInput
                      control={form.control}
                      name="dateOfBirth"
                      label="Date of Birth"
                      placeholder="Year, Month, Day"
                    />
                  </div>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="ssn"
                      label="SSN"
                      placeholder="Year, Month, Day"
                    />
                    <CustomInput
                      control={form.control}
                      name="city"
                      label="City"
                      placeholder="Enter your city"
                    />
                  </div>
                </>
              )}
              <CustomInput
                control={form.control}
                name="email"
                label="Email"
                placeholder="Enter your email"
              />
              <CustomInput
                control={form.control}
                name="password"
                label="Password"
                placeholder="Enter your password"
              />
              <div className="flex flex-col gap-4">
                <Button type="submit" className="form-btn" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> &nbsp;
                      Loading...
                    </>
                  ) : type === 'sign-in' ? (
                    'Sign in'
                  ) : (
                    'Register'
                  )}
                </Button>
              </div>
            </form>
          </Form>

          <footer className="flex justify-center gap-1 align-items-center">
            <p className="text-16 font-normal text-gray-600">
              {type === 'sign-in'
                ? "Don't have an account"
                : 'Already have an account?'}
            </p>
            <Link
              href={type === 'sign-in' ? '/signup' : '/sign-in'}
              className="form-link"
            >
              {type === 'sign-in' ? 'Sign up' : 'Sign in'}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
