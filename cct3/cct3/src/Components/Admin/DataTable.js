import React, { useState} from 'react';
import { copyPEM, DownloadCSR, DownloadPEM, copyCSR, DownloadP12 } from '../../api/searchApi';
import { IDSContainer, IDSIconChevronBold, IDSLink, IDSIconChevron, IDSIconCopyFile, IDSAlert, IDSIconDownload, IDSRow, IDSCol } from '@inera/ids-react';
import moment from 'moment';
import DeleteDialog from './DeleteDialog';
import UpdateDialog from './UpdateDialog';
import CopyAlert from '../Common/CopyAlert';
import CopyAlertError from '../Common/CopyAlertError';

function DataTable({ data }) {
  const [expandedRow, setExpandedRow] = useState(null);
  const [sortBy, setSortBy] = useState({ column: null, direction: 'asc' });
  const [copied, setCopied] = useState(null);

  const onClickSort = (column) => {
    if (sortBy.column === column) {
      setSortBy({ ...sortBy, direction: sortBy.direction === 'asc' ? 'desc' : 'asc' });
    } else {
      setSortBy({ column, direction: 'asc' });
    }
  };

  const sortedData = data.response_data && [...data.response_data].sort((a, b) => {
    if (sortBy.column === 'commonName') {
      return sortBy.direction === 'asc' ? a.subject.attr.commonName.localeCompare(b.subject.attr.commonName) : b.subject.attr.commonName.localeCompare(a.subject.attr.commonName);
    } if (sortBy.column === 'issuer') {
      return sortBy.direction === 'asc' ? a.issuer.attr.commonName.localeCompare(b.issuer.attr.commonName) : b.issuer.attr.commonName.localeCompare(a.issuer.attr.commonName);
    } if (sortBy.column === 'endDate') {
      return sortBy.direction === 'asc' ? a.enddate.localeCompare(b.enddate) : b.enddate.localeCompare(a.enddate);
    }
    /*if (sortBy.column === 'owner') {
      return sortBy.direction === 'asc' ? a.subject.attr.organizationName.localeCompare(b.subject.attr.organizationName) : b.subject.attr.organizationName.localeCompare(a.subject.attr.organizationName);
    }*/
    return 0;
  });

  const downloadP12 = async (publicKey) => {
    console.log('downloadP12 func', publicKey);
    try {
      await DownloadP12(publicKey);
    } catch (e) {
      console.log('Error fetching data:');
    }
  }

  const downloadPem = async (publicKey, commonName) => {
    console.log('DownloadPEM func', publicKey);
    try {
      await DownloadPEM(publicKey, commonName);
    } catch (e) {
      console.log('Error fetching data:');
    }
  }

  const downloadCsr = async (publicKey, commonName) => {
    console.log('downloadCSR func', publicKey);
    try {
      await DownloadCSR(publicKey, commonName);
    } catch (e) {
      console.log('Error fetching data:');
    }
  }

  const copyPem = async (publicKey) => {
    console.log('DownloadPEM func', publicKey);
    try {
      const data = await copyPEM(publicKey);
      if (data !== undefined) {
        await navigator.clipboard.writeText(data);
        setCopied(true);

        setTimeout(() => {
          setCopied(null);
        }, 2000);

        console.log('kopierad' + copied)
      } else {
        setCopied(false);
        console.log('inte kopierad')

        setTimeout(() => {
          setCopied(null);
        }, 2000);
      }
    } catch (e) {
      console.log('Error fetching data:');
    }
  }

  const copyCsr = async (publicKey) => {
    console.log('CopyCsr func', publicKey);
    try {
      const data = await copyCSR(publicKey);

      if (data !== undefined) {
        await navigator.clipboard.writeText(data);
        setCopied(true);

        setTimeout(() => {
          setCopied(null);
        }, 2000);

        console.log('kopierad' + copied)
      } else {
        setCopied(false);
        console.log('inte kopierad')

        setTimeout(() => {
          setCopied(null);
        }, 2000);
      }
    } catch (e) {
      console.log('Error fetching data:');
    }
  }

  return (
    <table tabIndex={0} className="ids-table ids-mt-3">
      <tbody>
        <tr className='tableHeaderRow'>
          <th onClick={() => onClickSort('commonName')}>Certifikatnamn <span className="material-symbols-outlined">swap_vert</span></th>
          <th onClick={() => onClickSort('issuer')}>Utfärdare <span className="material-symbols-outlined">swap_vert</span></th>
          <th onClick={() => onClickSort('endDate')}>Giltig till <span className="material-symbols-outlined">swap_vert</span></th>
          <th onClick={() => onClickSort('owner')}>Ägare <span className="material-symbols-outlined">swap_vert</span></th>
          <th></th>
        </tr>
        {/**Data från API response lägs in i table data + plus knapp för att expandera table row */}
        {data.status_code === 0 && data.status_text === 'OK' && sortedData &&
          sortedData.map((item, index) => (
            <React.Fragment key={index}>
              <tr tabIndex={0} id='tableRowActive' className={expandedRow === index ? 'tableRowActive' : null} onClick={() => { setExpandedRow(expandedRow === index ? null : index); }}>
                <td>{item.subject.attr.commonName}</td>
                <td>{item.issuer.attr.organizationName}</td>
                <td>{moment(item.enddate).format('YYYY/MM/DD')}</td>
                <td>{item.subject.attr.organizationName}</td>
                <td>
                  <IDSIconChevronBold id='IconchevronBald' size='xs'></IDSIconChevronBold>
                </td>
              </tr>
              {/**Expanderad table row */}
              {expandedRow === index && (
                <tr className='tableRowExpanded'>
                  <td colSpan="10">
                    {/**Om det finns HSA-id presentera på klienten, annars inte */}
                    {item.subject.attr.serialNumber && (
                      <IDSContainer className='container ids-mb-2'>
                        <div tabIndex={0} onClick={async () => { await navigator.clipboard.writeText(item.subject.attr.serialNumber); }} >
                          <b>HSA-id: </b>
                          {item.subject.attr.serialNumber}
                          {/*<IDSIconCopyFile className='ids-ml-2' size='s'></IDSIconCopyFile>*/}
                        </div>
                      </IDSContainer>)}

                    <IDSContainer className='container ids-mb-2'>
                      <div><b>Giltig från: </b>{moment(item.startdate).format('YYYY/MM/DD')}</div>
                      <div className="ids-ml-3" ><b>Giltig till: </b>{moment(item.enddate).format('YYYY/MM/DD')}</div>
                    </IDSContainer>

                    <IDSContainer className='container ids-mb-2'>
                      <IDSLink activeicon="" >
                        <a href="javascript:void(0)"  onClick={() => { copyCsr(item.pubkey_hash); }}>Kopiera CSR</a>
                        <IDSIconCopyFile size='s'></IDSIconCopyFile>
                      </IDSLink>

                      <IDSLink activeicon="" className="ids-ml-5" >
                        <a href="javascript:void(0)"  onClick={() => {
                          copyPem(item.pubkey_hash);
                        }}>Kopiera PEM</a>
                        <IDSIconCopyFile className='ids-ml-2' size='s'></IDSIconCopyFile>
                      </IDSLink>
                      {copied === true ? (
                        <CopyAlert></CopyAlert>
                      ) : null}
                      {copied === false ? (
                        <CopyAlertError></CopyAlertError>
                      ) : null}
                    </IDSContainer>

                    <IDSContainer className='container' style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex' }}>
                        <IDSLink activeicon="">
                          <IDSIconDownload></IDSIconDownload>
                          <a href="javascript:void(0)" onClick={(e) => { e.preventDefault(); downloadCsr(item.pubkey_hash, item.subject.attr.commonName); }}>Ladda ner CSR</a>
                        </IDSLink>

                        <IDSLink activeicon="" className="ids-ml-7">
                          <IDSIconDownload></IDSIconDownload>
                          <a href="javascript:void(0)"  onClick={() => { downloadPem(item.pubkey_hash, item.subject.attr.commonName); }}>Ladda ner PEM</a>
                        </IDSLink>

                        <IDSLink activeicon="" className="ids-ml-7">
                          <IDSIconDownload></IDSIconDownload>
                          <a href="javascript:void(0)" onClick={() => { downloadP12(item.pubkey_hash); }}>Ladda ner P12</a>
                        </IDSLink>
                      </div>

                      <IDSContainer class='container-icon'>
                        <UpdateDialog class='dialog-icons' message={item.subject.attr.commonName} />
                        <DeleteDialog class='dialog-icons' message={item.subject.attr.commonName} />
                      </IDSContainer>
                    </IDSContainer>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))
        }
      </tbody>
    </table>
  );
}

export default DataTable;

