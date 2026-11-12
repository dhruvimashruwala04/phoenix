"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/contact`;

const ContactsPage = () => {
  const [contacts, setContacts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
  });

  const getContacts = async () => {
    try {
      const res = await fetch(API_URL);
      const result = await res.json();
      setContacts(result?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = editId ? `${API_URL}/${editId}` : `${API_URL}/create`;
    const method = editId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Request failed");

      resetForm();
      getContacts();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (contact) => {
    setForm({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      city: contact.city,
    });

    setEditId(contact.id);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      getContacts();
    } catch (error) {
      console.log(error);
    }
  };

  const resetForm = () => {
    setEditId(null);
    setForm({
      name: "",
      email: "",
      phone: "",
      city: "",
    });
  };

  return (
    <Container>
      <Header>
        <h1>Contact Manager</h1>
        <p>Manage your contacts in one place.</p>
      </Header>

      <Form onSubmit={handleSubmit}>
        <FormTitle>{editId ? "Update Contact" : "Add New Contact"}</FormTitle>

        <InputGroup>
          <label>Full Name</label>
          <Input
            name="name"
            placeholder="Enter full name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </InputGroup>

        <InputGroup>
          <label>Email Address</label>
          <Input
            name="email"
            type="email"
            placeholder="Enter email address"
            value={form.email}
            onChange={handleChange}
            required
          />
        </InputGroup>

        <InputGroup>
          <label>Phone Number</label>
          <Input
            name="phone"
            placeholder="Enter phone number"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </InputGroup>

        <InputGroup>
          <label>City</label>
          <Input
            name="city"
            placeholder="Enter city"
            value={form.city}
            onChange={handleChange}
            required
          />
        </InputGroup>

        <ButtonGroup>
          <PrimaryButton type="submit">
            {editId ? "Update Contact" : "+ Add Contact"}
          </PrimaryButton>

          {editId && (
            <CancelButton type="button" onClick={resetForm}>
              Cancel
            </CancelButton>
          )}
        </ButtonGroup>
      </Form>

      <ContactSection>
        <SectionHeader>
          <h2>All Contacts</h2>
          <Count>{contacts.length} contacts</Count>
        </SectionHeader>

        {contacts.length === 0 ? (
          <EmptyMessage>
            No contacts found. Add your first contact!
          </EmptyMessage>
        ) : (
          contacts.map((contact) => (
            <ContactCard key={contact.id}>
              <ContactInfo>
                <strong>{contact.name}</strong>
                <span>{contact.email}</span>
                <span>
                  {contact.phone} · {contact.city}
                </span>
              </ContactInfo>

              <ActionGroup>
                <EditButton onClick={() => handleEdit(contact)}>
                  Edit
                </EditButton>

                <DeleteButton onClick={() => handleDelete(contact.id)}>
                  Delete
                </DeleteButton>
              </ActionGroup>
            </ContactCard>
          ))
        )}
      </ContactSection>
    </Container>
  );
};

export default ContactsPage;

const Container = styled.main`
  max-width: 750px;
  margin: 50px auto;
  padding: 20px;
  color: #252525;
`;

const Header = styled.div`
  margin-bottom: 30px;

  h1 {
    font-size: 28px;
    margin-bottom: 8px;
  }

  p {
    color: #777;
    font-size: 14px;
  }
`;

const Form = styled.form`
  padding: 24px;
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 35px;
`;

const FormTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 4px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;

  label {
    font-size: 13px;
    font-weight: 500;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: #5145cd;
  }

  &::placeholder {
    color: #aaa;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const PrimaryButton = styled.button`
  padding: 11px 18px;
  background: #5145cd;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: #4035b5;
  }
`;

const CancelButton = styled.button`
  padding: 11px 18px;
  background: #777;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

const ContactSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;

  h2 {
    font-size: 19px;
  }
`;

const Count = styled.span`
  font-size: 13px;
  color: #777;
`;

const ContactCard = styled.div`
  padding: 18px;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  @media (max-width: 500px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  strong {
    font-size: 15px;
  }

  span {
    font-size: 13px;
    color: #777;
  }
`;

const ActionGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const EditButton = styled.button`
  padding: 8px 14px;
  background: #5145cd;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  padding: 8px 14px;
  background: #e54848;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const EmptyMessage = styled.p`
  text-align: center;
  padding: 30px;
  color: #888;
  border: 1px dashed #ddd;
  border-radius: 8px;
`;
