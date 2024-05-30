import { IDSExpandable, IDSRow, IDSCol } from '@inera/ids-react';
import { IDSContainer } from '@inera/ids-react';



function SearchPageTextField() {

    return (
        <IDSContainer>
            <IDSRow>
                <IDSCol cols="5" m='8' s='12' className="ids-content ids-mt-5">
                    <h1 className="ids-heading-1">Skapa certifikat</h1>
                    <p className="ids-preamble">Skapa certifikat genom att ange certifikatnamn, ägare och lösenord</p>
                </IDSCol>
            </IDSRow>

        </IDSContainer>
    )
}

export default SearchPageTextField; 