'use client';
import BasicButton from "@/app/components/client/basic-button";

export default function ResendEmailVerificationButton(props: any) {
    const handleResendEmailVerification = async () => {
        const response = await fetch('/api/auth/resend-verification-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId: props.userId })
        });

        if (response.ok) {
            const res = await response.json();
            console.log(res);
            alert('Email sent!');
            window.location.href = "/api/auth/logout";
        } else {
            alert('Failed to send email.');
        }
    }

    return (
        <BasicButton
            eventHandler={handleResendEmailVerification}
            buttonText={"Resend Email Verification"}
        />
    );
}
