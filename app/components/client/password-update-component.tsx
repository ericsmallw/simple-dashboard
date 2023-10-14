'use client'
import {useState} from "react";

export default  function PasswordUpdateComponent(props: any) {
    let [oldPassword, setOldPassword] = useState('');
    let [newPassword1, setNewPassword1] = useState('');
    let [newPassword2, setNewPassword2] = useState('');

    // event handler for password update
    const handlePasswordUpdate = async () => {
        if (newPassword1 !== newPassword2) {
            alert('Passwords do not match.');
            return;
        }

        const response = await fetch('/api/auth/reset-password', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                oldPassword,
                newPassword: newPassword1,
                newPasswordAgain: newPassword2,
                userId: props.userId,
                email: props.email
            })
        });

        if (response.ok) {
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
                    placeholder="Retype New Password"
                    aria-label="Password"
                    aria-describedby="basic-addon1"
                    onChange={($event) => {
                        setNewPassword2($event.target.value);
                    }}
                />
            </div>
            <button className="btn btn-primary" onClick={handlePasswordUpdate}>Change Password</button>
        </div>
    )
}
