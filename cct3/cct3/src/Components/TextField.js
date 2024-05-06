import '@inera/ids-design/themes/inera/inera.css'
import { IDSExpandable } from '@inera/ids-react';
import { IDSCol, IDSRow, IDSContainer } from '@inera/ids-react';



function TextField() {

    return (
        <IDSContainer>
            <IDSExpandable expanded={true} borderless={true} headline="Sök efter certifikat">
                <p className="ids-body ids-mt-5">Nån text här.. <br /> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </IDSExpandable>
        </IDSContainer>
    )
}

export default TextField; 