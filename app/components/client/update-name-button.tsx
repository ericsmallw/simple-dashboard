'use client';
import BasicButton from "@/app/components/client/basic-button";

export default function UpdateNameButton(props: any) {
    const handleUpdateName = async () => {
        console.log(props.name)
        const response = await fetch('/api/auth/update-name', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: props.name, userId: props.userId })
        });

        if (!response.ok) {
            alert('Error Updating Name');
        }
    }

    return (
        <BasicButton
            eventHandler={handleUpdateName}
            buttonText={"Update Name"}
            class={"btn btn-primary"}
        />
    );
}
