import { IDSExpandable, IDSRow, IDSCol } from '@inera/ids-react';
import { IDSContainer } from '@inera/ids-react';



function SearchPageTextField() {

    return (
        <IDSContainer>
        <IDSRow>
            <IDSCol cols="5" m='8' s='12' className="ids-content ids-mt-5">
                <h1 className="ids-heading-1">Sök certifikat</h1>
                <p className="ids-preamble">Hitta certifikat genom att söka med HSA-id, certifikatnamn, ägare och datum. Sökningen är skiftlägeskänslig. </p>
            </IDSCol>
        </IDSRow>

    </IDSContainer>
    )
}

export default SearchPageTextField; 