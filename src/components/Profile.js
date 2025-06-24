import React, { useState } from 'react';
import { Card, Button, Modal, Form, ToastContainer, Toast } from 'react-bootstrap';

const API_URL = process.env.REACT_APP_API_URL;

export default function Profile() {
  const [name,  setName]  = useState(localStorage.getItem('userName')  || '');
  const [email]           = useState(localStorage.getItem('userEmail') || '');

  const [toast, setToast] = useState({ show:false, msg:'', variant:'success' });

  const [show, setShow]      = useState(false);
  const [newName, setNewName]= useState(name);
  const [pwd1, setPwd1]      = useState('');
  const [pwd2, setPwd2]      = useState('');
  const [saving, setSaving]  = useState(false);

  const nameValid = newName.trim().length >= 2;
  const pwMatch   = pwd1 && pwd1 === pwd2;

  const saveProfile = async () => {
    if (!nameValid || (pwd1 && !pwMatch)) return;

    setSaving(true);
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_URL}/profile`, {
        method:'PUT',
        headers:{
          'Content-Type':'application/json',
          Authorization:'Bearer ' + token
        },
        body: JSON.stringify({
          name: newName,
          password: pwd1 || undefined
        })
      });

      if (!res.ok) throw new Error();

      localStorage.setItem('userName', newName);
      setName(newName);
      setShow(false);
      setToast({ show:true, msg:'Profile updated', variant:'success' });
    } catch {
      setToast({ show:true, msg:'Update failed', variant:'danger' });
    }
    setSaving(false);
  };

  return (
    <>
      <ToastContainer className="toast-container">
        <Toast bg={toast.variant} show={toast.show} onClose={() => setToast({ ...toast, show: false })}>
          <Toast.Body className="text-white">{toast.msg}</Toast.Body>
        </Toast>
      </ToastContainer>

      <h2 className="mb-4">Your Profile</h2>

      <Card className="shadow profile-card mx-auto">
        <Card.Body>
          <h5 className="mb-3">Account Details</h5>
          <p className="mb-2"><strong>Name:&nbsp;</strong>{name}</p>
          <p className="mb-4"><strong>Email:&nbsp;</strong>{email}</p>

          <Button variant="primary" onClick={() => setShow(true)}>
            Edit Profile
          </Button>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={() => !saving && setShow(false)} centered>
        <Modal.Header closeButton={!saving}>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={newName}
              onChange={e => setNewName(e.target.value)}
              isInvalid={!nameValid}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>New Password <small className="text-muted">(leave blank to keep)</small></Form.Label>
            <Form.Control
              type="password"
              value={pwd1}
              onChange={e => setPwd1(e.target.value)}
              isInvalid={!!pwd1 && !pwMatch}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={pwd2}
              onChange={e => setPwd2(e.target.value)}
              isInvalid={!!pwd1 && !pwMatch}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" disabled={saving} onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            disabled={saving || !nameValid || (!!pwd1 && !pwMatch)}
            onClick={saveProfile}
          >
            {saving ? 'Saving…' : 'Save'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
