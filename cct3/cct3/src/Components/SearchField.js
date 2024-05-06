import React, { useState} from 'react';
import { searchCert } from '../api/searchApi';
import DataTable from './DataTable';
import { IDSButton } from '@inera/ids-react';
import { IDSInput } from '@inera/ids-react';
import { IDSCol, IDSRow, IDSContainer } from '@inera/ids-react';

function SearchField() {
    const [isSearchPerformed, setIsSearchPerformed] = useState(false);
    const [fetchedData, setFetchedData] = useState(null);

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

    const searchbtn = async () => {
        console.log(JSON.stringify(searchParams));
        try {

            const data = await searchCert(searchParams);
            setFetchedData(data);
            setIsSearchPerformed(true);

            //rensar input-fälten 
            setSearchParams({
                hsaId: '',
                commonName: '',
                owner: '' 
            });

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return (
        <IDSContainer>
            <IDSRow className="ids-mt-5">
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
                        <label>Gilltig innan</label>
                        <input type="date" name='endDateBefore' onChange={(e) => handleChange(e, 'endDateBefore')} value={searchParams.endDateBefore} ></input>
                    </IDSInput>
                </IDSCol>
                <IDSCol className="btnSearch ids-mr-5" cols="1" m='1' s='1' >
                    <div className="divSearch">
                        <IDSButton className="ids-mt-4" onClick={searchbtn} type="submit">Sök</IDSButton>
                    </div>
                </IDSCol>


            </IDSRow>
            {isSearchPerformed &&
                <DataTable data={fetchedData} />}
        </IDSContainer>
    );
}

export default SearchField; 