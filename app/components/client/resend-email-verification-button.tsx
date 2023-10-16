'use client';
import BasicButton from '@/app/components/client/basic-button';

/**
 * ResendEmailVerificationButtonProps
 * @param {string} userId
 */
export class ResendEmailVerificationButtonProps {
  userId: string = '';
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
    const response = await fetch('/api/auth/resend-verification-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({userId: props.userId}),
    });

    if (response.ok) {
      const res = await response.json();
      console.log(res);
      alert('Email sent!');
      window.location.href = '/api/auth/logout';
    } else {
      alert('Failed to send email.');
    }
  };

  return (
    <BasicButton
      eventHandler={handleResendEmailVerification}
      buttonText={'Resend Email Verification'}
      class={''}/>
  );
}
