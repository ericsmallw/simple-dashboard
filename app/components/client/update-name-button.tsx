'use client';
import BasicButton from "@/app/components/client/basic-button";

export default function UpdateNameButton(props: any) {
    const handleUpdateName = async () => {
        const response = await fetch('/api/auth/update-name', {
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
            // refresh the page
            window.location.reload();
        } else {
            alert('Error Updating Name');
        }
    }

    return (
        <BasicButton
            eventHandler={handleUpdateName}
            buttonText={"Update Name"}
        />
    );
}
