import React from "react";
import { IDSAlert, IDSCol} from "@inera/ids-react";

function NoCertificateFoundMessage() {


    return (
                <IDSCol cols="5" className="ids-mt-5">
                    <IDSAlert className="ids-mb-8" headline="Information" type="attention">
                       Din sökning gav inga träffar. Du kan prova att göra din sökning igen och kontrollera att du fyllt i något av följande.
                        <ul>
                            <li>Ett HSA-id, sökningen är skiftlägeskänslig</li>
                            <li>Ett certifikatnamn, sökningen är skiftlägeskänslig</li>
                            <li>En ägare, sökningen är skiftlägeskänslig</li>
                            <li>Ett giltigt datum</li>
                        </ul>
                    </IDSAlert>
                </IDSCol>


    )
}

export default NoCertificateFoundMessage; 