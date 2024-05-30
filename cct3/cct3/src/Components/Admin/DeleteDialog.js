import { IDSButton, IDSDialog, IDSIconTrash, IDSButtonGroup} from '@inera/ids-react';
import React, { useState } from 'react';


function DeleteDialog(props) {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <button className='update-btn' onClick={() => setDialogOpen(true)}>
        <IDSIconTrash size='l'></IDSIconTrash>
      </button>

      <IDSDialog srclosetext show={`${dialogOpen}`}>
        <h3 slot="headline" className="ids-heading-2">Radera certifikat</h3>

        <b className='ids-mb-4 delete-question'>Är du säker på att du vill radera certifikatet {props.message}?</b>
        <br />
        <p class='ids-mb-4' >Certifikatet kommer raderas permanent och åtgärden går inte att ångra.</p>
        <IDSButtonGroup>
          <IDSButton secondary onClick={() => {
            setDialogOpen(false)
          }}
          >Avbryt</IDSButton>
          <IDSButton onClick={() => {
            setDialogOpen(false)
          }}
          >Radera</IDSButton>
        </IDSButtonGroup>
      </IDSDialog>
    </>

  )
}

export default DeleteDialog; 