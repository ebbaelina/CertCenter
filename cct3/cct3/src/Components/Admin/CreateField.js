import React, { useState } from 'react';
import { IDSButton, IDSInput, IDSSelect } from '@inera/ids-react';
import { IDSCol, IDSContainer } from '@inera/ids-react';
import { createCert } from '../../api/searchApi';
import SuccessMessageCreate from './SuccessMessageCreate';
import ErrorMessageCreate from './ErrorMessageCreate';

function CreateField() {
    const [certCreated, setcertCreated] = useState(null);
    const [CN, setCN] = useState('');
    const [createParams, setCreateParams] = useState({
        password: '',
        commonName: ''
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

            if (data.response_data && data.response_data.length > 0) {
                setcertCreated(true);
                const CName = data.response_data[0].issuer.attr.commonName;
                setCN(CName);
            } else {
                setcertCreated(false);
            }

            setCreateParams({
                password: '',
                commonName: ''
            })

        } catch (error) {
            console.error('Error creating cert:', error);
        }
    }


    return (
        <IDSContainer>
            {certCreated === true && (
                <SuccessMessageCreate message={CN} ></SuccessMessageCreate>
            )}
            {certCreated === false && (
                <ErrorMessageCreate></ErrorMessageCreate>
            )}
            <form >
                    <IDSCol cols="5" m='8' s='12'>
                        <IDSInput novalidation={true}>
                            <label>Certifikatsnamn*</label>
                            <input class="ids-input-1 input-create" type="text" minLength="6" value={createParams.commonName} onChange={(e) => handleChange(e, 'commonName')}></input>
                        </IDSInput>
                        <IDSSelect>
                            <label for="select-1" class="ids-label ids-mt-4">Ägare*</label>
                            <div class="ids-select-wrapper">
                                <select disabled id="select-1" class="ids-select input-create" name="options">
                                    <option value="" disabled="" >Välj ägare</option>
                                    <option value="a">Användare A</option>
                                    <option value="b">Användare B</option>
                                    <option value="c">Användare C</option>
                                    <option value="d">Användare D</option>
                                </select>
                            </div>
                        </IDSSelect>

                        <IDSInput>
                            <label className="ids-mt-4">Lösenord*</label>
                            <input class="ids-input-1 input-create" type="password" minLength="6" name="password" value={createParams.password} onChange={(e) => handleChange(e, 'password')}></input>
                            <span slot="hint">Minst 6 tecken</span>
                        </IDSInput>
                    </IDSCol>
                    <IDSCol className="ids-mt-3 btn-create" cols="1" m='12' s='12'>
                        <IDSButton submit onClick={() => createbtn()}>Skapa</IDSButton>
                    </IDSCol>
            </form>
        </IDSContainer>
    )

}

export default CreateField; 