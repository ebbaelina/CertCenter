import React, { useState, useMemo } from 'react';
import { useTable, useSortBy, useExpanded } from 'react-table';
import { copyPEM, DownloadCSR, DownloadPEM, copyCSR, DownloadP12 } from '../../api/searchApi';
import { IDSContainer, IDSIconChevronBold, IDSLink, IDSIconCopyFile, IDSAlert, IDSIconDownload, IDSCheckbox, IDSIconArrow } from '@inera/ids-react';
import moment from 'moment';
import DeleteDialog from './DeleteDialog';
import UpdateDialog from './UpdateDialog';
import CopyAlert from '../Common/CopyAlert';
import CopyAlertError from '../Common/CopyAlertError';

function TanstackTable({ data }) {
  const [copied, setCopied] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);

  const columns = useMemo(() => [
    {
      Header: 'Certifikatnamn',
      accessor: 'subject.attr.commonName',
    },
    {
      Header: 'Utfärdare',
      accessor: 'issuer.attr.organizationName',
    },
    {
      Header: 'Giltig till',
      accessor: 'enddate',
      Cell: ({ value }) => moment(value).format('YYYY/MM/DD'),
    },
    {
      Header: 'Ägare',
      accessor: 'subject.attr.organizationName',
    },
    {
      Header: '',
      id: 'expander',
      Cell: ({ row }) => (
        <span {...row.getToggleRowExpandedProps()}>
          {row.isExpanded ? <IDSIconChevronBold className='chevron-expanded' size='xs' /> : <IDSIconChevronBold className='chevron-notExpanded' size='xs' />}
        </span>
      ),
    },
  ], [selectedRows]);

  const tableData = useMemo(() => data.response_data || [], [data]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    visibleColumns,
    state: { expanded },
  } = useTable(
    {
      columns,
      data: tableData,
      initialState: { sortBy: [{ id: 'commonName', desc: false }] },
    },
    useSortBy,
    useExpanded
  );

  const downloadP12 = async (publicKey) => {
    try {
      await DownloadP12(publicKey);
    } catch (e) {
      console.log('Error fetching data:');
    }
  }

  const downloadPem = async (publicKey, commonName) => {
    try {
      await DownloadPEM(publicKey, commonName);
    } catch (e) {
      console.log('Error fetching data:');
    }
  }

  const downloadCsr = async (publicKey, commonName) => {
    try {
      await DownloadCSR(publicKey, commonName);
    } catch (e) {
      console.log('Error fetching data:');
    }
  }

  const copyPem = async (publicKey) => {
    try {
      const data = await copyPEM(publicKey);
      if (data !== undefined) {
        await navigator.clipboard.writeText(data);
        setCopied(true);

        setTimeout(() => {
          setCopied(null);
        }, 2000);
      } else {
        setCopied(false);
        setTimeout(() => {
          setCopied(null);
        }, 2000);
      }
    } catch (e) {
      console.log('Error fetching data:');
    }
  }

  const copyCsr = async (publicKey) => {
    try {
      const data = await copyCSR(publicKey);

      if (data !== undefined) {
        await navigator.clipboard.writeText(data);
        setCopied(true);

        setTimeout(() => {
          setCopied(null);
        }, 2000);
      } else {
        setCopied(false);
        setTimeout(() => {
          setCopied(null);
        }, 2000);
      }
    } catch (e) {
      console.log('Error fetching data:');
    }
  }

  return (
    <table {...getTableProps()} className="ids-table ids-mt-3">
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render('Header')}
                <span>
                  {column.isSorted
                    ? column.isSortedDesc
                      ? <IDSIconArrow className='icon-arrow icon-arrow-asc' size='xs'></IDSIconArrow>
                      : <IDSIconArrow className='icon-arrow icon-arrow-desc' size='xs'></IDSIconArrow>
                    : ''}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);

          return (
            <React.Fragment key={row.id}>
              <tr {...row.getRowProps()} className={row.isExpanded ? 'tablerow-expanded' : ''} {...row.getToggleRowExpandedProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
              {row.isExpanded ? (
                <tr className='tablerow-expanded'>
                  <td className='tableData-expanded' colSpan={visibleColumns.length}>
                  <div className='container-expanded'>
                    {row.original.subject.attr.serialNumber && (
                      <IDSContainer className='container ids-mb-2'>
                        <div tabIndex={0} onClick={async () => { await navigator.clipboard.writeText(row.original.subject.attr.serialNumber); }} >
                          <b>HSA-id: </b>
                          {row.original.subject.attr.serialNumber}
                        </div>
                      </IDSContainer>
                    )}

                    <IDSContainer className='container ids-mb-2'>
                      <div><b>Giltig från: </b>{moment(row.original.startdate).format('YYYY/MM/DD')}</div>
                      <div className="ids-ml-3"><b>Giltig till: </b>{moment(row.original.enddate).format('YYYY/MM/DD')}</div>
                    </IDSContainer>

                    <IDSContainer className='container ids-mb-2'>
                      <IDSLink activeicon="">
                        <a href="javascript:void(0)" onClick={() => { copyCsr(row.original.pubkey_hash); }}>Kopiera CSR</a>
                        <IDSIconCopyFile size='s'></IDSIconCopyFile>
                      </IDSLink>

                      <IDSLink activeicon="" className="ids-ml-5">
                        <a href="javascript:void(0)" onClick={() => { copyPem(row.original.pubkey_hash); }}>Kopiera PEM</a>
                        <IDSIconCopyFile className='ids-ml-2' size='s'></IDSIconCopyFile>
                      </IDSLink>
                      {copied === true ? <CopyAlert /> : null}
                      {copied === false ? <CopyAlertError /> : null}
                    </IDSContainer>

                    <IDSContainer className='container' style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex' }}>
                        <IDSLink activeicon="">
                          <IDSIconDownload />
                          <a href="javascript:void(0)" onClick={(e) => { e.preventDefault(); downloadCsr(row.original.pubkey_hash, row.original.subject.attr.commonName); }}>Ladda ner CSR</a>
                        </IDSLink>

                        <IDSLink activeicon="" className="ids-ml-7">
                          <IDSIconDownload />
                          <a href="javascript:void(0)" onClick={() => { downloadPem(row.original.pubkey_hash, row.original.subject.attr.commonName); }}>Ladda ner PEM</a>
                        </IDSLink>

                        <IDSLink activeicon="" className="ids-ml-7">
                          <IDSIconDownload />
                          <a href="javascript:void(0)" onClick={() => { downloadP12(row.original.pubkey_hash); }}>Ladda ner P12</a>
                        </IDSLink>
                      </div>

                      <IDSContainer className='container-icon'>
                        <UpdateDialog className='dialog-icons' message={row.original.subject.attr.commonName} />
                        <DeleteDialog className='dialog-icons' message={row.original.subject.attr.commonName} />
                      </IDSContainer>
                    </IDSContainer>
                    </div>
                  </td>
                </tr>
              ) : null}
            </React.Fragment>
          );
        })}
      </tbody>
    </table>
  );
}

export default TanstackTable;

