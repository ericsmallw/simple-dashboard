'use client';
import {useState} from 'react';

/**
 * PasswordUpdateProps
 * @param {string} userId
 * @param {string} email
 */
export class PasswordProps {
  userId = '';
  email = '';
}

/**
 * PasswordUpdateComponent
 * @param {PasswordProps} props
 * @constructor
 */
export default function PasswordUpdateComponent(props: PasswordProps) {
  const [OLD_PASSWORD, setOldPassword] = useState('');
  const [NEW_PASSWORD_1, setNewPassword1] = useState('');
  const [NEW_PASSWORD_2, setNewPassword2] = useState('');

  /**
   * handlePasswordUpdate
   * @return {Promise<void>}
   */
  async function handlePasswordUpdate() {
    const ERRORS = [];

    if (NEW_PASSWORD_1 !== NEW_PASSWORD_2) {
      ERRORS.push('Passwords do not match.');
    }

    if (NEW_PASSWORD_1.length < 8) {
      ERRORS.push('Password must be at least 8 characters long.');
    }

    if (!/\d/.test(NEW_PASSWORD_1)) {
      ERRORS.push('Password must contain at least one number.');
    }

    if (!/[a-z]/.test(NEW_PASSWORD_1)) {
      ERRORS.push('Password must contain at least one lower case letter.');
    }

    if (!/[A-Z]/.test(NEW_PASSWORD_1)) {
      ERRORS.push('Password must contain at least one upper case letter.');
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(NEW_PASSWORD_1)) {
      ERRORS.push('Password must contain at least one special character.');
    }

    if (ERRORS.length > 0) {
      alert(ERRORS.join('\n'));
      return;
    }

    const RESPONSE = await fetch('/api/auth/reset_password', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        oldPassword: OLD_PASSWORD,
        newPassword: NEW_PASSWORD_1,
        newPasswordAgain: NEW_PASSWORD_2,
        userId: props.userId,
        email: props.email,
      }),
    });

    if (RESPONSE.ok) {
      alert('Password Updated Successfully!');
    } else {
      alert('Error Updating Password');
    }
  }

  return (
    <div className="col-6">
      <h4>Password</h4>
      <div className="input-group mb-3">
        <input
          type="password"
          className="form-control"
          placeholder="Old Password"
          aria-label="Password"
          aria-describedby="basic-addon1"
          onChange={($event) => {
            setOldPassword($event.target.value);
          }}
        />
      </div>
      <div className="input-group mb-3">
        <input
          type="password"
          className="form-control"
          placeholder="New Password"
          aria-label="Password"
          aria-describedby="basic-addon1"
          onChange={($event) => {
            setNewPassword1($event.target.value);
          }}
        />
      </div>
      <div className="input-group mb-3">
        <input
          type="password"
          className="form-control"
          placeholder="Re-enter New Password"
          aria-label="Password"
          aria-describedby="basic-addon1"
          onChange={($event) => {
            setNewPassword2($event.target.value);
          }}
        />
      </div>
      <button
        className="btn btn-primary"
        onClick={handlePasswordUpdate}
      >
                Change Password
      </button>
    </div>
  );
}
