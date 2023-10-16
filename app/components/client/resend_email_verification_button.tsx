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
  let handleResendEmailVerification = async () => {
    const RESPONSE = await fetch('/api/auth/resend_verification_email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({userId: props.userId}),
    });

    if (RESPONSE.ok) {
      const RESPONSE_JSON = await RESPONSE.json();
      console.log(RESPONSE_JSON);
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
