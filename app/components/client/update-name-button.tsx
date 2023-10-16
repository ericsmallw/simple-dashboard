'use client';
import BasicButton from '@/app/components/client/basic-button';

/**
 * UpdateNameButtonProps
 * @param {string} userId
 */
export class UpdateNameButtonProps {
  userId: string = '';
  updateSession: any = '';
}

/**
 * UpdateNameButton
 * @param {UpdateNameButtonProps} props
 * @constructor
 */
export default function UpdateNameButton(props: UpdateNameButtonProps) {
  const handleUpdateName = async () => {
    const name = sessionStorage.getItem('user-name');
    const response = await fetch('/api/auth/update-name', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, userId: props.userId}),
    });

    if (response.ok) {
      props.updateSession(name);
    } else {
      alert('Error Updating Name');
    }
  };

  return (
    <BasicButton
      eventHandler={handleUpdateName}
      buttonText={'Update Name'}
      class={'btn btn-primary'}
    />
  );
}
