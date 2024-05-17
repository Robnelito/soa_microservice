/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import configs from '../../../config'

const Index = () => {
    const [payment, setPayment] = useState([]);
    const [dataChanged, setDataChanged] = useState(false);
    const [showDelModal, setShowDelModal] = useState(false);
    const [paymentId, setPaymentId] = useState(null);
    const [prenom, setPrenom] = useState(null);


    useEffect(() => {
        axios.get(`${configs.API_GATEWAY_URL}/payment/`).then((response) => {
            console.log(response.data);
            setPayment(response.data);
        }).catch((error) => {
            console.error(error);
        })
    }, [dataChanged]);

    function formatDate(inputDate) {
        const dateObj = new Date(inputDate);
        const day = dateObj.getDate();
        const month = dateObj.getMonth() + 1;
        const year = dateObj.getFullYear();

        const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;

        return formattedDate;
    }

    function formatHeure(inputDate) {
        const dateObj = new Date(inputDate);
        const localTime = dateObj.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
        return localTime;
    }

    const handleDelete = () => {
        axios.delete(`${configs.API_GATEWAY_URL}/payment/${paymentId}`).then((response) => {
            setDataChanged(!dataChanged);
        }).catch((error) => {
            console.error(error);
        })
    }

    const openDelModal = (payment) => {
        setShowDelModal(true);
        setPaymentId(payment);
    };

    const closeDelModal = () => {
        setShowDelModal(false);
        setPaymentId(null);
    };

    function nbr(a, b) {
        a = '' + a;
        b = b || ' ';
        var c = '',
            d = 0;
        while (a.match(/^0[0-9]/)) {
            a = a.substr(1);
        }
        for (var i = a.length - 1; i >= 0; i--) {
            c = (d !== 1 && d % 3 === 0) ? a[i] + b + c : a[i] + c;
            d++;
        }
        return c;
    }

    function nbr1(a, b) {
        a = '' + a;
        b = b || ' ';
        var c = '',
            d = 0;
        while (a.match(/^0[0-9]/)) {
            a = a.substr(1);
        }
        for (var i = a.length - 1; i >= 0; i--) {
            c = (d == 0 && d % 2 == 0) ? a[i] + b + c : a[i] + c;
            d++;
        }
        return c;
    }

    function nbr2(a, b) {
        a = '' + a;
        b = b || ' ';
        var c = '',
            d = 0;
        while (a.match(/^0[0-9]/)) {
            a = a.substr(1);
        }
        for (var i = a.length - 1; i >= 0; i--) {
            c = (d !== 0 && d % 5 === 0) ? a[i] + b + c : a[i] + c;
            d++;
        }
        return c;
    }

    return (
        <div className='relative mt-5'>
            <table className='table-fixed w-[100%] 2xl:w-[100%] border-separate'>
                <thead className='sticky top-0 z-10 space-x-8 bg-slate-600 h-[50px] place-items-center font-semibold px-4 rounded-md'>
                    <tr>
                        <th className='space-x-2 w-[50px] border border-slate-600 rounded-md text-slate-50 uppercase tracking-wider'>N°</th>
                        <th className='space-x-2 w-[300px] border border-slate-600 rounded-md text-slate-50 uppercase tracking-wider'>Numéros de compte</th>
                        <th className='space-x-2 w-[300px] border border-slate-600 rounded-md text-slate-50 uppercase tracking-wider'>Prénoms</th>
                        <th className='space-x-2 w-[200px] border border-slate-600 rounded-md text-slate-50 uppercase tracking-wider'>Somme (MGA)</th>
                        <th className='space-x-2 w-[150px] place-items-center border border-slate-600 rounded-md text-slate-50 uppercase tracking-wider'>Date</th>
                        <th className='space-x-2 w-[150px] place-items-center border border-slate-600 rounded-md text-slate-50 uppercase tracking-wider'>Heure</th>
                        <th className='space-x-2 w-[150px] place-items-center border border-slate-600 rounded-md text-slate-50 uppercase tracking-wider'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {payment.length > 0 && payment != null ? (
                        payment.map((payment, index) => (
                            <>
                                <tr className='z-1 w-[100%] space-x-8 h-[50px] place-items-center px-4 rounded-md'>
                                    <td className='text-center space-x-2 w-[300px] border border-slate-300 rounded-md space-y-4'>{index + 1}</td>
                                    <td className='text-center space-x-2 w-[300px] border border-slate-300 rounded-md space-y-4'>{nbr(nbr2(payment.accountNumberClient))}</td>
                                    <td className='text-center space-x-2 w-[300px] border border-slate-300 rounded-md space-y-4'>{payment.firstnameClient}</td>
                                    <td className='text-center space-x-2 w-[300px] border border-slate-300 rounded-md space-y-4'>{payment.montantVirement.toLocaleString("de-DE")}</td>
                                    <td className='text-center space-x-2 w-[300px] border border-slate-300 rounded-md space-y-4'>{formatDate(payment.dateVirement)}</td>
                                    <td className='text-center space-x-2 w-[300px] border border-slate-300 rounded-md space-y-4'>{formatHeure(payment.dateVirement)}</td>
                                    <td className='text-center space-x-2 w-[150px] border border-slate-300 rounded-md'>
                                        <div className='flex justify-center place-content-center space-x-2'>
                                            <button onClick={() => openDelModal(payment.idPaiement)} className="flex space-x-2 bg-red-500 hover:bg-yellowy-700 font-semibold py-2 px-4 rounded-lg">
                                                <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M3 6.38597C3 5.90152 3.34538 5.50879 3.77143 5.50879L6.43567 5.50832C6.96502 5.49306 7.43202 5.11033 7.61214 4.54412C7.61688 4.52923 7.62232 4.51087 7.64185 4.44424L7.75665 4.05256C7.8269 3.81241 7.8881 3.60318 7.97375 3.41617C8.31209 2.67736 8.93808 2.16432 9.66147 2.03297C9.84457 1.99972 10.0385 1.99986 10.2611 2.00002H13.7391C13.9617 1.99986 14.1556 1.99972 14.3387 2.03297C15.0621 2.16432 15.6881 2.67736 16.0264 3.41617C16.1121 3.60318 16.1733 3.81241 16.2435 4.05256L16.3583 4.44424C16.3778 4.51087 16.3833 4.52923 16.388 4.54412C16.5682 5.11033 17.1278 5.49353 17.6571 5.50879H20.2286C20.6546 5.50879 21 5.90152 21 6.38597C21 6.87043 20.6546 7.26316 20.2286 7.26316H3.77143C3.34538 7.26316 3 6.87043 3 6.38597Z" fill="#ffffff" />
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M9.42543 11.4815C9.83759 11.4381 10.2051 11.7547 10.2463 12.1885L10.7463 17.4517C10.7875 17.8855 10.4868 18.2724 10.0747 18.3158C9.66253 18.3592 9.29499 18.0426 9.25378 17.6088L8.75378 12.3456C8.71256 11.9118 9.01327 11.5249 9.42543 11.4815Z" fill="#ffffff" />
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M14.5747 11.4815C14.9868 11.5249 15.2875 11.9118 15.2463 12.3456L14.7463 17.6088C14.7051 18.0426 14.3376 18.3592 13.9254 18.3158C13.5133 18.2724 13.2126 17.8855 13.2538 17.4517L13.7538 12.1885C13.795 11.7547 14.1625 11.4381 14.5747 11.4815Z" fill="#ffffff" />
                                                    <path opacity="0.5" d="M11.5956 22.0001H12.4044C15.1871 22.0001 16.5785 22.0001 17.4831 21.1142C18.3878 20.2283 18.4803 18.7751 18.6654 15.8686L18.9321 11.6807C19.0326 10.1037 19.0828 9.31524 18.6289 8.81558C18.1751 8.31592 17.4087 8.31592 15.876 8.31592H8.12405C6.59127 8.31592 5.82488 8.31592 5.37105 8.81558C4.91722 9.31524 4.96744 10.1037 5.06788 11.6807L5.33459 15.8686C5.5197 18.7751 5.61225 20.2283 6.51689 21.1142C7.42153 22.0001 8.81289 22.0001 11.5956 22.0001Z" fill="#ffffff" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </>
                        ))
                    ) : (
                        <td colSpan={7} className='text-center border border-slate-300 p-3 rounded-md text-gray-600'>Aucune transaction</td>
                    )}
                </tbody>
            </table>

            {showDelModal && (
                <>
                    <div className="fixed inset-0 flex items-center justify-center h-screen z-55 bg-gray-800 bg-opacity-50">
                    </div>
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="flex justify-center items-center w-[30%]">
                            <div className='bg-white w-full p-6 space-y-4 rounded shadow-md shadow-[#26393D]'>
                                <h1 className='text-xl uppercase tracking-wide text-gray-900'>Suppression</h1>
                                <hr className='border border-gray-500 w-[60%] mx-auto' />
                                <p className='text-center text-lg'>Voulez-vous vraiment supprimer ?</p>
                                <hr className='border border-gray-500 w-[60%] mx-auto' />
                                <div className='space-x-2 flex justify-end'>
                                    <button className='bg-slate-300 text-gray-800 py-2 px-2 rounded transition-all duration-300 hover:scale-105' onClick={closeDelModal}>NON</button>
                                    <button className='bg-gray-700 text-white py-2 px-2 rounded transition-all duration-300 hover:scale-105' onClick={() => { handleDelete(), closeDelModal() }}>OUI</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default Index