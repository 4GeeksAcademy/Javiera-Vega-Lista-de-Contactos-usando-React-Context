const urlBaseContact = "https://playground.4geeks.com/contact"

import useGlobalReducer from "../hooks/useGlobalReducer";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const ContactCard = () => {

    const { store, dispatch } = useGlobalReducer()

    const imageURL = {
        image: "https://i.pravatar.cc/300",
    }

    const getAgendaContacts = async () => {
        try {
            const response = await fetch(`${urlBaseContact}/agendas/Javiera/contacts`)
            const data = await response.json()
            dispatch({ type: "set_contacts", payload: data.contacts })

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAgendaContacts()
    }, [])

    const deteleContact = async (id) => {
        try {
            const result = confirm("Do you want to delete the contact with id '" + id + "'?")
            if (result) {
                const response = await fetch(`${urlBaseContact}/agendas/Javiera/contacts/${id}`, {
                    method: "DELETE"
                })
                if (response.ok)
                    dispatch({ type: "set_contacts", payload: store.contacts.filter(contact => contact.id != id) })

            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="container">
            <div className="row">
                {
                    store.contacts && store.contacts.length > 0 && store.contacts.map((contact) => {
                        return (
                            <div className="col-12 contact border border-ligth p-2">
                                <div className="content-image">
                                    <img src={imageURL.image} className="image" alt="imagen-person" />
                                </div>
                                <div className="d-flex justify-content-between vw-100">
                                    <div className="data-name">
                                        <p> {contact.name}</p>
                                        <div className="data-contact">
                                            <p>
                                                <i className="fa-solid fa-location-dot"></i> {contact.address}</p>
                                            <p>
                                                <i className="fa-solid fa-phone-flip"></i> {contact.phone}</p>
                                            <p>
                                                <i className="fa-solid fa-envelope"></i> {contact.email}</p>
                                        </div>
                                    </div>
                                    <div className="icons-end col-1">
                                        <Link
                                            className="pencil"
                                            to={`/edit-contact/${contact.id}`}>
                                            <i
                                                type="submit"
                                                className="fa-solid fa-pencil "
                                            ></i>
                                        </Link>
                                        <button
                                            type="button"
                                            className="trash border-0 ps-3 float-end">
                                            <i className="fa-solid fa-trash "
                                                onClick={() => deteleContact(contact.id)}></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>

    );
}