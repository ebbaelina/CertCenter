import React, { useState, useEffect } from 'react';
import { IDSBadge } from "@inera/ids-react";

function CopyAlertError() {
    return (
        <IDSBadge className="ids-mr-2 ids-ml-2" type="error">Kopiering misslyckades</IDSBadge>
    )

}
export default CopyAlertError;