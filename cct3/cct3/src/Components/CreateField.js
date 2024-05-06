import React, { useState } from 'react';
import { IDSButton } from '@inera/ids-react';
import { IDSInput } from '@inera/ids-react';
import { IDSCol, IDSRow, IDSContainer } from '@inera/ids-react';
import { createCert } from '../api/searchApi';
import { IDSExpandable } from '@inera/ids-react';



function CreateField() {

    const [createParams, setCreateParams] = useState({
        owner: '',
        password: ''
    });

    const handleChange = (event, field) => {
        setCreateParams({
            ...createParams,
            [field]: event.target.value
        });
    }

    const createbtn = async () => {
        console.log(JSON.stringify(createParams));
        try {
            const data = await createCert(createParams);
            console.log(data);

            /*setCreateParams({
                owner: '',
                password: ''
            });*/

        } catch (error) {
            console.error('Error creating cert:', error);
        }
    }


    return (
        <IDSContainer>
            <form >
                <IDSContainer>
                    <IDSExpandable expanded={true} borderless={true} headline="Skapa nytt certifikat">
                        <p className="ids-body ids-mt-5">Nån text här..<br /> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </IDSExpandable>
                    <IDSCol className="ids-mt-5" cols="4" m='12' s='12'>
                        <IDSInput>
                            {/*<label>Ägare*</label>
                    <input type="text" required value={createParams.owner} onChange={(e) => handleChange(e, 'owner')}></input>*/}

                            <label for="select-1" class="ids-label">Ägare*</label>
                            <div class="ids-select-wrapper">
                                <select id="select-1" class="ids-select" name="options">
                                    <option value="" disabled="" >Välj ägare</option>
                                    <option value="a">Användare 1</option>
                                    <option value="b">Användare 2</option>
                                    <option value="c">Användare 3</option>
                                    <option value="d">Användare 4</option>
                                </select>
                            </div>
                        </IDSInput>
                        <IDSInput>
                            <label className="ids-mt-4">Lösenord*</label>
                            <input type="password" minLength="6" name="password" required value={createParams.password} onChange={(e) => handleChange(e, 'password')}></input>
                        </IDSInput>
                        <p class="ids-small">Minst 6 tecken</p>
                    </IDSCol>
                    <IDSCol className="ids-mt-5" cols="1" m='12' s='12'>
                        <IDSButton onClick={() => createbtn()}>Skapa</IDSButton>
                    </IDSCol>
                </IDSContainer>
            </form>
        </IDSContainer>
    )
}

export default CreateField; 