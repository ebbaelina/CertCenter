import React from 'react';
import { IDSAlert, IDSCol, IDSRow } from "@inera/ids-react";

function SuccessMessageCreate(props) {

    return (
            <IDSRow className='ids-mb-3'>
                <IDSCol cols="5" >
                    <IDSAlert headline="Certifikat skapat" type="success">
                        Certifikatet <b>{props.message}</b> har skapats. Vänligen signera det i <a href="https://portal.qa.siths.se/start" target="_blank" className="ids-link">SITHS eID-portalen</a> och uppdatera sedan certifikatet genom att söka efter dess namn under <a href="http://localhost:3000/" className="ids-link">sök certifikat</a>.
                    </IDSAlert>
                </IDSCol>
            </IDSRow>
    )
}
export default SuccessMessageCreate;