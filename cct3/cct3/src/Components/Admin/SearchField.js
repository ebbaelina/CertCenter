import React, { useState } from 'react';
import { searchCert } from '../../api/searchApi';
import DataTable from './DataTable';
import NoCertificateFoundMessage from '../Common/NoCertificateFoundMessage';
import { IDSButton } from '@inera/ids-react';
import { IDSInput } from '@inera/ids-react';
import { IDSCol, IDSRow, IDSContainer, IDSSpinner } from '@inera/ids-react';

function SearchField() {
    const [isSearchPerformed, setIsSearchPerformed] = useState(false);
    const [fetchedData, setFetchedData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchMessage, setSearchMessage] = useState('');
    const [numberOfHits, setNumberOfHits] = useState('');

    const [searchParams, setSearchParams] = useState({
        hsaId: '',
        commonName: '',
        owner: '',
        endDateBefore: ''
    });

    const handleChange = (event, field) => {
        setSearchParams({
            ...searchParams,
            [field]: event.target.value
        });
    }

    const generateSearchMessage = (searchParams) => {
        let message = 'Du sökte efter: ';
        let filters = [];

        if (searchParams.hsaId) filters.push(`HSA-id - ${searchParams.hsaId}`);
        if (searchParams.commonName) filters.push(`Certifikatnamn - ${searchParams.commonName}`);
        if (searchParams.owner) filters.push(`Ägare -  ${searchParams.owner}`);
        if (searchParams.endDateBefore) filters.push(`Giltig innan - ${searchParams.endDateBefore}`);

        if (filters.length === 0) {
            message += 'inga filter angetts';
        } else {
            message += filters.join(', ');
        }
        return message;

    }

    const searchbtn = async () => {
        console.log(JSON.stringify(searchParams));
        try {
            setLoading(true);
            const data = await searchCert(searchParams);
            let number = 'Antal träffar: ' + data.response_data.length;

            setNumberOfHits(number); 
            setSearchMessage(generateSearchMessage(searchParams));

            setFetchedData(data);
            setIsSearchPerformed(true);

            //rensar input-fälten 
            setSearchParams({
                hsaId: '',
                commonName: '',
                owner: '',
                endDateBefore: ''
            });

        } catch (error) {
            console.error('Error fetching data:', error);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <IDSContainer>
            <IDSRow>
                <IDSCol cols="2" m='4' s='12' className='ids-mr-5'>
                    <IDSInput>
                        <label>HSA-id</label>
                        <input type="text" name='hsaId' onChange={(e) => handleChange(e, 'hsaId')} value={searchParams.hsaId}></input>
                    </IDSInput>
                </IDSCol>

                <IDSCol cols="2" m='4' s='12' className='ids-mr-5'>
                    <IDSInput>
                        <label>Certifikatnamn</label>
                        <input type="text" name='commonName' onChange={(e) => handleChange(e, 'commonName')} value={searchParams.commonName} ></input>
                    </IDSInput>
                </IDSCol>

                <IDSCol cols="2" m='4' s='12' className='ids-mr-5'>
                    <IDSInput>
                        <label>Ägare</label>
                        <input type="text" name='owner' onChange={(e) => handleChange(e, 'owner')} value={searchParams.owner}></input>
                    </IDSInput>
                </IDSCol>

                <IDSCol cols="2" m='4' s='12' className='ids-mr-5'>
                    <IDSInput>
                        <label>Giltig till</label>
                        <input type="date" name='endDateBefore' onChange={(e) => handleChange(e, 'endDateBefore')} value={searchParams.endDateBefore} ></input>
                    </IDSInput>
                </IDSCol>
                <IDSCol className="btnSearch ids-mr-5" cols="1" m='1' s='1' >
                        <IDSButton className="ids-mt-4 btn-search" size='1' onClick={searchbtn} type="submit">Sök</IDSButton>
                </IDSCol>


            </IDSRow>
            {loading ? (
                <IDSSpinner className='ids-mt5' live="polite" srtext="The spinner has finished loading!" />
            ) : /*<><p className='ids-body ids-mt-3'>{searchMessage}</p>
        <p className='ids-body ids-mt-1'>{numberOfHits}</p></>*/null}
            {isSearchPerformed ? (
                fetchedData && fetchedData.response_data && fetchedData.response_data.length !== 0 ? (
                    <DataTable data={fetchedData} />
                ) : (
                    <NoCertificateFoundMessage></NoCertificateFoundMessage>
                )
            ) : null}
        </IDSContainer>
    );
}

export default SearchField; 