import { IDSButton, IDSContainer, IDSSelect, IDSTextarea, IDSDialog, IDSIconEdit, IDSButtonGroup } from '@inera/ids-react';
import React, { useState } from 'react';
import { updateCert } from '../../api/searchApi';
import ErrorMessageUpdate from './ErrorMessageUpdate';
import SuccessMessageUpdate from './SuccessMessageUpdate';


function UpdateDialog(props) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [certUpdated, setcertUpdated] = useState(false);

    const updateBtn = async () => {
        if (selectedFile) {
            const data = await updateCert(selectedFile);
            console.log(data);
        
        if (data === true) {
            console.log('certifikat updaterat');
            setcertUpdated(true);
        } else {
            setcertUpdated(false);
        }
    }
    }

    return (

        <>
            <button className='update-btn' onClick={() => setDialogOpen(true)}>
                <IDSIconEdit size='l'></IDSIconEdit>
            </button>

            <IDSDialog srclosetext show={`${dialogOpen}`}>
                <h3 slot="headline" className="ids-heading-2">Updatera certifikat</h3>

                <b className='ids-mb-4 delete-question'>Du updaterar certifikat {props.message}</b>
                <form>
                    <IDSSelect className='ids-mb-2'>
                        <label>Ägare</label>
                        <select disabled name="options">
                            <option value="" disabled="" selected="">Välj ägare</option>
                            <option value="a">Användare A</option>
                            <option value="b">Användare B</option>
                            <option value="c">Användare C</option>
                            <option value="d">Användare D</option>
                        </select>
                    </IDSSelect>

                    <IDSTextarea>
                        <label class="ids-mb-2">Ladda upp i textformat</label>
                        <textarea disabled id='ids-textArea'></textarea>
                    </IDSTextarea>

                    <IDSContainer class="ids-mb-5">
                        <label htmlFor="uploadFile" className="ids-label">Eller välj fil</label>
                        <input required id='uploadFile' type='file' onChange={(e) =>
                            setSelectedFile(e.target.files[0])
                        }
                        ></input>
                    </IDSContainer>
                </form>
                <IDSButtonGroup >
                    <IDSButton secondary onClick={() => {
                        updateBtn()
                        setDialogOpen(false)
                    }}
                    >Avbryt</IDSButton>
                    <IDSButton onClick={() => {
                        updateBtn()
                    }}
                    >Updatera</IDSButton>
                </IDSButtonGroup>
                {certUpdated === true && (
                    <SuccessMessageUpdate message={props.message}></SuccessMessageUpdate>
                )}
                {certUpdated === false && (
                    <ErrorMessageUpdate message={props.message} ></ErrorMessageUpdate>
                )}
            </IDSDialog>

        </>
    )
}

export default UpdateDialog; 