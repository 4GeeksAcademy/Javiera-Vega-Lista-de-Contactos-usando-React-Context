import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useGlobalReducer from "../hooks/useGlobalReducer";

const urlBaseContact = "https://playground.4geeks.com/contact"

const initialContact = {
    name: "",
    phone: "",
    email: "",
    address: ""
}

export const AddNewContact = () => {
    
    const navigate = useNavigate()

    const { store, dispatch } = useGlobalReducer()

    const [contact, setContact] = useState(initialContact)

    const handleChange = (event) => {
        setContact({
            ...contact,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        createContact();
        navigate("/")
    }

    const createContact = async () => {
        try {
            const response = await fetch(`${urlBaseContact}/agendas/Javiera/contacts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(contact)
            })
            if (response.ok) {
                const data = await response.json()
                dispatch({ type: "set_contacts", payload: [...store.contacts, data] })
                toast("Contacto creado");
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <h1 className="title mt-3 text-center"> Add a new Contact</h1>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <form
                            onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Full Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputFullName1"
                                    placeholder="Full Name"
                                    name="name"
                                    value={contact.name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    placeholder="Enter email"
                                    name="email"
                                    value={contact.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="phone" className="form-label">Phone</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputPhone1"
                                    placeholder="Enter phone"
                                    name="phone"
                                    value={contact.phone}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="address" className="form-label">Address</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputAddress1"
                                    placeholder="Enter address"
                                    name="address"
                                    value={contact.address}
                                    onChange={handleChange}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary w-100"
                                to="/">save
                            </button>
                            <Link
                                type="button"
                                className="btn btn-link p-0"
                                to="/">or get back tu contacts</Link>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}