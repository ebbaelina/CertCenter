import React, { useState } from 'react';
import { searchCert } from '../../api/searchApi';
import DataTableCommon from './DataTableCommon';
import NoCertificateFoundMessage from '../Common/NoCertificateFoundMessage';
import { IDSButton } from '@inera/ids-react';
import { IDSInput } from '@inera/ids-react';
import { IDSCol, IDSRow, IDSContainer, IDSSpinner } from '@inera/ids-react';

function SearchFieldCommon() {
    const [isSearchPerformed, setIsSearchPerformed] = useState(false);
    const [fetchedData, setFetchedData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searchMessage, setSearchMessage] = useState('');
    const [numberOfHits, setNumberOfHits] = useState('');

    const [searchParams, setSearchParams] = useState({
        subject: '', 
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

        if (searchParams.subject) filters.push(`${searchParams.subject}`);
        if (searchParams.endDateBefore) filters.push(`${searchParams.endDateBefore}`);

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
                subject: '',
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
<IDSCol className='ids-mr-4' cols="4" m='4' s='12'>

  <IDSInput>
    <label>Hitta certifikat</label>
    <input  className='input-search' type="search" placeholder="Sök på HSA-id, certifikatnamn eller ägare" name='subject' onChange={(e) => handleChange(e, 'subject')} value={searchParams.subject}></input>
  </IDSInput>

</IDSCol >
<IDSCol className='ids-mr-4' cols="4" m='4' s='12'>

  <IDSInput>
    <label>Giltig till</label>
    <input className='input-search'type="search" placeholder="åååå-mm-dd" name='endDateBefore' onChange={(e) => handleChange(e, 'endDateBefore')} value={searchParams.endDateBefore}></input>
  </IDSInput>
</IDSCol>
<IDSCol className='btnSearch'>
<IDSButton className="btn-search" search={true} onClick={searchbtn}>
      Sök
    </IDSButton>
</IDSCol>
</IDSRow>

{loading ? (
                <IDSSpinner className='ids-mt5' live="polite" srtext="The spinner has finished loading!" />
            ) : <div className='search-message'><p className='ids-body ids-mt-5'>{searchMessage}</p>
        <p className='ids-body ids-mt-5 ids-ml-5'>{numberOfHits}</p></div>}
            {isSearchPerformed ? (
                fetchedData && fetchedData.response_data && fetchedData.response_data.length !== 0 ? (
                    <DataTableCommon data={fetchedData} />
                ) : (
                    <NoCertificateFoundMessage></NoCertificateFoundMessage>
                )
            ) : null}
        </IDSContainer>
    );
}


export default SearchFieldCommon; 