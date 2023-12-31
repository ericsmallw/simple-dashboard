'use client';
import BasicButton from '@/app/components/client/basic_button';

/**
 * ResendEmailVerificationButtonProps
 * @param {string} userId
 */
export class ResendEmailVerificationButtonProps {
  userId = '';
}

/**
 * ResendEmailVerificationButton
 * @param {ResendEmailVerificationButtonProps} props
 * @constructor
 */
export default function ResendEmailVerificationButton(
    props: ResendEmailVerificationButtonProps
) {
  const handleResendEmailVerification = async () => {
    const RESPONSE = await fetch('/api/auth/resend_verification_email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({userId: props.userId}),
    });

    if (RESPONSE.ok) {
      alert('Email sent!');
      window.location.href = '/api/auth/logout';
    } else {
      alert('Failed to send email.');
    }
  };

  return (
    <div style={{padding: '30px'}}>
      <BasicButton
        eventHandler={handleResendEmailVerification}
        buttonText={'Resend Email Verification'}
        class={'btn btn-primary'}/>
    </div>
  );
}
