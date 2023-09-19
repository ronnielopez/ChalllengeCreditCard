import { Disclosure } from '@headlessui/react'
import { LockClosedIcon } from '@heroicons/react/24/outline'
import { useRef, useState } from 'react'
import {
    formatCreditCardNumber,
    formatCVC,
    formatExpirationDate,
} from '../../utils/utils';
import Card from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import axios from 'axios';
import Swal from 'sweetalert2';

const subtotal = '$70.00'
const discount = { code: 'STUDENT', amount: '$28.00' }
const taxes = '$0.00'
const shipping = '$8.00'
const total = '$50.00'
const products = [
    {
        id: 1,
        name: 'Micro Backpack',
        href: '#',
        price: '$70.00',
        color: 'Moss',
        size: '5L',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/checkout-page-04-product-01.jpg',
        imageAlt:
            'Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps.',
    },
    // More products...
]

export default function PaymentGateway(props) {
    const { handleClick } = props;
    const [state, setState] = useState({
        number: '',
        name: '',
        expiry: '',
        cvc: '',
        issuer: '',
        focused: '',
        formData: null,
    });
    const formRef = useRef(null);
    const { name, number, expiry, cvc, focused, issuer } = state;

    const handleCallback = ({ issuer }, isValid) => {
        setState({ ...state, issuer });
    };

    const handleInputFocus = ({ target }) => {
        setState({
            ...state,
            focused: target.name,
        });
    };

    const handleInputChange = ({ target }) => {
        let { name, value } = target;

        if (name === 'number') {
            value = formatCreditCardNumber(value);
        } else if (name === 'expiry') {
            value = formatExpirationDate(value);
        } else if (name === 'cvc') {
            value = formatCVC(value);
        }

        setState({ ...state, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            "cardNumber": number.split(' ').join(''),
            "cardHolderName": name,
            "month": expiry.split('/')[0],
            "year": "20" + expiry.split('/')[1],
            cvc,
            issuer
        }
        axios.post('http://localhost:8080/creditCard', data)
            .then((response) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Credit Card Success',
                    text: response.data.message,
                }).then(() => {
                    handleClick();
                })
            })
            .catch(({ response }) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Credit Card Error',
                    text: response.data.message,
                })
            })
    };


    const handleCardDisplay = () => {
        const rawText = [...number.split(' ').join('')] // Remove old space
        const creditCard = [] // Create card as array
        rawText.forEach((t, i) => {
            if (i % 4 === 0 && i !== 0) creditCard.push(' ') // Add space
            creditCard.push(t)
        })
        return creditCard.join('') // Transform card array to string
    }

    const handleExpirationDisplay = () => {
        const rawText = [...expiry.split(' ').join('/')] // Remove old space
        const creditCard = [] // Create card as array
        rawText.forEach((t, i) => {
            if (i % 2 === 0 && i !== 0) creditCard.push('') // Add space
            creditCard.push(t)
        })
        return creditCard.join('') // Transform card array to string
    }

    return (
        <>
            <div className="flex justify-center items-center">
                <div className="py-16 px-4 md:px-6 2xl:px-0 flex justify-center items-center 2xl:mx-auto 2xl:container">
                    <div className="flex flex-col justify-start items-start w-full space-y-9">
                        <div className="flex justify-start flex-col items-start space-y-2">
                            
                        </div>

                        <div className="flex flex-col xl:flex-row justify-center xl:justify-between space-y-6 xl:space-y-0 xl:space-x-6 w-full">
                            <div className="xl:w-3/5 flex flex-col sm:flex-row xl:flex-col justify-center items-center bg-gray-100 py-7 sm:py-0 xl:py-10 px-10 xl:w-full">
                                <div className="flex flex-col justify-start items-start w-full space-y-4">
                                    <p className="text-xl md:text-2xl leading-normal text-gray-800">Micro Backpack</p>
                                    <p className="text-base font-semibold leading-none text-gray-600">$50.00</p>
                                </div>
                                <div className="mt-6 sm:mt-0 xl:my-10 xl:px-20 w-52 sm:w-96 xl:w-auto">
                                    <img src="https://tailwindui.com/img/ecommerce-images/checkout-page-04-product-01.jpg" alt="headphones" />
                                </div>
                            </div>

                            <section
                                aria-labelledby="payment-heading"
                                className="flex-auto overflow-y-auto px-4 pt-12 pb-16 sm:px-6 sm:pt-16 lg:px-8 lg:pt-0 lg:pb-24"
                            >
                                <div className="max-w-lg mx-auto">
                                    <div className="hidden pt-10 pb-16 lg:flex">

                                    </div>

                                    <button
                                        type="button"
                                        className="w-full flex items-center justify-center bg-black border border-transparent text-white rounded-md py-2 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                                    >
                                        <span className="sr-only">Pay with Apple Pay</span>
                                        <svg className="h-5 w-auto" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 20">
                                            <path d="M9.536 2.579c-.571.675-1.485 1.208-2.4 1.132-.113-.914.334-1.884.858-2.484C8.565.533 9.564.038 10.374 0c.095.951-.276 1.884-.838 2.579zm.829 1.313c-1.324-.077-2.457.751-3.085.751-.638 0-1.6-.713-2.647-.694-1.362.019-2.628.79-3.323 2.017-1.429 2.455-.372 6.09 1.009 8.087.676.99 1.485 2.075 2.552 2.036 1.009-.038 1.409-.656 2.628-.656 1.228 0 1.58.656 2.647.637 1.104-.019 1.8-.99 2.475-1.979.771-1.122 1.086-2.217 1.105-2.274-.02-.019-2.133-.828-2.152-3.263-.02-2.036 1.666-3.007 1.742-3.064-.952-1.408-2.437-1.56-2.951-1.598zm7.645-2.76v14.834h2.305v-5.072h3.19c2.913 0 4.96-1.998 4.96-4.89 0-2.893-2.01-4.872-4.885-4.872h-5.57zm2.305 1.941h2.656c2 0 3.142 1.066 3.142 2.94 0 1.875-1.142 2.95-3.151 2.95h-2.647v-5.89zM32.673 16.08c1.448 0 2.79-.733 3.4-1.893h.047v1.779h2.133V8.582c0-2.14-1.714-3.52-4.351-3.52-2.447 0-4.256 1.399-4.323 3.32h2.076c.171-.913 1.018-1.512 2.18-1.512 1.41 0 2.2.656 2.2 1.865v.818l-2.876.171c-2.675.162-4.123 1.256-4.123 3.159 0 1.922 1.495 3.197 3.637 3.197zm.62-1.76c-1.229 0-2.01-.59-2.01-1.494 0-.933.752-1.475 2.19-1.56l2.562-.162v.837c0 1.39-1.181 2.379-2.743 2.379zM41.1 20c2.247 0 3.304-.856 4.227-3.454l4.047-11.341h-2.342l-2.714 8.763h-.047l-2.714-8.763h-2.409l3.904 10.799-.21.656c-.352 1.114-.923 1.542-1.942 1.542-.18 0-.533-.02-.676-.038v1.779c.133.038.705.057.876.057z" />
                                        </svg>
                                    </button>

                                    <div className="relative mt-8">
                                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                            <div className="w-full border-t border-gray-200" />
                                        </div>
                                        <div className="relative flex justify-center">
                                            <span className="px-4 bg-white text-sm font-medium text-gray-500">or</span>
                                        </div>
                                    </div>

                                    <form className="mt-6" ref={formRef} onSubmit={handleSubmit}>
                                        <div className="grid grid-cols-12 gap-y-6 gap-x-4">
                                            <div className="col-span-full">
                                                <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                                                    Email address
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        type="email"
                                                        id="email-address"
                                                        name="email-address"
                                                        autoComplete="email"
                                                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    />
                                                </div>
                                            </div>

                                            <Card
                                                number={number}
                                                name={name}
                                                expiry={expiry}
                                                cvc={cvc}
                                                focused={focused}
                                                callback={handleCallback}
                                            />
                                            <div className="col-span-full">
                                                <label htmlFor="name-on-card" className="block text-sm font-medium text-gray-700">
                                                    Name on card
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        type='text'
                                                        name='name'
                                                        placeholder='Name'
                                                        required
                                                        onChange={handleInputChange}
                                                        onFocus={handleInputFocus}
                                                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-span-full">
                                                <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">
                                                    Card number
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        type='tel'
                                                        name='number'
                                                        placeholder='Card Number'
                                                        maxLength={19}
                                                        value={handleCardDisplay()}
                                                        required
                                                        onChange={handleInputChange}
                                                        onFocus={handleInputFocus}
                                                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-span-8 sm:col-span-9">
                                                <label htmlFor="expiration-date" className="block text-sm font-medium text-gray-700">
                                                    Expiration date (MM/YY)
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        type='tel'
                                                        name='expiry'
                                                        placeholder='Expiration date'
                                                        pattern='\d\d/\d\d'
                                                        maxLength={5}
                                                        value={handleExpirationDisplay()}
                                                        required
                                                        onChange={handleInputChange}
                                                        onFocus={handleInputFocus}
                                                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-span-4 sm:col-span-3">
                                                <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">
                                                    CVC
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        type='tel'
                                                        name='cvc'
                                                        placeholder='CVC'
                                                        pattern='\d{3}'
                                                        required
                                                        maxLength={issuer === 'amex' ? 4 : 3}
                                                        onChange={handleInputChange}
                                                        onFocus={handleInputFocus}
                                                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    />
                                                </div>
                                            </div>
                                            <input type='hidden' name='issuer' value={state.issuer} />
                                            <div className="col-span-full">
                                                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                                    Address
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        type="text"
                                                        id="address"
                                                        name="address"
                                                        autoComplete="address-level2"
                                                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-span-full sm:col-span-4">
                                                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                                    City
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        type="text"
                                                        id="city"
                                                        name="city"
                                                        autoComplete="address-level2"
                                                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-span-full sm:col-span-4">
                                                <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                                                    State / Province
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        type="text"
                                                        id="region"
                                                        name="region"
                                                        autoComplete="address-level1"
                                                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-span-full sm:col-span-4">
                                                <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                                                    Postal code
                                                </label>
                                                <div className="mt-1">
                                                    <input
                                                        type="text"
                                                        id="postal-code"
                                                        name="postal-code"
                                                        autoComplete="postal-code"
                                                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-6 flex space-x-2">
                                            <div className="flex items-center h-5">
                                                <input
                                                    id="same-as-shipping"
                                                    name="same-as-shipping"
                                                    type="checkbox"
                                                    defaultChecked
                                                    className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                                />
                                            </div>
                                            <label htmlFor="same-as-shipping" className="text-sm font-medium text-gray-900">
                                                Billing address is the same as shipping address
                                            </label>
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full mt-6 bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Pay {total}
                                        </button>

                                        <p className="flex justify-center text-sm font-medium text-gray-500 mt-6">
                                            <LockClosedIcon className="w-5 h-5 text-gray-400 mr-1.5" aria-hidden="true" />
                                            Payment details stored in plain text
                                        </p>
                                    </form>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}