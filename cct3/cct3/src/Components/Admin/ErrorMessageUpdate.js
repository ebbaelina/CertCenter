import React from 'react';
import { IDSAlert, IDSCol, IDSRow } from "@inera/ids-react";

function ErrorMessageUpdate(props) {

    return (
            <IDSRow className='ids-mt-5'>
                <IDSCol>
                    <IDSAlert headline="Certifikatuppdatering misslyckades" type="error">
                    Det gick inte att uppdatera certifikatet {props.message}.
                    </IDSAlert>
                </IDSCol>
            </IDSRow>
    )
}
export default ErrorMessageUpdate;