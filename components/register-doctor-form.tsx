'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { doctorSignUpSchema, doctorSignUpType } from '@/lib/validations/doctor';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FormErrorMessage from './form-error-msg';
import FormSuccessMessage from './form-success-msg';
import MultipleSelector, { Option } from '@/components/ui/multiple-selector';

interface RegisterDoctorClientFormProps {
  specialties: Option[];
}

const OPTIONS: Option[] = [
  { label: 'nextjs', value: 'Nextjs' },
  { label: 'React', value: 'react' },
  { label: 'Remix', value: 'remix' },
  { label: 'Vite', value: 'vite' },
  { label: 'Nuxt', value: 'nuxt' },
  { label: 'Vue', value: 'vue' },
  { label: 'Svelte', value: 'svelte' },
  { label: 'Angular', value: 'angular' },
  { label: 'Ember', value: 'ember', disable: true },
  { label: 'Gatsby', value: 'gatsby', disable: true },
  { label: 'Astro', value: 'astro' },
];

export default function RegisterDoctorForm({ specialties }: RegisterDoctorClientFormProps) {
  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');

  const form = useForm<doctorSignUpType>({
    resolver: zodResolver(doctorSignUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'doctor',
      phone: '',
      doctorExperience: '',
      doctorSpecialties: [],
      doctorEducation: '',
    },
  });

  const {
    formState: { errors, isSubmitting },
    setError,
  } = form;

  const onSubmit = async (data: doctorSignUpType) => {
    const res = await fetch('/api/register/doctor', {
      method: 'POST',
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        phone: data.phone,
        doctorExperience: data.doctorExperience,
        doctorSpecialties: data.doctorSpecialties,
        doctorEducation: data.doctorEducation,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const resData = await res.json();

    if (!res.ok) {
      setErrorMsg('Something went wrong');
    } else {
      setSuccessMsg(resData.success); // Mensaje con success en su respuesta de api/register
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    }

    if (resData.errors) {
      const errors = resData.errors;

      if (errors.email) {
        setError('email', {
          type: 'server',
          message: errors.email,
        });
      } else if (errors.password) {
        setError('password', {
          type: 'server',
          message: errors.password,
        });
      } else if (errors.confirmPassword) {
        setError('confirmPassword', {
          type: 'server',
          message: errors.confirmPassword,
        });
      } else if (errors.phone) {
        setError('phone', {
          type: 'server',
          message: errors.phone,
        });
      } else if (errors.doctorExperience) {
        setError('doctorExperience', {
          type: 'server',
          message: errors.doctorExperience,
        });
      } else if (errors.doctorSpecialties) {
        setError('doctorSpecialties', {
          type: 'server',
          message: errors.doctorSpecialties,
        });
      } else if (errors.doctorEducation) {
        setError('doctorEducation', {
          type: 'server',
          message: errors.doctorEducation,
        });
      } else if (errors.limit) {
        setErrorMsg(errors.limit);
      } else {
        console.error('Registration failed');
      }
    }
  };

  return (
    <Card className='w-[32rem]'>
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>Welcome Doc!</CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                    <Input placeholder='John Doe' {...field} />
                  </FormControl>
                  <FormMessage className='text-[0.8rem]' /> {/* Form error */}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='doctorSpecialties'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Specialties</FormLabel>
                  <FormControl>
                    <MultipleSelector
                      {...field}
                      defaultOptions={specialties}
                      placeholder='Select your specialties'
                      badgeClassName='hover:bg-primary/90'
                      maxSelected={3}
                      hidePlaceholderWhenSelected={true}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='phone'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone number</FormLabel>
                  <FormControl>
                    <Input type='tel' placeholder='(212) 555-5555' {...field} />
                  </FormControl>
                  <FormMessage className='text-[0.8rem]' /> {/* Form error */}
                </FormItem>
              )}
            />

            <FormErrorMessage message={errorMsg} />
            <FormSuccessMessage message={successMsg} />
            <Button disabled={isSubmitting} type='submit'>
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

// * LAST STEP
// <FormField
//             control={form.control}
//             name='email'
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Email</FormLabel>
//                 <FormControl>
//                   <Input type='email' placeholder='jdoe@gmail.com' {...field} />
//                 </FormControl>
//                 <FormMessage className='text-[0.8rem]' /> {/* Form error */}
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name='password'
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Password</FormLabel>
//                 <FormControl>
//                   <Input type='password' placeholder='********' {...field} />
//                 </FormControl>
//                 <FormMessage className='text-[0.8rem]' /> {/* Form error */}
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name='confirmPassword'
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Confirm password</FormLabel>
//                 <FormControl>
//                   <Input type='password' placeholder='********' {...field} />
//                 </FormControl>
//                 <FormMessage className='text-[0.8rem]' /> {/* Form error */}
//               </FormItem>
//             )}
//           />
