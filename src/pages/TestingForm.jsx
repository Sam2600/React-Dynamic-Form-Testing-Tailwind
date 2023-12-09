/* eslint-disable no-unused-vars */
import { useFieldArray, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { axiosClient } from "../axios/axiosClient";

export const TestingForm = () => {

    // UseForm hook 
    const { register, formState: { errors }, control, handleSubmit } = useForm({

        /**
         *  This is normal default Values
         * 
         *  defaultValues: {
         *      email: "sam@gmail.com",
         *      password: ""
         *  }
         */

        // This is how we fetch previous data in form load
        defaultValues: async () => {

            const response = await axiosClient.get("/me");
            const data = await response.data?.data;

            return {
                email: data.email,
                password: "",
                social: {
                    facebook: "",
                    twiter: ""
                },
                // phones: ["", ""],
                phoneNumbers: []
            }
        }

    });

    // Preparing for dynamic field array with the hook
    const { fields, append, remove, insert } = useFieldArray({
        name: 'phoneNumbers', // This is like registering which field is gonna used as dynamic field
        control
    });

    // Dynamic field array for Phone Number
    let phoneNumbers = fields.length === 0

        ? <div className="text-md text-yellow-500">There is no phone numbers yet!</div>

        : fields.map((field, index) => (

            <div className="mb-5" key={field.id}> {/** important to include key with field's id */}
                <div className="flex flex-row justify-between items-center px-1">

                    {/** Label */}
                    <div className="w-4/12">
                        <label htmlFor="primaryPh" className="block text-md font-medium leading-6 text-gray-900">
                            Phone number {index + 1}
                        </label>
                    </div>

                    {/** Add and remove buttons for each dynamic field */}
                    <div className="flex flex-row justify-between gap-x-3">
                        <button
                            type="button"
                            className="flex justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={() => insert(index + 1, { number: '' })}
                        >
                            +
                        </button>
                        <button
                            type="button"
                            className="flex justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={() => remove(index)}
                        >
                            -
                        </button>
                    </div>
                    {/** Add and remove buttons for each dynamic field */}

                </div>

                {/** Input Field for Dynamic fields array */}
                <div className="mt-1">
                    <input
                        id="primaryPh"
                        type="text"
                        {...register(`phoneNumbers.${field.id}.number`, {
                            required: {
                                value: true,
                                message: "Phone number is required"
                            }
                        })}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <p className="text-red-500">{errors?.phoneNumbers?.[field.id]?.number.message}</p>
                </div>
            </div >

        ));

    const onSubmit = (data) => {
        console.log(data)
    }

    /**
     *  This is bad code and so many, should not use like this
     *  const { name, ref, onChange, onBlur } = register("email");
     */

    return (
        <>
            {/** To Investigate the dynamic field array validation message bug */}

            < div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8" >

                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Test your form here
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

                    <form className="space-y-6" method="POST" onSubmit={handleSubmit(onSubmit)}>

                        {/** Email Address */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    type="text"
                                    {...register("email",
                                        {
                                            required: {
                                                value: true,
                                                message: "Email is required"
                                            },

                                            pattern: {
                                                value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                                message: "Please enter a valid email format"
                                            },

                                            /** 
                                             *  This is single validation rule
                                             *  validate: (fieldValue) => {
                                             *      return fieldValue !== "admin@gmail.com" || "Please try with different email address"
                                             *  }
                                             */

                                            validate: { // This is for multiple input validation rule
                                                notAdmin: (value) => value !== "admin@gmail.com" || "Please try with different email",
                                                badDomain: (value) => !value.endsWith("customMail.com") || "Bad domain for email"
                                            }

                                        })}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <p className="text-red-500">{errors?.email?.message}</p>
                            </div>
                        </div>
                        {/** Email Address */}

                        {/** Password */}
                        <div className="mb-5">
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    type="password"
                                    {...register("password",
                                        {
                                            required: {
                                                value: true,
                                                message: "Password is required"
                                            }
                                        })}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <p className="text-red-500">{errors?.password?.message}</p>
                            </div>
                        </div>
                        {/** Password */}

                        {/** Socials */}
                        <div>
                            <div className="mt-5">
                                <label htmlFor="facebook" className="block text-sm font-medium leading-6 text-gray-900">
                                    Facebook
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="facebook"
                                        type="text"
                                        {...register("social.facebook",
                                            {
                                                required: {
                                                    value: true,
                                                    message: "Facebook is required"
                                                },

                                                validate: {
                                                    notFacebook: (value) => value.endsWith("facebook.com") || "Please fill the valid facebook account"
                                                }
                                            })}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    <p className="text-red-500">{errors?.social?.facebook?.message}</p>
                                </div>
                            </div>

                            <div className="mt-5">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Twitter
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="twitter"
                                        type="text"
                                        {...register("social.twiter",
                                            {
                                                required: {
                                                    value: true,
                                                    message: "Twitter is required"
                                                },
                                                validate: {
                                                    notTwitter: (value) => value.endsWith("twitter.com") || "Please fill the valide twitter account"
                                                }
                                            })}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    <p className="text-red-500">{errors?.social?.twiter?.message}</p>
                                </div>
                            </div>
                        </div>
                        {/** Socials */}

                        {/** This is also array of phones but stupid way */}
                        {/* <div>
                            <div className="mt-5">
                                <label htmlFor="primaryPh" className="block text-sm font-medium leading-6 text-gray-900">
                                    Primary phone number
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="primaryPh"
                                        type="text"
                                        {...register("phones.0",
                                            {
                                                required: {
                                                    value: true,
                                                    message: "Phone number is required"
                                                },

                                                validate: {
                                                    notPhone: (value) => value.startsWith("09") || "Please fill the valid phone number"
                                                }
                                            })}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    <p className="text-red-500">{errors?.phones?.[0].message}</p>
                                </div>
                            </div>

                            <div className="mt-5">
                                <label htmlFor="secondaryPh" className="block text-sm font-medium leading-6 text-gray-900">
                                    Seconday phone number
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="secondaryPh"
                                        type="text"
                                        {...register("phones.1",
                                            {
                                                required: {
                                                    value: true,
                                                    message: "Secondary phone number is required"
                                                },

                                                validate: {
                                                    notPhone: (value) => value.startsWith("09") || "Please fill the valid phone number"
                                                }
                                            })}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    <p className="text-red-500">{errors?.phones?.[1].message}</p>
                                </div>
                            </div>
                        </div> */}
                        {/** This is also array of phones but stupid way */}

                        {/** Phones */}
                        <div>

                            {/** Add and Remove buttons */}
                            <div className="flex flex-row justify-between">
                                <button
                                    type="button"
                                    className="w-3/12 rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    onClick={() => {
                                        append({ number: null })
                                    }}
                                >
                                    Phone +
                                </button>

                                {/** If phone number fields exists, remove button appears, if not it won't! */}
                                {
                                    fields.length ?
                                        (<button
                                            type="button"
                                            className="w-3/12 rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                remove()
                                            }}
                                        >
                                            Phone -
                                        </button>)
                                        : ""
                                }

                            </div>
                            {/** Add and Remove buttons */}

                            <div className="mt-5">
                                {phoneNumbers}
                            </div>

                        </div>
                        {/** Phones */}

                        {/** Submit Button */}
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Submit
                            </button>
                        </div>
                        {/** Submit Button */}

                    </form>

                    <DevTool control={control} />

                </div >
            </ div>
        </>
    )
}