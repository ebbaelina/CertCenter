import { IDSButton, IDSContainer, IDSIconClose, IDSIconFileOther, IDSInput, IDSTextarea, IDSDialog, IDSIconPlus, IDSIconEdit, IDSIcon} from '@inera/ids-react';
import React from 'react';


function UpdateDialog(props) {
    return (

        <IDSContainer>
                      <IDSDialog dismissible="true">
                        <h3 slot="headline" className="ids-heading-2">Updatera certifikat</h3>
                        <IDSIconEdit size='s' trigger=""></IDSIconEdit>
                        <b className='ids-mb-4 delete-question'>Du updaterar certifikat {props.message}</b>
                        <form>
                        <IDSInput>
                            <label for="select-1" class="ids-label  ids-mb-2">Ägare</label>
                            <div class="ids-select-wrapper">
                                <select id="select-1" class="ids-select" name="options">
                                    <option value="" disabled="" selected="">Välj ägare</option>
                                    <option value="a">Användare 1</option>
                                    <option value="b">Användare 2</option>
                                    <option value="c">Användare 3</option>
                                    <option value="d">Användare 4</option>
                                </select>
                            </div>
                        </IDSInput>

                        <IDSTextarea>
                            <label class="ids-mb-2" >Ladda upp i ASCII-format</label>
                            <textarea id='ids-textArea'></textarea>
                        </IDSTextarea>

                        <IDSContainer>
                            <label for="uploadFile" class="ids-label ">Välj fil</label>
                            <input id='uploadFile' type='file'></input>
                       </IDSContainer>
                        </form>
                        <IDSButton trigger class="ids-button ids-mt-5">Updatera</IDSButton>
                      </IDSDialog>
                    </IDSContainer>

        /*<ids-container>

            <div class="ids-dialog">
                <div class="ids-dialog__header">
                    <button class="ids-dialog__header__button" aria-label="Stäng">
                        <IDSIconClose height="20" width="20" class="ids-icon" size="m"></IDSIconClose>
                    </button>
                </div>
                <form>
                    <div class="ids-dialog__body">
                        <div class="ids-dialog__body__headline">
                            <h1 class="ids-heading-1 ids-mb-5">Updatera certifikat</h1>
                        </div>

                        <IDSInput>
                            <label for="select-1" class="ids-label  ids-mb-2">Updatera ägare</label>
                            <div class="ids-select-wrapper">
                                <select id="select-1" class="ids-select" name="options">
                                    <option value="" disabled="" selected="">Välj ägare</option>
                                    <option value="a">Användare 1</option>
                                    <option value="b">Användare 2</option>
                                    <option value="c">Användare 3</option>
                                    <option value="d">Användare 4</option>
                                </select>
                            </div>
                        </IDSInput>

                        <IDSTextarea>
                            <label class="ids-mb-2" >Ladda upp i ASCII-format</label>
                            <textarea id='ids-textArea'></textarea>
                        </IDSTextarea>

                        <IDSContainer>
                            <label for="uploadFile" class="ids-label ids-mb-2">Välj fil</label>
                            <input id='uploadFile' type='file'></input>
                       </IDSContainer>

                        <div class="ids-dialog__footer">
                            <IDSButton class="ids-button">Updatera</IDSButton>
                        </div>
                    </div>
                </form>
            </div>
        </ids-container>*/
    )
}

export default UpdateDialog; 