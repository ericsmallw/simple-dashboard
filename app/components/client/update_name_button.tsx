'use client';
import BasicButton from '@/app/components/client/basic_button';

/**
 * UpdateNameButtonProps
 * @param {string} userId
 */
export class UpdateNameButtonProps {
  userId = '';
  updateSession: any;
}

/**
 * UpdateNameButton
 * @param {UpdateNameButtonProps} props
 * @constructor
 */
export default function UpdateNameButton(props: UpdateNameButtonProps) {
  /**
   * handleUpdateName
   * @return {Promise<void>}
   */
  async function handleUpdateName() {
    const NAME = sessionStorage.getItem('user-name');
    const RESPONSE = await fetch('/api/auth/update_name', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name: NAME, userId: props.userId}),
    });

    if (RESPONSE.ok) {
      props.updateSession(NAME);
    } else {
      alert('Error Updating Name');
    }
  }

  return (
    <BasicButton
      eventHandler={handleUpdateName}
      buttonText={'Update Name'}
      class={'btn btn-primary'}
    />
  );
}
