import { IDSButton, IDSContainer, IDSDialog, IDSIconTrash} from '@inera/ids-react';
import React from 'react';


function DeleteDialog(props) {
    return (

        <IDSContainer>
                      <IDSDialog dismissible="true">
                        <h3 slot="headline" className="ids-heading-2">Radera certifikat</h3>
                        <IDSIconTrash size='s' trigger=""></IDSIconTrash>
                        <b className='ids-mb-4 delete-question'>Är du säker på att du vill radera certifikatet {props.message}?</b>
                        <br />
                        <p class='ids-mb-4' >Certifikatet kommer raderas permanent och åtgärden går inte att ångra.</p>
                        <IDSButton trigger class="ids-button">Radera</IDSButton>
                      </IDSDialog>
                    </IDSContainer>

    )
}

export default DeleteDialog; 