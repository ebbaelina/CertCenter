import React from 'react';
import { IDSAlert, IDSCol, IDSRow } from "@inera/ids-react";

function ErrorMessageCreate() {

    return (
            <IDSRow className='ids-mb-3'>
                <IDSCol cols="5" m='8' s='12' >
                    <IDSAlert headline="Certifikat kunde ej skapas" type="error">
                    Ett fel uppstod vid skapandet av certifikatet. Försök igen senare.
                    </IDSAlert>
                </IDSCol>
            </IDSRow>
    )
}
export default ErrorMessageCreate;