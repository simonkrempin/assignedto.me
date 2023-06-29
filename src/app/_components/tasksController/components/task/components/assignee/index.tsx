import React from "react";

import { Button, Checkbox, InputField } from "@components";
import { useAssigneeContext } from "../../context/assigneContext";

interface AssigneeEditMaskProps {
    index: number;
}

export default function AssigneeEditMask({ index }: AssigneeEditMaskProps): React.ReactElement {
    const { assignees, editEmail, removeAssigneeByIndex } = useAssigneeContext();
    const [email, setEmail] = React.useState<string>(assignees[index]?.email);

    const saveEmailInContext = () => {
        editEmail(index, email);
    }

    const removeAssignee = () => {
        removeAssigneeByIndex(index);
    }

    return (
        <div key={`${assignees[index].email}+${index}`} className="horizontal-container" onBlur={saveEmailInContext}>
            <Checkbox checked={assignees[index]?.completed} setChecked={() => {}} disabled={true} />
            <InputField text={email} changeText={setEmail} fieldStyle="small" placeholder="E-Mail" />
            <Button mode="link" onClick={removeAssignee} label="löschen" />
        </div>
    );
}
