export const searchCert = async (searchParams) => {
    const { hsaId, commonName, owner, endDateBefore } = searchParams;


    let url = `https://certcenter.tnmt.nordicmedtest.se/certificates?show_name_attr=true&`;


    if (commonName) {
        url += `subject=${commonName}&`;
    }
    if (hsaId) {
        url += `subject=${hsaId}&`;
    }
    if (endDateBefore) {
        url += `enddate_before=${endDateBefore}&`;
    }
    if (owner) {
        const ownerCapitalize = owner.charAt(0).toUpperCase() + owner.slice(1);
        url += `subject=${ownerCapitalize}&`;
    }
    console.log(url);
    const response = await fetch(url);
    const data = await response.json();
    return data;
}


export const createCert = async (createParams) => {
    console.log('createCert');
    const { password, commonName } = createParams;


    let url = `https://certcenter.tnmt.nordicmedtest.se/certificate/create?common_name=${commonName}`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'accept': 'application/json' 
        },
        body: `password=${password}`
    });
    

    const data = await response.json();
    return data; 
}

export const updateCert = async (file) => {
    let url = 'https://certcenter.tnmt.nordicmedtest.se/certificate/update';
  
    const formData = new FormData();
    formData.append('file', file, file.name); 

    const response = await fetch(url, {
      method: "POST",
      headers: {
        'accept': 'application/json'
      },
      body: formData
    });
      const data = await response.json();

      return data;
    
  }


export const DownloadP12 = async (pubkey_hash) => {
    console.log(pubkey_hash);
    try {
        const publicKey = pubkey_hash;

        let url = 'https://certcenter.tnmt.nordicmedtest.se/pkcs12/';


        if (pubkey_hash) {
            url += `${publicKey}`;
        }


        window.location.href = url;

    } catch (e) {
        console.error(e);
    }
}


export const copyPEM = async (pubkey_hash) => {
    console.log(pubkey_hash);
    try {
        const publicKey = pubkey_hash;

        let url = 'https://certcenter.tnmt.nordicmedtest.se/pem?';


        if (pubkey_hash) {
            url += `pubkey_hash=${publicKey}`;
        }
        const response = await fetch(url);
        const data = await response.text();
        return data;
    } catch (e) {
        console.error(e);
    }
}


export const DownloadCSR = async (pubkey_hash, commonName) => {
    console.log(pubkey_hash);
    try {
        const publicKey = pubkey_hash;

        let url = 'https://certcenter.tnmt.nordicmedtest.se/csr/';


        if (pubkey_hash) {
            url += `${publicKey}`;
        }


        const response = await fetch(url, {
            headers: {
                'accept': 'application/x-pem-file'
            }
        });

        const blob = new Blob([await response.arrayBuffer()], { type: 'application/x-pem-file' });

        const href = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.download = commonName + '-csr-pkcs10.pem';
        a.href = href;
        a.click();


    } catch (e) {
        console.error(e);
    }
}

export const DownloadPEM = async (pubkey_hash, commonName) => {
    try {
        const publicKey = pubkey_hash;
        let url = 'https://certcenter.tnmt.nordicmedtest.se/pem?';

        if (pubkey_hash) {
            url += `pubkey_hash=${publicKey}`;
        }

        const response = await fetch(url, {
            method: "GET",
            mode: "cors",
            headers: {
                "accept": "application/x-pem-file",
            }
        });

        const blob = new Blob([await response.arrayBuffer()], { type: 'application/x-pem-file' });

        const href = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.download = commonName + '.pem';
        a.href = href;
        a.click();

    } catch (e) {
        console.error(e);
    }
}


export const copyCSR = async (pubkey_hash) => {
    console.log(pubkey_hash);
    try {
        const publicKey = pubkey_hash;

        let url = 'https://certcenter.tnmt.nordicmedtest.se/csr/';


        if (pubkey_hash) {
            url += `${publicKey}`;
        }

        const response = await fetch(url);
        const data = await response.text();
        return data;


    } catch (e) {
        console.error(e);
    }
}
