export const searchCert = async (searchParams) => {
    console.log('searchCert');
    const { hsaId, commonName, owner, endDateBefore } = searchParams;


    let url = `https://certcenter.tnmt.nordicmedtest.se/certificates?show_name_attr=true&`;


    if (commonName) {
        url += `subject=CN=${commonName}&`;
    }
    if (hsaId) {
        url += `subject=serialNumber=${hsaId}&`;
    }
    if (endDateBefore) {
        url += `enddate_before=${endDateBefore}&`;
    }


    const response = await fetch(url);
    const data = await response.json();
    return data;
}


export const createCert = async (createParams) => {
    console.log('createCert');
    const { owner, password } = createParams;


    let url = `https://certcenter.tnmt.nordicmedtest.se/certificates/create?`;


    if(owner){
        url += `owner=${owner}&`;
    }


    if(password){
        url += `password=${password}&`;
    }


    //Skicka iväg anropet här
}


export const DownloadP12 = async(pubkey_hash) => {
    console.log(pubkey_hash);
    try{
    const publicKey = pubkey_hash;
   
    let url = 'https://certcenter.tnmt.nordicmedtest.se/pkcs12/';


    if(pubkey_hash){
        url += `${publicKey}`;
    }


    window.location.href = url;


    } catch(e){
        console.error(e);
    }
}


export const copyPEM = async(pubkey_hash) => {
    console.log(pubkey_hash);
    try{
    const publicKey = pubkey_hash;
   
    let url = 'https://certcenter.tnmt.nordicmedtest.se/pem?';


    if(pubkey_hash){
        url += `pubkey_hash=${publicKey}`;
    }
    const response = await fetch(url);
    const data = await response.text();
    return data;
    } catch(e){
        console.error(e);
    }
}


export const DownloadCSR= async(pubkey_hash) => {
    console.log(pubkey_hash);
    try{
    const publicKey = pubkey_hash;
   
    let url = 'https://certcenter.tnmt.nordicmedtest.se/csr/';


    if(pubkey_hash){
        url += `${publicKey}`;
    }


    const response = await fetch(url, {
        headers: {
            'accept': 'application/x-pem-file'
        }
    });
   
    console.log(response);


    /*const blob = await response.blob();
   


    var blobUrl = window.URL.createObjectURL(blob);
    var templink = document.createElement('a');
    templink.href = blobUrl;
    templink.click(); */


    } catch(e){
        console.error(e);
    }
}


export const DownloadPEM = async(pubkey_hash) => {
    console.log(pubkey_hash);
    try{
    const publicKey = pubkey_hash;
   
    let url = 'https://certcenter.tnmt.nordicmedtest.se/pem?';


    if(pubkey_hash){
        url += `pubkey_hash=${publicKey}`;
    }
   
    const response = await fetch(url, {
        headers: {
            'accept': 'application/x-pem-file'
        }
    });


    const blob = await response.blob();


    var blobUrl = window.URL.createObjectURL(blob);
    var templink = document.createElement('a');
    templink.href = blobUrl;
    templink.click();


    } catch(e){
        console.error(e);
    }
}


export const copyCSR= async(pubkey_hash) => {
    console.log(pubkey_hash);
    try{
    const publicKey = pubkey_hash;
   
    let url = 'https://certcenter.tnmt.nordicmedtest.se/csr/';


    if(pubkey_hash){
        url += `${publicKey}`;
    }


    const response = await fetch(url);
    const data = await response.text();
    return data;


    } catch(e){
        console.error(e);
    }
}
