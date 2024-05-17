/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import configs from '../../../config'
import { Toaster, toast } from 'sonner'

const Index = () => {
    const [clients, setClient] = useState([]);
    const [search, setSearch] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDelModal, setShowDelModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showCashModal, setShowCashModal] = useState(false);
    const [dataChanged, setDataChanged] = useState(false);
    const [clientId, setClientId] = useState(null);
    const [numeroAccount, setNumeroAccount] = useState(null);

    const initialFormState = {
        lastnameClient: '',
        firstnameClient: '',
        mailClient: '',
        phoneNumberClient: '',
        addressClient: '',
        remnantsClient: ''
    }

    const initialFormVirementState = {
        virement: '',
        accountNumberClient: ''
    }

    const [formData, setFormData] = useState(initialFormState);
    const [formDataVirement, setFormDataVirement] = useState(initialFormVirementState);
    const [errors, setErrors] = useState({});

    const openAddModal = () => {
        setShowAddModal(true);
    };

    const closeAddModal = () => {
        setShowAddModal(false);
    };

    const openDelModal = (client) => {
        setShowDelModal(true);
    };

    const closeDelModal = () => {
        setShowDelModal(false);
    };

    const openEditModal = (client) => {
        setClientId(client.idClient);
        setFormData({
            lastnameClient: client.lastnameClient,
            firstnameClient: client.firstnameClient,
            mailClient: client.mailClient,
            phoneNumberClient: client.phoneNumberClient,
            addressClient: client.addressClient,
            remnantsClient: client.remnantsClient
        });
        setShowEditModal(true);
    };

    const closeEditModal = () => {
        setShowEditModal(false);
    };

    const openCashModal = (client) => {
        setShowCashModal(true);
        setNumeroAccount(client)
        console.log(client)
    };

    const closeCashModal = () => {
        setShowCashModal(false);
    };

    useEffect(() => {
        axios.get(`${configs.API_GATEWAY_URL}/client/`).then((response) => {
            console.log(response.data);
            setClient(response.data);
        }).catch((error) => {
            console.error(error);
        })
    }, [dataChanged]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleChangeVirement = (e) => {

        setFormDataVirement({
            ...formDataVirement,
            ['virement']: e.target.value,
            ['accountNumberClient']: numeroAccount
        });
    }

    const handleSubmitVirement = async (e) => {
        e.preventDefault();

        if (!validateFormVirement()) {
            return;
        }

        await axios.post(`${configs.API_GATEWAY_URL}/payment/updateSoldeClient`, formDataVirement).then((response) => {
            setFormDataVirement(initialFormVirementState);
            closeCashModal();
            setDataChanged(!dataChanged);
            toast.success('Le solde du client vient d\'être modifié !');
        }).catch((error) => {
            console.error(error);
            alert(error);
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        await axios.post(`${configs.API_GATEWAY_URL}/client/`, formData).then((response) => {
            setFormData(initialFormState);
            closeAddModal();
            setClient([...clients, response.data]);
            toast.success('Client ajouté avec succès !');
        }).catch((error) => {
            console.error(error);
            alert(error);
        })
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`${configs.API_GATEWAY_URL}/client/${clientId}`, formData)
            .then((response) => {
                setFormData(initialFormState);
                setClient([...clients]);
                setDataChanged(!dataChanged);
                closeEditModal();
                toast.success('Client modifié avec succès !');
            })
            .catch((error) => {
                console.error(error);
                alert(error);
            });
        };
        
        const handleDelete = (clientId) => {
            axios.delete(`${configs.API_GATEWAY_URL}/client/${clientId}`).then(() => {
                setClient(clients.filter(client => client.idClient !== clientId));
                toast.success('Client supprimé avec succès !');
        }).catch((error) => {
            console.error(error);
        })
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

    const validateForm = () => {
        const errors = {};
        if (!formData.firstnameClient.trim()) {
            errors.firstnameClient = 'Le prénom est requis';
        }
        if (!formData.lastnameClient.trim()) {
            errors.lastnameClient = 'Le nom est requis';
        }
        if (!formData.mailClient.trim()) {
            errors.mailClient = 'L\'adresse e-mail est requise';
        } else if (!isValidEmail(formData.mailClient)) {
            errors.mailClient = 'L\'adresse e-mail n\'est pas valide';
        }
        if (!formData.phoneNumberClient.trim()) {
            errors.phoneNumberClient = 'Le numéro de téléphone est requis';
        }
        if (!formData.addressClient.trim()) {
            errors.addressClient = 'L\'adresse est requise';
        }
        if (!formData.remnantsClient.trim()) {
            errors.remnantsClient = 'Le solde est requise';
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const validateFormVirement = () => {
        const errors = {};
        if (!formDataVirement.virement.trim()) {
            errors.virement = 'La somme est requise';
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    return (
        <>
            <div className='space-x-2 pb-2 flex justify-between'>
                <span className='uppercase'>Liste des clients</span>
                <div className='space-x-2'>
                    <input type="text" className="border border-slate-600 rounded py-2 px-4 w-96" placeholder="Faites votre recherche ici..." onChange={(e) => setSearch(e.target.value)} autocomplete="off" />
                    <button className='py-2 px-4 bg-gradient-to-br from-gray-600 via-gray-500 to-gray-600 rounded text-white' onClick={openAddModal}>Ajouter</button>
                </div>
            </div>
            {showAddModal && (
                <>
                    <div className="fixed inset-0 flex items-center justify-center h-screen z-50 bg-gray-800 bg-opacity-50">
                    </div>
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="flex justify-center items-center w-[40%]">
                            <form onSubmit={handleSubmit} className="space-y-2 bg-[#fff] p-10 w-full rounded shadow-md shadow-[#26393D]">
                                <div className='grid grid-cols-2 gap-2 justify-between'>
                                    <div className='flex flex-col w-full'>
                                        <label htmlFor="lastnameClient">Nom:</label>
                                        <input type="text" name="lastnameClient" placeholder="Nom" className='border border-gray-600 p-2 rounded w-full focus:ring-1 focus:ring-gray-700' value={formData.lastnameClient} onChange={handleChange} autoComplete='off' />
                                        {errors.lastnameClient && <span className="text-red-600">{errors.lastnameClient}</span>}
                                    </div>
                                    <div className='flex flex-col w-full'>
                                        <label htmlFor="firstnameClientClient">Prénom:</label>
                                        <input type="text" name="firstnameClient" placeholder="Prénom" className='border border-gray-600 p-2 rounded w-full focus:ring-1 focus:ring-gray-700' value={formData.firstnameClient} onChange={handleChange} autoComplete='off' />
                                        {errors.firstnameClient && <span className="text-red-600">{errors.firstnameClient}</span>}
                                    </div>
                                    <div className='flex flex-col w-full'>
                                        <label htmlFor="mailClient">Adresse e-mail:</label>
                                        <input type="email" name="mailClient" placeholder="exemple@mail.com" className='border border-gray-600 p-2 rounded w-full focus:ring-1 focus:ring-gray-700' value={formData.mailClient} onChange={handleChange} autoComplete='off' />
                                        {errors.mailClient && <span className="text-red-600">{errors.mailClient}</span>}
                                    </div>
                                    <div className='flex flex-col w-full'>
                                        <label htmlFor="phoneNumberClient">Numéro de téléhone:</label>
                                        <div className='flex items-center'>
                                            <span className='p-2 border border-slate-300 rounded-l bg-slate-200 text-slate-800'>+261</span>
                                            <input type="text" name="phoneNumberClient" placeholder="3X XX XXX XX" className='border border-gray-600 p-2 rounded-r w-full focus:ring-1 focus:ring-gray-700' maxLength={9} value={formData.phoneNumberClient} onChange={handleChange} autoComplete='off' />
                                        </div>
                                        {errors.phoneNumberClient && <span className="text-red-600">{errors.phoneNumberClient}</span>}
                                    </div>
                                    <div className='flex flex-col w-full'>
                                        <label htmlFor="lastnameClient">Adresse:</label>
                                        <input type="text" name="addressClient" placeholder="Adresse" className='border border-gray-600 p-2 rounded w-full focus:ring-1 focus:ring-gray-700' value={formData.addressClient} onChange={handleChange} autoComplete='off' />
                                        {errors.addressClient && <span className="text-red-600">{errors.addressClient}</span>}
                                    </div>
                                    <div className='flex flex-col w-full'>
                                        <label htmlFor="lastnameClient">Solde:</label>
                                        <input type="text" name="remnantsClient" placeholder="Solde" className='border border-gray-600 p-2 rounded w-full focus:ring-1 focus:ring-gray-700' value={formData.remnantsClient} onChange={handleChange} autoComplete='off' />
                                        {errors.remnantsClient && <span className="text-red-600">{errors.remnantsClient}</span>}
                                    </div>
                                </div>
                                <div className='flex justify-end space-x-2'>
                                    <button className='bg-slate-300 text-gray-800 py-2 px-2 rounded transition-all duration-300 hover:scale-105' onClick={closeAddModal}>Annuler</button>
                                    <button type="submit" className='bg-gray-700 text-white py-2 px-2 rounded transition-all duration-300 hover:scale-105'>Valider</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            )}
            <div className='flex flex-wrap justify-center gap-4'>
                {
                    clients && clients.filter((index) => {
                        return search.toLowerCase() === ''
                            ? index
                            : index.lastnameClient.toLowerCase().includes(search) ||
                            index.firstnameClient.toLowerCase().includes(search);
                    }).map((content) => (
                        <React.Fragment key={content.idClient}>
                            <div className="bg-gradient-to-br from-gray-800 via-gray-600 to-gray-800 w-80 h-48 p-4 rounded-md shadow shadow-slate-600 transition-all duration-200 hover:scale-105 *:text-white">
                                <div className="space-y-1">
                                    <div className='flex justify-between'>
                                        <div className='space-x-1'>
                                            <button className='hover:bg-green-600 rounded-full p-1 shadow-inner shadow-slate-500' onClick={() => openEditModal(content)} title='Modifier'>
                                                <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                                    <g id="SVGRepo_iconCarrier">
                                                        <path d="M18.9445 9.1875L14.9445 5.1875M18.9445 9.1875L13.946 14.1859C13.2873 14.8446 12.4878 15.3646 11.5699 15.5229C10.6431 15.6828 9.49294 15.736 8.94444 15.1875C8.39595 14.639 8.44915 13.4888 8.609 12.562C8.76731 11.6441 9.28735 10.8446 9.946 10.1859L14.9445 5.1875M18.9445 9.1875C18.9445 9.1875 21.9444 6.1875 19.9444 4.1875C17.9444 2.1875 14.9445 5.1875 14.9445 5.1875M20.5 12C20.5 18.5 18.5 20.5 12 20.5C5.5 20.5 3.5 18.5 3.5 12C3.5 5.5 5.5 3.5 12 3.5" stroke="#ccc" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                    </g>
                                                </svg>
                                            </button>
                                            <button className='hover:bg-red-600 rounded-full p-1 shadow-inner shadow-slate-500' onClick={() => openDelModal(content.idClient)} title='Supprimer'>
                                                <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                                    <g id="SVGRepo_iconCarrier">
                                                        <path d="M14 9.5C14 9.5 14.5 10.5 14.5 12.5C14.5 14.5 14 15.5 14 15.5M10 9.5C10 9.5 9.5 10.5 9.5 12.5C9.5 14.5 10 15.5 10 15.5M5.99999 6C5.99999 11.8587 4.63107 20 12 20C19.3689 20 18 11.8587 18 6M4 6H20M15 6V5C15 3.22496 13.3627 3 12 3C10.6373 3 9 3.22496 9 5V6" stroke="#ccc" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                    </g>
                                                </svg>
                                            </button>
                                            <button className='hover:bg-yellow-600 rounded-full p-1 shadow-inner shadow-slate-500' onClick={() => openCashModal(content.accountNumberClient)} title='Payer'>
                                                <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                                    <g id="SVGRepo_iconCarrier">
                                                        <path d="M12 16H13C13.6667 16 15 15.6 15 14C15 12.4 13.6667 12 13 12H11C10.3333 12 9 11.6 9 10C9 8.4 10.3333 8 11 8H12M12 16H9M12 16V18M15 8H12M12 8V6M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#ccc" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                    </g>
                                                </svg>
                                            </button>
                                        </div>
                                        <div className='flex justify-end flex-col'>
                                            <p className="flex justify-end">+261 {nbr(nbr1(nbr2(content.phoneNumberClient)))}</p>
                                            <p className="flex justify-end">{content.remnantsClient.toLocaleString("de-DE")} MGA</p>
                                        </div>
                                    </div>
                                    <div className='flex justify-between px-6 items-center'>
                                        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 50 50" xmlSpace="preserve">
                                            <image id="image0" width="50" height="50" x="0" y="0" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAB6VBMVEUAAACNcTiVeUKVeUOYfEaafEeUeUSYfEWZfEaykleyklaXe0SWekSZZjOYfEWYe0WXfUWXe0WcgEicfkiXe0SVekSXekSWekKYe0a9nF67m12ZfUWUeEaXfESVekOdgEmVeUWWekSniU+VeUKVeUOrjFKYfEWliE6WeESZe0GSe0WYfES7ml2Xe0WXeESUeEOWfEWcf0eWfESXe0SXfEWYekSVeUKXfEWxklawkVaZfEWWekOUekOWekSYfESZe0eXekWYfEWZe0WZe0eVeUSWeETAnmDCoWLJpmbxy4P1zoXwyoLIpWbjvXjivnjgu3bfu3beunWvkFWxkle/nmDivXiWekTnwXvkwHrCoWOuj1SXe0TEo2TDo2PlwHratnKZfEbQrWvPrWuafUfbt3PJp2agg0v0zYX0zYSfgkvKp2frxX7mwHrlv3rsxn/yzIPgvHfduXWXe0XuyIDzzISsjVO1lVm0lFitjVPzzIPqxX7duna0lVncuHTLqGjvyIHeuXXxyYGZfUayk1iyk1e2lln1zYTEomO2llrbtnOafkjFpGSbfkfZtXLhvHfkv3nqxH3mwXujhU3KqWizlFilh06khk2fgkqsjlPHpWXJp2erjVOhg0yWe0SliE+XekShhEvAn2D///+gx8TWAAAARnRSTlMACVCTtsRl7Pv7+vxkBab7pZv5+ZlL/UnU/f3SJCVe+Fx39naA9/75XSMh0/3SSkia+pil/KRj7Pr662JPkrbP7OLQ0JFOijI1MwAAAAFiS0dEorDd34wAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfnAg0IDx2lsiuJAAACLElEQVRIx2NgGAXkAUYmZhZWPICFmYkRVQcbOwenmzse4MbFzc6DpIGXj8PD04sA8PbhF+CFaxEU8iWkAQT8hEVgOkTF/InR4eUVICYO1SIhCRMLDAoKDvFDVhUaEhwUFAjjSUlDdMiEhcOEItzdI6OiYxA6YqODIt3dI2DcuDBZsBY5eVTr4xMSYcyk5BRUOXkFsBZFJTQnp6alQxgZmVloUkrKYC0qqmji2WE5EEZuWB6alKoKdi35YQUQRkFYPpFaCouKIYzi6EDitJSUlsGY5RWVRGjJLyxNy4ZxqtIqqvOxaVELQwZFZdkIJVU1RSiSalAt6rUwUBdWG1CP6pT6gNqwOrgCdQyHNYR5YQFhDXj8MiK1IAeyN6aORiyBjByVTc0FqBoKWpqwRCVSgilOaY2OaUPw29qjOzqLvTAchpos47u6EZyYnngUSRwpuTe6D+6qaFQdOPNLRzOM1dzhRZyW+CZouHk3dWLXglFcFIflQhj9YWjJGlZcaKAVSvjyPrRQ0oQVKDAQHlYFYUwIm4gqExGmBSkutaVQJeomwViTJqPK6OhCy2Q9sQBk8cY0DxjTJw0lAQWK6cOKfgNhpKK7ZMpUeF3jPa28BCETamiEqJKM+X1gxvWXpoUjVIVPnwErw71nmpgiqiQGBjNzbgs3j1nus+fMndc+Cwm0T52/oNR9lsdCS24ra7Tq1cbWjpXV3sHRCb1idXZ0sGdltXNxRateRwHRAACYHutzk/2I5QAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMy0wMi0xM1QwODoxNToyOSswMDowMEUnN7UAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjMtMDItMTNUMDg6MTU6MjkrMDA6MDA0eo8JAAAAKHRFWHRkYXRlOnRpbWVzdGFtcAAyMDIzLTAyLTEzVDA4OjE1OjI5KzAwOjAwY2+u1gAAAABJRU5ErkJggg=="></image>
                                        </svg>
                                        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="25px" height="25px" viewBox="0 0 50 50" xmlSpace="preserve">
                                            <image id="image0" width="50" height="50" x="0" y="0" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAQAAAC0NkA6AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfnAg0IEzgIwaKTAAADDklEQVRYw+1XS0iUURQ+f5qPyjQflGRFEEFK76koKGxRbWyVVLSOgsCgwjZBJJYuKogSIoOonUK4q3U0WVBWFPZYiIE6kuArG3VGzK/FfPeMM/MLt99/NuHdfPd888/57jn3nvsQWWj/VcMlvMMd5KRTogqx9iCdIjUUmcGR9ImUYowyP3xNGQJoRLVaZ2DaZf8kyjEJALhI28ELioyiwC+Rc3QZwRYyO/DH51hQgWm6DMIh10KmD4u9O16K49itVoPOAmcGAWWOepXIRScAoJZ2Frro8oN+EyTT6lWkkg6msZfMSR35QTJmjU0g15tIGSJ08ZZMJkJkHpNZgSkyXosS13TkJpZ62mPIJvOSzC1bp8vRhhCakEk7G9/o4gmZdbpsTcKu0m63FbnBP9Qrc15zbkbemfgNDtEOI8NO5L5O9VYyRYgmJayZ9nPaxZrSjW4+F6Uw9yQqIiIZwhp2huQTf6OIvCZyGM6gDJBZbyXifJXr7FZjGXsdxADxI7HUJFB6iWvsIhFpkoiIiGTJfjJfiCuJg2ZEspq9EHGVpYgzKqwJqSAOEwuJQ/pxPvE3cYltJCLdxBLiSKKIE5HxJKcTRNeadxfhDiuYw44zVs1dxKwRk/uCxIiQkxKBsSctRVAge9g1E15EHE6yRUaJecRxcWlukdRIbGFOSZCMWQA/iWauIP3slREHXPyliqBcrrD71AmzZ+rD1Mt2Yr8TZc/UR4/YtFnbijnHi3UrN9vKQ9rPaJf867ZiaqDB+czeKYmd3pNa6fuI75MiC0uXXSR5aEMf7s7a6r/PudVXkjFb/SsrCRfROk0Fx6+H1i9kkTGn/E1vEmt1m089fh+RKdQ5O+xNJPUicUIjO0Dm7HwvErEr0YxeibL1StSh37STafE4I7zcBdRq1DiOkdmlTJVnkQTBTS7X1FYyvfO4piaInKbDCDaT2anLudYXCRFsQBgAcIF2/Okwgvz5+Z4tsw118dzruvIvjhTB+HOuWy8UvovEH6beitBKxDyxm9MmISKCWrzB7bSlaqGlsf0FC0gMjzTg6GgAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjMtMDItMTNUMDg6MTk6NTYrMDA6MDCjlq7LAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIzLTAyLTEzVDA4OjE5OjU2KzAwOjAw0ssWdwAAACh0RVh0ZGF0ZTp0aW1lc3RhbXAAMjAyMy0wMi0xM1QwODoxOTo1NiswMDowMIXeN6gAAAAASUVORK5CYII="></image>
                                        </svg>
                                    </div>
                                    <p className="flex justify-start pl-4">{nbr(nbr2(content.accountNumberClient))}</p>
                                    <div className='flex justify-between px-4 items-center'>
                                        <p className="text-md">{content.lastnameClient.toUpperCase()} {content.firstnameClient}</p>
                                        <svg className="" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="36" height="36" viewBox="0 0 48 48">
                                            <path fill="#ff9800" d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z"></path>
                                            <path fill="#d50000" d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z"></path>
                                            <path fill="#ff3d00" d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
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
                                                    <button className='bg-gray-700 text-white py-2 px-2 rounded transition-all duration-300 hover:scale-105' onClick={() => { handleDelete(content.idClient), closeDelModal() }}>OUI</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                            {showEditModal && (
                                <>
                                    <div className="fixed inset-0 flex items-center justify-center h-screen z-50 bg-gray-800 bg-opacity-50">
                                    </div>
                                    <div className="fixed inset-0 flex items-center justify-center z-50">
                                        <div className="flex justify-center items-center w-[40%]">
                                            <form onSubmit={handleEditSubmit} className="space-y-2 bg-[#fff] p-10 w-full rounded shadow-md shadow-[#26393D]">
                                                <div className='grid grid-cols-2 gap-2 justify-between'>
                                                    <div className='flex flex-col w-full'>
                                                        <label htmlFor="lastnameClient">Nom:</label>
                                                        <input type="text" name="lastnameClient" placeholder="Nom" className='border border-gray-600 p-2 rounded w-full focus:ring-1 focus:ring-gray-700' value={formData.lastnameClient} onChange={handleChange} autoComplete='off' />
                                                    </div>
                                                    <div className='flex flex-col w-full'>
                                                        <label htmlFor="firstnameClientClient">Prénom:</label>
                                                        <input type="text" name="firstnameClient" placeholder="Prénom" className='border border-gray-600 p-2 rounded w-full focus:ring-1 focus:ring-gray-700' value={formData.firstnameClient} onChange={handleChange} autoComplete='off' />
                                                    </div>
                                                    <div className='flex flex-col w-full'>
                                                        <label htmlFor="mailClient">Adresse e-mail:</label>
                                                        <input type="email" name="mailClient" placeholder="exemple@mail.com" className='border border-gray-600 p-2 rounded w-full focus:ring-1 focus:ring-gray-700' value={formData.mailClient} onChange={handleChange} autoComplete='off' />
                                                    </div>
                                                    <div className='flex flex-col w-full'>
                                                        <label htmlFor="phoneNumberClient">Numéro de téléhone:</label>
                                                        <div className='flex items-center'>
                                                            <span className='p-2 border border-slate-300 rounded-l bg-slate-200 text-slate-800'>+261</span>
                                                            <input type="text" name="phoneNumberClient" placeholder="3X XX XXX XX" className='border border-gray-600 p-2 rounded-r w-full focus:ring-1 focus:ring-gray-700' maxLength={9} value={formData.phoneNumberClient} onChange={handleChange} autoComplete='off' />
                                                        </div>
                                                    </div>
                                                    <div className='flex flex-col w-full'>
                                                        <label htmlFor="lastnameClient">Adresse:</label>
                                                        <input type="text" name="addressClient" placeholder="Adresse" className='border border-gray-600 p-2 rounded w-full focus:ring-1 focus:ring-gray-700' value={formData.addressClient} onChange={handleChange} autoComplete='off' />
                                                    </div>
                                                </div>
                                                <div className='flex justify-end space-x-2'>
                                                    <button className='bg-slate-300 text-gray-800 py-2 px-2 rounded transition-all duration-300 hover:scale-105' onClick={closeEditModal}>Annuler</button>
                                                    <button type="submit" className='bg-gray-700 text-white py-2 px-2 rounded transition-all duration-300 hover:scale-105'>Valider</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </>
                            )}
                            {showCashModal && (
                                <>
                                    <div className="fixed inset-0 flex items-center justify-center h-screen z-50 bg-gray-800 bg-opacity-50">
                                    </div>
                                    <div className="fixed inset-0 flex items-center justify-center z-50">
                                        <div className="flex justify-center items-center w-[40%]">
                                            <div className="space-y-2 bg-[#fff] p-10 w-full rounded shadow-md shadow-[#26393D]">
                                                <span className='font-bold'>Paiement</span>
                                                <hr />
                                                <div className='space-y-2'>
                                                    <label htmlFor="virement">Somme à verser : </label>
                                                    <input
                                                        type="text"
                                                        name="virement"
                                                        placeholder="....."
                                                        value={formDataVirement.virement}
                                                        onChange={handleChangeVirement}
                                                        autoComplete='off'
                                                        className='border border-gray-600 p-2 rounded w-full focus:ring-1 focus:ring-gray-700'
                                                    />
                                                    {errors.virement && <span className="text-red-600">{errors.virement}</span>}
                                                </div>
                                                <div className='flex justify-end space-x-2'>
                                                    <button className='bg-gray-700 text-white py-2 px-2 rounded transition-all duration-300 hover:scale-105' onClick={closeCashModal}>Fermer</button>
                                                    <button className='bg-green-700 text-white py-2 px-2 rounded transition-all duration-300 hover:scale-105' onClick={handleSubmitVirement}>Enregistrer</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </React.Fragment>
                    ))
                }
            </div >
            <Toaster position="bottom-center" />
        </>
    )
}

export default Index