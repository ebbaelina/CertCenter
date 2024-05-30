import React from 'react';
import { IDSAlert, IDSCol, IDSRow } from "@inera/ids-react";

function SuccessMessageUpdate(props) {

    return (
            <IDSRow className='ids-mt-5'>
                <IDSCol>
                    <IDSAlert headline="Certifikatuppdatering" type="success">
                    {props.message} har uppdaterats framgångsrikt.
                    </IDSAlert>
                </IDSCol>
            </IDSRow>
    )
}
export default SuccessMessageUpdate;